@echo off
echo Starting Meme Arena - Frontend and Backend...

echo.
echo Installing dependencies...
call npm install

echo.
echo Installing backend dependencies...
cd backend
call npm install
cd ..

echo.
echo Starting backend server...
start "Backend Server" cmd /k "cd backend && npm run dev"

echo.
echo Waiting for backend to start...
timeout /t 3 /nobreak > nul

echo.
echo Starting frontend development server...
start "Frontend Server" cmd /k "npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:4000
echo Frontend: http://localhost:5173
echo.
pause