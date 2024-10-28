@echo off
echo Setting up the environment...

python -m venv venv

call venv\Scripts\activate.bat

pip install -r requirements.txt

python manage.py runserver
