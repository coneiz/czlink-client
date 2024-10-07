### README for CZLink Client

# CZLink Client

CZLink is a software solution designed to facilitate the backup process for Preserver, a product by Coneiz. With CZLink, you can easily set up and manage your backup tasks at a minimal cost, ensuring that your important data is preserved securely and efficiently.

## Features

- Simple and user-friendly interface for managing backups.
- Scheduled backup options to automate the process.
- Efficient storage management to minimize costs.
- Seamless integration with the Preserver product for enhanced backup capabilities.

## Installation Instructions

To install CZLink Client, you can use the provided installer script. This installer is compatible with **Ubuntu** and **Debian** systems. Follow the instructions below:

1. **Open your terminal**.

2. **Run the installer script using curl**:
   ```bash
   curl -o- https://raw.githubusercontent.com/coneiz/czlink-client/refs/heads/main/installer.sh | bash
   ```

3. **Follow the prompts** in the terminal to complete the installation. The installer will update your system, install the necessary dependencies, clone the CZLink repository, and create the required configuration files.

## Usage

After the installation is complete, you can start using CZLink by navigating to the cloned directory and running the application. Follow any additional setup instructions provided in the repository.

1. ```bash
   cd czlink-client
   ```
   
2. ```bash
   node index.js
   ```

## To make it Run 24/7

1. Install the pm2 
   ```bash
   npm i pm2 -g
   ```

2. now navigate to the directory of czlink-client
   ```bash
   cd czlink-client
   ```

3. Now start the pm2 service using the following commands
   ```bash
   pm2 start --name czlink "node index.js"
   pm2 startup
   pm2 save
   ```

## Support

For support or questions regarding CZLink, please open an issue in the GitHub repository or contact Coneiz support.
