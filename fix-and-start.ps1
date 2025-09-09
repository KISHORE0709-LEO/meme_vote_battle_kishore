Write-Host "=== Meme Arena Fix & Start Script ===" -ForegroundColor Yellow
Write-Host ""

# Kill any existing processes on ports 4000 and 5173
Write-Host "Cleaning up existing processes..." -ForegroundColor Cyan
$processes4000 = netstat -ano | findstr :4000
$processes5173 = netstat -ano | findstr :5173

if ($processes4000) {
    $pid4000 = ($processes4000 -split '\s+')[4]
    Write-Host "Killing process on port 4000 (PID: $pid4000)" -ForegroundColor Red
    taskkill /PID $pid4000 /F 2>$null
}

if ($processes5173) {
    $pid5173 = ($processes5173 -split '\s+')[4]
    Write-Host "Killing process on port 5173 (PID: $pid5173)" -ForegroundColor Red
    taskkill /PID $pid5173 /F 2>$null
}

Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Green

# Install frontend dependencies
Write-Host "Installing frontend dependencies..." -ForegroundColor Cyan
npm install

# Install backend dependencies
Write-Host "Installing backend dependencies..." -ForegroundColor Cyan
Set-Location "backend"
npm install
Set-Location ".."

Write-Host ""
Write-Host "Starting servers..." -ForegroundColor Green

# Start backend in new window
Write-Host "Starting backend server on http://localhost:4000..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; Write-Host 'Backend Server Starting...' -ForegroundColor Green; npm run dev"

# Wait for backend to start
Start-Sleep -Seconds 4

# Start frontend in new window
Write-Host "Starting frontend server on http://localhost:5173..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; Write-Host 'Frontend Server Starting...' -ForegroundColor Cyan; npm run dev"

Write-Host ""
Write-Host "=== Servers Started Successfully! ===" -ForegroundColor Green
Write-Host "Backend API: http://localhost:4000" -ForegroundColor Green
Write-Host "Frontend App: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "The application should open automatically in your browser." -ForegroundColor Yellow
Write-Host "If not, navigate to http://localhost:5173" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press any key to exit this script..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")