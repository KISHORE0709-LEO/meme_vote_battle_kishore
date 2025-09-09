Write-Host "Starting Meme Arena - Frontend and Backend..." -ForegroundColor Yellow

# Start backend in new window
Write-Host "Starting backend server..." -ForegroundColor Green
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD\backend'; npm run dev"

# Wait a moment for backend to start
Start-Sleep -Seconds 3

# Start frontend in new window
Write-Host "Starting frontend server..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev"

Write-Host ""
Write-Host "Both servers are starting..." -ForegroundColor Yellow
Write-Host "Backend: http://localhost:4000" -ForegroundColor Green
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to continue..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")