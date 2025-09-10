# Deployment Guide

## Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

## Environment Setup

### 1. Clone Repository
```bash
git clone <repository-url>
cd meme-vote-battle-main
```

### 2. Install Dependencies
```bash
# Frontend
npm install

# Backend
cd backend
npm install
cd ..
```

### 3. Environment Variables
Create `.env` files:

**Frontend (.env):**
```env
VITE_API_URL=http://localhost:4000/api
VITE_WS_URL=ws://localhost:4000
```

**Backend (backend/.env):**
```env
PORT=4000
JWT_SECRET=your-super-secret-jwt-key-here
NODE_ENV=development
```

## Development

### Start Development Servers
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
npm run dev
```

Access:
- Frontend: http://localhost:5173
- Backend API: http://localhost:4000/api

## Production Deployment

### 1. Build Frontend
```bash
npm run build
```

### 2. Deploy Backend
```bash
cd backend
npm start
```

### 3. Serve Frontend
Use any static file server:
```bash
# Using serve
npx serve dist

# Using nginx (recommended)
# Copy dist/ contents to nginx web root
```

## Docker Deployment (Optional)

### Dockerfile (Frontend)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5173
CMD ["npm", "run", "preview"]
```

### Dockerfile (Backend)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY backend/package*.json ./
RUN npm ci --only=production
COPY backend/ .
EXPOSE 4000
CMD ["npm", "start"]
```

## Production Considerations

### Security
- Use HTTPS in production
- Set secure JWT secrets
- Enable CORS only for trusted domains
- Implement rate limiting
- Add input validation

### Performance
- Enable gzip compression
- Use CDN for static assets
- Implement caching strategies
- Monitor memory usage

### Monitoring
- Set up error logging
- Monitor API response times
- Track user engagement metrics
- Set up health checks