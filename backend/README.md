# Restify

An online marketplace where users can search, book, comment and rate short term lodging experiences. University of Toronto CSC309 project.

## REST API Endpoint Spec

-   👉 [design-endpoints.md](design-endpoints.md)

## Local Development

### Setup

> When running on Linux, the following steps can simply be replaced by [`./startup.sh`](startup.sh)

1.  Create python virtual environment

    ```bash
    python3.10 -m venv .venv
    ```

    This will create a virtual environment at `./.venv`.

2.  Activate the virtual environment in Linux/UNIX:

    ```bash
    source ./.venv/bin/activate
    ```

    Or in Windows:

    ```bat
    .venv\Scripts\activate.bat
    ```

3.  Install [required python packages](requirements.txt):

    ```bash
    pip install -r requirements.txt
    ```

4.  Enter Django project and perform database migrations:
    ```bash
    cd django_restify
    python3.10 manage.py makemigrations
    python3.10 manage.py migrate
    ```

### Running

> When running on Linux, the following steps can simply be replaced by [`./run.sh`](run.sh)

1. [Activate the Python virtual environment](#setup).
2. Run the development server:
    ```bash
    python3.10 ./manage.py runserver
    ```

You should be able to visit http://127.0.0.1:8000/api/ and see the following JSON response:

```json
{
    "hello": "world"
}
```

All additional API endpoints will reside under the `/api/` path.
