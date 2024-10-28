@echo off
set "VENV_PATH=.\venv\Scripts\activate"

echo Checking for virtual environment...

if exist "%VENV_PATH%" (
    echo Activating virtual environment...
    call "%VENV_PATH%"
) else (
    echo Virtual environment not found. Starting server without activation.
)

echo Starting Django server...

python manage.py runserver



echo Server stopped.
pause
