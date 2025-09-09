# Meme Arena Backend

## Quick Start

```bash
cd backend
npm install
npm run dev
```

## API Endpoints

### Public Routes
- `GET /api/memes` - Get all memes
- `GET /api/memes/leaderboard` - Get leaderboard

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (requires token)

### Protected Routes (require JWT token)
- `POST /api/memes` - Upload meme
- `POST /api/memes/:id/vote` - Vote on meme

### Admin Only (require admin role)
- `DELETE /api/memes/:id` - Delete meme

## Authentication

Include JWT token in Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

## Environment Variables

Create `.env` file:
```
JWT_SECRET=your-secret-key
PORT=3001
NODE_ENV=development
```