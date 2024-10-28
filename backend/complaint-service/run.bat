@echo off
if not exist node_modules (
    echo Installing dependencies...
    npm install --ignore-engines
    
)

echo Starting Node.js server...
npm run dev