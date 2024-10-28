@echo off
REM Check if Node.js is installed
where node >nul 2>nul
if errorlevel 1 (
    echo Node.js is not installed. Please install it from https://nodejs.org/
    exit /b
)

REM Set up project directory
set PROJECT_DIR= backend\payment-service\payment-process-service\payment-process
mkdir "%PROJECT_DIR%"
cd "%PROJECT_DIR%"

REM Initialize a new Node.js project
echo Initializing a new Node.js project...
npm init -y

REM Install common packages (e.g., Express, dotenv)
echo Installing common packages...
npm install express dotenv

REM Any additional setup can go here
echo Environment setup complete for JavaScript development in %PROJECT_DIR%.