import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import authRoutes from './routes/auth.js';
import memeRoutes from './routes/memes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Serve uploaded files
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/memes', memeRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Meme Arena API is running' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📋 API endpoints:`);
  console.log(`   Public: GET /api/memes, GET /api/memes/leaderboard`);
  console.log(`   Auth: POST /api/auth/register, POST /api/auth/login, GET /api/auth/profile`);
  console.log(`   Protected: POST /api/memes, POST /api/memes/:id/vote`);
  console.log(`   Admin: DELETE /api/memes/:id`);
  console.log(`   Files: /uploads/* (static files)`);
});