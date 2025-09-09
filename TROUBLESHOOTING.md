# Meme Arena - Troubleshooting Guide

## Quick Start

Run this command in PowerShell (as Administrator if needed):
```powershell
.\fix-and-start.ps1
```

## Manual Start

If the automatic script doesn't work, start manually:

### Backend (Terminal 1):
```bash
cd backend
npm install
npm run dev
```

### Frontend (Terminal 2):
```bash
npm install
npm run dev
```

## Common Issues & Fixes

### 1. Port Already in Use
If you get "EADDRINUSE" error:
```powershell
# Find process using port 4000
netstat -ano | findstr :4000
# Kill the process (replace PID with actual number)
taskkill /PID [PID_NUMBER] /F
```

### 2. Dependencies Missing
```bash
# Frontend
npm install

# Backend
cd backend
npm install
```

### 3. PowerShell Execution Policy
If scripts won't run:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### 4. Node.js Version
Ensure you have Node.js 18+ installed:
```bash
node --version
```

## Application URLs
- Frontend: http://localhost:5173
- Backend API: http://localhost:4000
- API Health Check: http://localhost:4000/api/health

## Features Working
✅ Frontend React app with routing
✅ Backend Express API with auth
✅ Mock data for memes
✅ User authentication (register/login)
✅ Voting system
✅ Responsive design

## Test the API
```bash
# Health check
curl http://localhost:4000/api/health

# Get memes
curl http://localhost:4000/api/memes

# Register user
curl -X POST http://localhost:4000/api/auth/register -H "Content-Type: application/json" -d "{\"username\":\"test\",\"email\":\"test@test.com\",\"password\":\"password\"}"
```