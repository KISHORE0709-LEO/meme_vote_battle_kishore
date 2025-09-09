import express from 'express';
import multer from 'multer';
import path from 'path';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';
import { getMemes, createMeme, voteMeme, deleteMeme } from '../database.js';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|webm/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images and videos are allowed'));
    }
  }
});

// Public: Get all memes
router.get('/', async (req, res) => {
  try {
    const memes = await getMemes();
    res.json({ memes });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch memes' });
  }
});

// Public: Get leaderboard
router.get('/leaderboard', async (req, res) => {
  try {
    const memes = await getMemes();
    const sortedMemes = [...memes].sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
    res.json({ leaderboard: sortedMemes.slice(0, 10) });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch leaderboard' });
  }
});

// Protected: Upload meme (requires authentication)
router.post('/', authenticateToken, upload.single('file'), async (req, res) => {
  try {
    const { title } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title required' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'File required' });
    }

    const newMeme = {
      id: Date.now().toString(),
      title,
      url: `/uploads/${req.file.filename}`,
      userId: req.user.id,
      author: req.user.username
    };

    const meme = await createMeme(newMeme);
    res.status(201).json({ message: 'Meme uploaded successfully', meme });
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload meme' });
  }
});

// Protected: Vote on meme
router.post('/:id/vote', authenticateToken, async (req, res) => {
  try {
    const { voteType } = req.body; // 'up' or 'down'
    const meme = await voteMeme(req.params.id, req.user.id, voteType);
    res.json({ message: 'Vote recorded', meme });
  } catch (error) {
    res.status(500).json({ error: 'Failed to record vote' });
  }
});

// Delete meme (temporarily allow any authenticated user)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const deletedMeme = await deleteMeme(req.params.id);
    res.json({ message: 'Meme deleted successfully', meme: deletedMeme });
  } catch (error) {
    if (error.message === 'Meme not found') {
      res.status(404).json({ error: 'Meme not found' });
    } else {
      res.status(500).json({ error: 'Failed to delete meme' });
    }
  }
});

export default router;