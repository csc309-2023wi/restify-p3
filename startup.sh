#!/bin/bash

PYTHON=python3.10
VENV_PATH=".venv"
PROJECT_ROOT="./"

# check if the desired python version is installed
if [ -z "$PYTHON" ]; then
    echo "$PYTHON not found, installing..."
    sudo apt install "$PYTHON"
else
    echo "$PYTHON already installed."
fi

# check if a virtual evvironment has been created
if [ ! -d "$VENV_PATH" ]; then
    echo "Python venv not found at $VENV_PATH, creating..."
    $PYTHON -m venv "$VENV_PATH"
    source "$VENV_PATH/bin/activate"
    pip install -r $PROJECT_ROOT/requirements.txt
else
    echo "$VENV_PATH folder found, activating..."
    source "$VENV_PATH/bin/activate"
fi

# switch to the project's Django root directory
cd "$PROJECT_ROOT/django_restify/" || (echo "Project root $PROJECT_ROOT not found!" && exit 1)

# perform database migrations
python manage.py makemigrations
python manage.py migrate
