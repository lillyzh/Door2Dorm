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
- Delete the ```migrations```, ```__pycache__``` directories and ```db.sqlite3``` file.
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
## Url to visit
- Please visit ```localhost:8000``` to view the new dispatcher view

## Running the Rider Side Mobile App
- If desired, you may use a virtual environment for easy removal

- The link below will walk you through setup and configuration. Note you should skip the "Creating a new application" section and instead 
use ```npm install``` within the mobileapp directory to retrieve the node modules.

- https://reactnative.dev/docs/environment-setup
