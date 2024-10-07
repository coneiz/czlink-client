#!/bin/bash


echo "  ___  __   __ _  ____  __  ____ "
echo " / __)/  \ (  ( \(  __)(  )(__  )"
echo "( (__(  O )/    / ) _)  )(  / _/ "
echo " \___)\__/ \_)__)(____)(__)(____)"
echo "                                 CZLINK CLIENT INSTALLER                                 "

# Update package list and install npm and git
echo "Updating package list..."
sudo apt update

echo "Installing npm and git..."
sudo apt install npm git -y

# Install nvm
echo "Installing NVM..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
source ~/.bashrc

# Install Node.js
echo "Fetching available Node.js versions..."
nvm list-remote

echo "Installing Node.js version 21.7.3..."
nvm install v21.7.3

# Clone the repository
echo "Cloning the repository..."
git clone https://github.com/coneiz/czlink-client.git

# Change to the repository directory
cd czlink-client || { echo "Failed to enter directory"; exit 1; }

# Create .env file
echo "Creating .env file..."
read -p "Enter the port (default 8742): " port
read -p "Enter the folder path (default ./): " folderPath

# Use default values if empty
port=${port:-8742}
folderPath=${folderPath:-./}

cat <<EOL > .env
PORT=$port
FOLDER_PATH=$folderPath
EOL

echo ".env file created with the following content:"
cat .env

# Run npm install
echo "Running npm install..."
npm install

echo "Installation completed successfully!"
