Write-Host "=== Meme Arena - Starting Servers ===" -ForegroundColor Yellow
Write-Host ""

# Function to kill processes on specific ports
function Kill-ProcessOnPort {
    param($Port)
    $processes = netstat -ano | Select-String ":$Port"
    if ($processes) {
        foreach ($process in $processes) {
            $pid = ($process -split '\s+')[-1]
            Write-Host "Killing process on port $Port (PID: $pid)" -ForegroundColor Red
            try {
                Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
            } catch {
                # Ignore errors
            }
        }
    }
}

# Clean up existing processes
Write-Host "Cleaning up existing processes..." -ForegroundColor Cyan
Kill-ProcessOnPort 4000
Kill-ProcessOnPort 5173
Start-Sleep -Seconds 2

# Verify Node.js is available
try {
    $nodeVersion = node --version
    Write-Host "Node.js version: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found! Please install Node.js first." -ForegroundColor Red
    exit 1
}

# Start Backend
Write-Host ""
Write-Host "Starting Backend Server..." -ForegroundColor Green
$backendJob = Start-Job -ScriptBlock {
    Set-Location $args[0]
    Set-Location "backend"
    node src/server.js
} -ArgumentList (Get-Location)

Start-Sleep -Seconds 3

# Check if backend started
$backendRunning = $false
try {
    $response = Invoke-WebRequest -Uri "http://localhost:4000/api/health" -TimeoutSec 5 -ErrorAction SilentlyContinue
    if ($response.StatusCode -eq 200) {
        $backendRunning = $true
        Write-Host "✅ Backend server is running on http://localhost:4000" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️  Backend may still be starting..." -ForegroundColor Yellow
}

# Start Frontend
Write-Host ""
Write-Host "Starting Frontend Server..." -ForegroundColor Cyan
$frontendJob = Start-Job -ScriptBlock {
    Set-Location $args[0]
    npm run dev
} -ArgumentList (Get-Location)

Start-Sleep -Seconds 5

# Check if frontend started
$frontendRunning = $false
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5173" -TimeoutSec 5 -ErrorAction SilentlyContinue
    if ($response.StatusCode -eq 200) {
        $frontendRunning = $true
        Write-Host "✅ Frontend server is running on http://localhost:5173" -ForegroundColor Cyan
    }
} catch {
    Write-Host "⚠️  Frontend may still be starting..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== Server Status ===" -ForegroundColor Yellow
if ($backendRunning) {
    Write-Host "✅ Backend: http://localhost:4000" -ForegroundColor Green
} else {
    Write-Host "❌ Backend: Not responding" -ForegroundColor Red
}

if ($frontendRunning) {
    Write-Host "✅ Frontend: http://localhost:5173" -ForegroundColor Cyan
} else {
    Write-Host "❌ Frontend: Not responding" -ForegroundColor Red
}

Write-Host ""
Write-Host "Opening browser..." -ForegroundColor Yellow
Start-Process "http://localhost:5173"

Write-Host ""
Write-Host "Servers are running in background jobs." -ForegroundColor Green
Write-Host "To stop servers, close this PowerShell window or run:" -ForegroundColor Yellow
Write-Host "Get-Job | Stop-Job; Get-Job | Remove-Job" -ForegroundColor Gray
Write-Host ""
Write-Host "Press Ctrl+C to stop monitoring, servers will continue running."
Write-Host "Press any key to show server logs..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Show logs
Write-Host ""
Write-Host "=== Backend Logs ===" -ForegroundColor Green
Receive-Job $backendJob
Write-Host ""
Write-Host "=== Frontend Logs ===" -ForegroundColor Cyan  
Receive-Job $frontendJob

# Keep monitoring
while ($true) {
    Start-Sleep -Seconds 5
    Write-Host "." -NoNewline -ForegroundColor Gray
}