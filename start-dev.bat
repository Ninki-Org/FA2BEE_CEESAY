@echo off
echo Starting FA2BEE Development Environment...
echo.

echo Starting Backend Server...
start cmd /k "cd backend && npm start"

echo.
echo Waiting 3 seconds for backend to start...
timeout /t 3 /nobreak > nul

echo.
echo Starting Frontend Server...
start cmd /k "cd frontend && python -m http.server 5500"

echo.
echo Development servers are starting...
echo Backend: http://localhost:3000
echo Frontend: http://localhost:5500
echo.
echo Press any key to exit this window...
pause > nul
