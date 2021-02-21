# Set up

Read the following to set up and run this application.

## Setting up the Virtual Environment

1. First, make sure you have at least 3GB free on your computer and then to head over to (https://www.anaconda.com/download/) and install the Python 3 version of Anaconda.

2. After you have installed conda, ```cd``` into the ```door2dorm``` directory and run the following:

- Create an environment with dependencies specified in env.yml:
    ```
    conda env create -f env.yml
    ```
- Activate the new environment:
    ```
    conda activate d2d_env
    ```
- To deactivate an active environment, use
    ```
    conda deactivate
    ```

## Setting and Resetting the Database
- Make sure you are inside the ```door2dorm``` directory and that you have activated the ```d2d_env``` virtual environment.
- Delete the ```migrations``` and ```__pycache__``` directories.
- Also, delete the ```db.sqlite3``` file as there are new updates to the database.
- Migrate
    ```
    python manage.py makemigrations dispatcher_controller
    python manage.py migrate
    ```
## Starting the Server
- Run server
    ```
    python manage.py runserver
    ```
- You may now start the development server at localhost:8000/ (this number might be different) in any browser

## Accessing as ```Admin```
- Create a super user
    ```
    python manage.py createsuperuser
    ```
- Follow the steps to create an account
    * username
    * email
    * password
- Now, you can start the server
    ```
    python manage.py runserver
    ```
- As an admin/superuser, you may log into on the admin page using the account you just created
    ```
    localhost:8000/admin
    ```
## Enabling Channel Layer
- To download docker, please go to https://www.docker.com/get-started. Then run below commands.
```
docker run -p 6379:6379 -d redis:5
```
```
python3 -m pip install channels_redis
```

## URLs to visit
- Visit localhost:8000 to view information about all ride requests, all registered members and all registered drivers
- Visit localhost:8000/rider/application to submit a ride request
- Visit localhost:8000/student/application to register a new member
- Visit localhost:8000/driver/application to register a new driver
