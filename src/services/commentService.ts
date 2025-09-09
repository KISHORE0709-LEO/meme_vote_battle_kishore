const COMMENTS_KEY = 'meme_arena_comments';
const COMMENT_VOTES_KEY = 'meme_arena_comment_votes';

interface Comment {
  id: string;
  memeId: string;
  userId: string;
  author: string;
  text: string;
  upvotes: number;
  downvotes: number;
  createdAt: string;
  userVote?: 'up' | 'down' | null;
}

interface CommentVote {
  userId: string;
  commentId: string;
  type: 'up' | 'down';
}

export const getComments = (memeId: string, userId?: string): Comment[] => {
  const comments = JSON.parse(localStorage.getItem(COMMENTS_KEY) || '[]');
  const votes = JSON.parse(localStorage.getItem(COMMENT_VOTES_KEY) || '[]');
  
  return comments
    .filter((comment: Comment) => comment.memeId === memeId)
    .map((comment: Comment) => ({
      ...comment,
      userVote: userId ? votes.find((v: CommentVote) => v.userId === userId && v.commentId === comment.id)?.type || null : null
    }))
    .sort((a: Comment, b: Comment) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
};

export const createComment = (memeId: string, userId: string, author: string, text: string): Comment => {
  const comments = JSON.parse(localStorage.getItem(COMMENTS_KEY) || '[]');
  
  const newComment: Comment = {
    id: Date.now().toString(),
    memeId,
    userId,
    author,
    text,
    upvotes: 0,
    downvotes: 0,
    createdAt: new Date().toISOString()
  };
  
  comments.push(newComment);
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
  
  return newComment;
};

export const voteComment = (commentId: string, userId: string, voteType: 'up' | 'down'): { success: boolean; comment: Comment } => {
  const comments = JSON.parse(localStorage.getItem(COMMENTS_KEY) || '[]');
  const votes = JSON.parse(localStorage.getItem(COMMENT_VOTES_KEY) || '[]');
  
  const commentIndex = comments.findIndex((c: Comment) => c.id === commentId);
  if (commentIndex === -1) throw new Error('Comment not found');
  
  const existingVote = votes.find((v: CommentVote) => v.userId === userId && v.commentId === commentId);
  
  if (existingVote) {
    if (existingVote.type === voteType) {
      // Remove vote
      const voteIndex = votes.indexOf(existingVote);
      votes.splice(voteIndex, 1);
      comments[commentIndex][voteType === 'up' ? 'upvotes' : 'downvotes']--;
    } else {
      // Change vote
      comments[commentIndex][existingVote.type === 'up' ? 'upvotes' : 'downvotes']--;
      comments[commentIndex][voteType === 'up' ? 'upvotes' : 'downvotes']++;
      existingVote.type = voteType;
    }
  } else {
    // New vote
    votes.push({ userId, commentId, type: voteType });
    comments[commentIndex][voteType === 'up' ? 'upvotes' : 'downvotes']++;
  }
  
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
  localStorage.setItem(COMMENT_VOTES_KEY, JSON.stringify(votes));
  
  const userVote = votes.find((v: CommentVote) => v.userId === userId && v.commentId === commentId)?.type || null;
  
  return {
    success: true,
    comment: { ...comments[commentIndex], userVote }
  };
};

export const getCommentCount = (memeId: string): number => {
  const comments = JSON.parse(localStorage.getItem(COMMENTS_KEY) || '[]');
  return comments.filter((comment: Comment) => comment.memeId === memeId).length;
};