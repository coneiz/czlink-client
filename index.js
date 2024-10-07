const express = require('express');
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');
const cron = require('cron');
const app = express();
const port = 8742;


const folderPath = path.join(__dirname, '/');


const zipFilePath = path.join(__dirname, 'backup.zip');


let isZipping = false;


function zipFolder(sourceFolder, outputFilePath) {
    return new Promise((resolve, reject) => {
     
        if (fs.existsSync(outputFilePath)) {
            fs.unlinkSync(outputFilePath);
            console.log('Existing backup.zip file deleted.');
        }

        const output = fs.createWriteStream(outputFilePath);
        const archive = archiver('zip', { zlib: { level: 9 } });

        output.on('close', () => {
            console.log(`Backup completed. ${archive.pointer()} total bytes`);
            isZipping = false; 
            resolve();
        });

        archive.on('error', (err) => {
            isZipping = false; 
            reject(err);
        });

        archive.pipe(output);

  
        archive.glob('**/*', {
            cwd: sourceFolder,
            ignore: ['node_modules/**'], 
        });

        archive.finalize();
    });
}


const job = new cron.CronJob('0 * * * *', () => {
    console.log('Running cron job: Zipping folder');
    if (!isZipping) {
        isZipping = true; 
        zipFolder(folderPath, zipFilePath)
            .then(() => {
                console.log('Folder zipped successfully');
            })
            .catch((err) => {
                console.error('Error zipping folder:', err);
            });
    } else {
        console.log('Zipping is already in progress');
    }
});

job.start();

app.get('/download', (req, res) => {

    if (isZipping) {
       
        res.status(503).send('The file is being zipped, please try again later.');
    } else if (!fs.existsSync(zipFilePath)) {
        zipFolder(folderPath, zipFilePath)
        res.status(503).send('The file is being zipped, please try again later.');
    } else {
        res.download(zipFilePath, 'backup.zip', (err) => {
            if (err) {
                console.error('Error sending the file:', err);
                res.status(500).send('An error occurred while downloading the file.');
            }
        });
    }
});

app.get('/', (req, res) => {
    res.send(`
        <h1>Download Backup</h1>
        <p><a href="/download">Click here to download the backup.zip</a></p>
    `);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
