#!/bin/bash

N_VERSION="9.0.1"
N_PREFIX="$HOME/.local/"
NODE_VERSION="19.8.1"

# install the desired node version using n
echo "npm not found, installing..."
wget -c "https://raw.githubusercontent.com/tj/n/v$N_VERSION/bin/n"
chmod +x ./n
./n $NODE_VERSION

npm install
