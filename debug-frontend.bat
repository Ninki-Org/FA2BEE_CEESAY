@echo off
echo Starting Frontend in Debug Mode...
echo.

cd frontend
echo Starting frontend server...
echo Frontend will run on: http://localhost:5500
echo.
echo Open browser developer tools (F12) to see console logs
echo.
echo Press Ctrl+C to stop the server
echo.

python -m http.server 5500
