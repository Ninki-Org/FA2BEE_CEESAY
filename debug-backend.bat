@echo off
echo Starting Backend in Debug Mode...
echo.

cd backend
echo Installing dependencies...
npm install

echo.
echo Starting backend server with debug logging...
echo Backend will run on: http://localhost:3000
echo.
echo Press Ctrl+C to stop the server
echo.

npm start
