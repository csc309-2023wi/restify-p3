#!/bin/bash
cd ./backend/ || exit 1
bash ./startup.sh
cd ../frontend/ || exit 1
bash ./startup.sh
