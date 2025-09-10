import { Meme } from '@/data/mockMemes';

const MEMES_KEY = 'meme_arena_memes';
const VOTES_KEY = 'meme_arena_votes';

interface Vote {
  userId: string;
  memeId: string;
  type: 'up' | 'down';
}

/**
 * Initializes localStorage with mock meme data if no memes exist
 * This ensures the app has sample data on first load
 */
const initializeMemes = () => {
  const existing = localStorage.getItem(MEMES_KEY);
  if (!existing) {
    const mockMemes = [
      {
        id: "1",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=400&fit=crop",
        title: "When you find a bug in production",
        author: "CodeMaster99",
        authorId: "mock1",
        upvotes: 234,
        downvotes: 12,
        createdAt: "2024-01-15T10:30:00Z"
      },
      {
        id: "2", 
        imageUrl: "https://via.placeholder.com/500x400/4F46E5/FFFFFF?text=Me+explaining+why+I+need+another+monitor",
        title: "Me explaining why I need another monitor",
        author: "PixelPirate",
        authorId: "mock2",
        upvotes: 189,
        downvotes: 8,
        createdAt: "2024-01-15T09:15:00Z"
      },
      {
        id: "3",
        imageUrl: "https://via.placeholder.com/500x400/DC2626/FFFFFF?text=Emotional+Damage",
        title: "Emotional Damage",
        author: "ByteBender", 
        authorId: "mock3",
        upvotes: 342,
        downvotes: 23,
        createdAt: "2024-01-15T08:45:00Z"
      },
      {
        id: "4",
        imageUrl: "https://images.unsplash.com/photo-1520637836862-4d197d17c90a?w=500&h=400&fit=crop",
        title: "Frontend vs Backend developers arguing",
        author: "StackOverflow_God",
        authorId: "mock4",
        upvotes: 156,
        downvotes: 34,
        createdAt: "2024-01-15T07:20:00Z"
      },
      {
        id: "5",
        imageUrl: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=400&fit=crop",
        title: "My code after 6 months without comments",
        author: "RefactorRanger",
        authorId: "mock5",
        upvotes: 278,
        downvotes: 15,
        createdAt: "2024-01-15T06:10:00Z"
      },
      {
        id: "6",
        imageUrl: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=500&h=400&fit=crop", 
        title: "When the client changes requirements again",
        author: "AgileAvenger",
        authorId: "mock6",
        upvotes: 445,
        downvotes: 7,
        createdAt: "2024-01-15T05:30:00Z"
      }
    ];
    localStorage.setItem(MEMES_KEY, JSON.stringify(mockMemes));
  }
};

/**
 * Retrieves all memes from localStorage with user-specific vote information
 * @param userId - Optional user ID to include user's vote status
 * @returns Array of memes with vote counts and user vote status
 */
export const getAllMemes = (userId?: string): Meme[] => {
  initializeMemes();
  const memes = JSON.parse(localStorage.getItem(MEMES_KEY) || '[]');
  const votes = JSON.parse(localStorage.getItem(VOTES_KEY) || '[]');
  
  return memes.map((meme: any) => ({
    ...meme,
    userVote: userId ? votes.find((v: Vote) => v.userId === userId && v.memeId === meme.id)?.type || null : null
  }));
};

/**
 * Creates a new meme and stores it in localStorage
 * @param memeData - Meme creation data including title, image, author info
 * @returns The created meme object
 * @throws Error if storage quota is exceeded
 */
export const createMeme = (memeData: { title: string; imageUrl: string; author: string; authorId: string; tags?: string[] }): Meme => {
  const memes = JSON.parse(localStorage.getItem(MEMES_KEY) || '[]');
  const newMeme: any = {
    id: Date.now().toString(),
    ...memeData,
    tags: memeData.tags || [],
    upvotes: 0,
    downvotes: 0,
    createdAt: new Date().toISOString(),
    userVote: null,
    commentCount: 0
  };
  
  try {
    memes.push(newMeme);
    localStorage.setItem(MEMES_KEY, JSON.stringify(memes));
    return newMeme;
  } catch (error: any) {
    if (error.name === 'QuotaExceededError') {
      throw new Error('Storage limit reached. Your meme is too large or storage is full. Please try a smaller file or contact support.');
    }
    throw new Error('Failed to save meme. Please check your internet connection and try again.');
  }
};

/**
 * Handles voting on a meme (upvote/downvote)
 * Supports vote toggling and vote changing
 * @param memeId - ID of the meme to vote on
 * @param userId - ID of the user casting the vote
 * @param voteType - Type of vote: 'up' or 'down'
 * @returns Success status and updated meme data
 */
export const voteMeme = (memeId: string, userId: string, voteType: 'up' | 'down'): { success: boolean; meme: Meme } => {
  const memes = JSON.parse(localStorage.getItem(MEMES_KEY) || '[]');
  const votes = JSON.parse(localStorage.getItem(VOTES_KEY) || '[]');
  
  const memeIndex = memes.findIndex((m: any) => m.id === memeId);
  if (memeIndex === -1) throw new Error('This meme no longer exists or has been removed.');
  
  const existingVote = votes.find((v: Vote) => v.userId === userId && v.memeId === memeId);
  
  if (existingVote) {
    if (existingVote.type === voteType) {
      // User clicked same vote type - remove the vote (toggle off)
      const voteIndex = votes.indexOf(existingVote);
      votes.splice(voteIndex, 1);
      memes[memeIndex][voteType === 'up' ? 'upvotes' : 'downvotes']--;
    } else {
      // User changed vote type - update counters for both old and new vote
      memes[memeIndex][existingVote.type === 'up' ? 'upvotes' : 'downvotes']--;
      memes[memeIndex][voteType === 'up' ? 'upvotes' : 'downvotes']++;
      existingVote.type = voteType;
    }
  } else {
    // First time voting - add new vote
    votes.push({ userId, memeId, type: voteType });
    memes[memeIndex][voteType === 'up' ? 'upvotes' : 'downvotes']++;
  }
  
  localStorage.setItem(MEMES_KEY, JSON.stringify(memes));
  localStorage.setItem(VOTES_KEY, JSON.stringify(votes));
  
  const userVote = votes.find((v: Vote) => v.userId === userId && v.memeId === memeId)?.type || null;
  
  return {
    success: true,
    meme: { ...memes[memeIndex], userVote }
  };
};

// DELETE /api/memes/:id (any logged-in user)
export const deleteMeme = (memeId: string): boolean => {
  const memes = JSON.parse(localStorage.getItem(MEMES_KEY) || '[]');
  const votes = JSON.parse(localStorage.getItem(VOTES_KEY) || '[]');
  
  const memeIndex = memes.findIndex((m: any) => m.id === memeId);
  if (memeIndex === -1) throw new Error('Cannot delete: This meme no longer exists.');
  
  memes.splice(memeIndex, 1);
  const filteredVotes = votes.filter((v: Vote) => v.memeId !== memeId);
  
  localStorage.setItem(MEMES_KEY, JSON.stringify(memes));
  localStorage.setItem(VOTES_KEY, JSON.stringify(filteredVotes));
  
  return true;
};

// GET /api/leaderboard
export const getLeaderboard = (): Meme[] => {
  const memes = getAllMemes();
  return memes
    .sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes))
    .slice(0, 5);
};