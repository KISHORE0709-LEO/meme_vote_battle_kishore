import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'meme_arena',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
});

// Initialize database tables
const initDB = async () => {
  try {
    // Memes table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS memes (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        url TEXT NOT NULL,
        upvotes INTEGER DEFAULT 0,
        downvotes INTEGER DEFAULT 0,
        userId TEXT,
        author TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Votes table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS votes (
        id SERIAL PRIMARY KEY,
        userId TEXT,
        memeId TEXT,
        type TEXT,
        UNIQUE(userId, memeId)
      )
    `);

    // Users table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        username TEXT UNIQUE,
        email TEXT UNIQUE,
        password TEXT,
        role TEXT DEFAULT 'user',
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert sample memes if table is empty
    const { rows } = await pool.query('SELECT COUNT(*) FROM memes');
    if (parseInt(rows[0].count) === 0) {
      const sampleMemes = [
        {
          id: '1',
          title: 'When you find a bug in production',
          url: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=400&fit=crop',
          upvotes: 234,
          downvotes: 12,
          author: 'CodeMaster99',
          userId: 'mock1'
        },
        {
          id: '2',
          title: 'Me explaining why I need another monitor',
          url: 'https://via.placeholder.com/500x400/4F46E5/FFFFFF?text=Me+explaining+why+I+need+another+monitor',
          upvotes: 189,
          downvotes: 8,
          author: 'PixelPirate',
          userId: 'mock2'
        },
        {
          id: '3',
          title: 'Emotional Damage',
          url: 'https://via.placeholder.com/500x400/DC2626/FFFFFF?text=Emotional+Damage',
          upvotes: 342,
          downvotes: 23,
          author: 'ByteBender',
          userId: 'mock3'
        }
      ];

      for (const meme of sampleMemes) {
        await pool.query(
          'INSERT INTO memes (id, title, url, upvotes, downvotes, userId, author) VALUES ($1, $2, $3, $4, $5, $6, $7)',
          [meme.id, meme.title, meme.url, meme.upvotes, meme.downvotes, meme.userId, meme.author]
        );
      }
    }

    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
  }
};

initDB();

export const getMemes = async () => {
  const result = await pool.query('SELECT * FROM memes ORDER BY createdAt DESC');
  return result.rows;
};

export const createMeme = async (meme) => {
  const { id, title, url, userId, author } = meme;
  await pool.query(
    'INSERT INTO memes (id, title, url, userId, author) VALUES ($1, $2, $3, $4, $5)',
    [id, title, url, userId, author]
  );
  return { id, title, url, userId, author, upvotes: 0, downvotes: 0 };
};

export const voteMeme = async (memeId, userId, voteType) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Check existing vote
    const existingVote = await client.query(
      'SELECT * FROM votes WHERE userId = $1 AND memeId = $2',
      [userId, memeId]
    );

    if (existingVote.rows.length > 0) {
      const vote = existingVote.rows[0];
      if (vote.type === voteType) {
        // Remove vote
        await client.query('DELETE FROM votes WHERE userId = $1 AND memeId = $2', [userId, memeId]);
        await client.query(
          `UPDATE memes SET ${vote.type === 'up' ? 'upvotes' : 'downvotes'} = ${vote.type === 'up' ? 'upvotes' : 'downvotes'} - 1 WHERE id = $1`,
          [memeId]
        );
      } else {
        // Change vote
        await client.query('UPDATE votes SET type = $1 WHERE userId = $2 AND memeId = $3', [voteType, userId, memeId]);
        await client.query(
          `UPDATE memes SET ${vote.type === 'up' ? 'upvotes' : 'downvotes'} = ${vote.type === 'up' ? 'upvotes' : 'downvotes'} - 1, ${voteType === 'up' ? 'upvotes' : 'downvotes'} = ${voteType === 'up' ? 'upvotes' : 'downvotes'} + 1 WHERE id = $1`,
          [memeId]
        );
      }
    } else {
      // New vote
      await client.query('INSERT INTO votes (userId, memeId, type) VALUES ($1, $2, $3)', [userId, memeId, voteType]);
      await client.query(
        `UPDATE memes SET ${voteType === 'up' ? 'upvotes' : 'downvotes'} = ${voteType === 'up' ? 'upvotes' : 'downvotes'} + 1 WHERE id = $1`,
        [memeId]
      );
    }

    await client.query('COMMIT');
    
    // Get updated meme
    const result = await client.query('SELECT * FROM memes WHERE id = $1', [memeId]);
    return result.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export const deleteMeme = async (memeId) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // Delete all votes for this meme
    await client.query('DELETE FROM votes WHERE memeId = $1', [memeId]);
    
    // Delete the meme
    const result = await client.query('DELETE FROM memes WHERE id = $1 RETURNING *', [memeId]);
    
    await client.query('COMMIT');
    
    if (result.rows.length === 0) {
      throw new Error('Meme not found');
    }
    
    return result.rows[0];
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

export default pool;