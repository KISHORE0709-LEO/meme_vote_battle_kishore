@echo off
echo Starting Meme Arena...
echo.

REM Kill existing processes
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :4000') do taskkill /PID %%a /F >nul 2>&1
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :5173') do taskkill /PID %%a /F >nul 2>&1

echo Starting Backend...
start "Meme Arena Backend" cmd /k "cd backend && node src/server.js"

echo Waiting for backend to start...
timeout /t 3 /nobreak >nul

echo Starting Frontend...
start "Meme Arena Frontend" cmd /k "npm run dev"

echo.
echo ================================
echo   Meme Arena is starting!
echo ================================
echo Backend:  http://localhost:4000
echo Frontend: http://localhost:5173
echo.
echo Both servers are running in separate windows.
echo Close those windows to stop the servers.
echo.

REM Wait a bit then open browser
timeout /t 5 /nobreak >nul
start http://localhost:5173

pause