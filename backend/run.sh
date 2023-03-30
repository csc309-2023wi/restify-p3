#!/bin/bash

PYTHON=python3.10
VENV_PATH=".venv"
PROJECT_ROOT="./"

if [ ! -d "$VENV_PATH" ]; then
    echo "Python venv not found at $VENV_PATH!"
    echo "Must run startup.sh first."
    exit 1
else
    source "$VENV_PATH/bin/activate"
fi

# switch to the project's Django root directory
cd "$PROJECT_ROOT/django_restify/" || exit 1

$PYTHON ./manage.py runserver
