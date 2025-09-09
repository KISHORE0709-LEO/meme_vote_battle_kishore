@echo off
echo Starting Meme Arena Development Environment...
echo.

echo Installing dependencies...
echo Installing frontend dependencies...
call npm install
echo Installing backend dependencies...
cd backend
call npm install
cd ..

echo.
echo Starting servers...
start "Backend Server" cmd /k "cd backend && npm run dev"
timeout /t 3 /nobreak > nul
start "Frontend Server" cmd /k "npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:4000
echo Frontend: http://localhost:5173
echo.
echo Press any key to exit...
pause