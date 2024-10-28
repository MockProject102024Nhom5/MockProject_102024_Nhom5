@echo off
REM Start the SQL Server
echo Starting SQL Server...
net start MSSQL$MOCKPROJECT
REM Wait for a few seconds to ensure SQL Server starts
timeout /t 10

REM Start the Node.js server
echo Starting Node.js server...

cd /d "backend\payment-service\payment-process-service\payment-process"
echo Current directory: %cd%
node server.js

pause


