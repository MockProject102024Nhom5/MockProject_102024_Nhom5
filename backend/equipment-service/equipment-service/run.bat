@echo off

if not exist node_modules (
    echo Installing dependencies...
    cmd.exe /c npm install --ignore-engines
    
)

echo Starting Node.js server...
npm start