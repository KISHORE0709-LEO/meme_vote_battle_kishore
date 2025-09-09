import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ChevronUp, ChevronDown, ArrowLeft, Share2, MessageCircle, Send } from 'lucide-react';
import { getAllMemes, voteMeme } from '@/services/memeService';
import { getComments, createComment, voteComment } from '@/services/commentService';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Meme } from '@/data/mockMemes';

const MemeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [meme, setMeme] = useState<Meme | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    if (id) {
      const memes = getAllMemes(user?.id);
      const foundMeme = memes.find(m => m.id === id);
      setMeme(foundMeme || null);
      
      const memeComments = getComments(id, user?.id);
      setComments(memeComments);
    }
  }, [id, user]);

  const handleVote = (voteType: 'up' | 'down') => {
    if (!isAuthenticated || !user || !meme) {
      toast({
        title: "Login Required",
        description: "Please login to vote on memes",
        variant: "destructive"
      });
      return;
    }

    try {
      const result = voteMeme(meme.id, user.id, voteType);
      setMeme(result.meme);
      
      toast({
        title: result.meme.userVote ? (result.meme.userVote === "up" ? "Upvoted!" : "Downvoted!") : "Vote removed",
        description: meme.title,
        duration: 2000,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to vote",
        variant: "destructive"
      });
    }
  };

  if (!meme) {
    return (
      <div className="min-h-screen pt-16">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">Meme not found</h2>
            <Button onClick={() => navigate('/arena')}>
              <ArrowLeft className="mr-2" size={16} />
              Back to Arena
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const handleCommentSubmit = () => {
    if (!isAuthenticated || !user || !meme || !newComment.trim()) {
      toast({
        title: "Login Required",
        description: "Please login to comment",
        variant: "destructive"
      });
      return;
    }

    try {
      createComment(meme.id, user.id, user.username, newComment.trim());
      setNewComment('');
      const updatedComments = getComments(meme.id, user.id);
      setComments(updatedComments);
      
      toast({
        title: "Comment Added!",
        description: "Your comment has been posted",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post comment",
        variant: "destructive"
      });
    }
  };

  const handleCommentVote = (commentId: string, voteType: 'up' | 'down') => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Login Required",
        description: "Please login to vote",
        variant: "destructive"
      });
      return;
    }

    try {
      voteComment(commentId, user.id, voteType);
      const updatedComments = getComments(meme!.id, user.id);
      setComments(updatedComments);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to vote on comment",
        variant: "destructive"
      });
    }
  };

  const handleShare = (platform: string) => {
    const memeUrl = `${window.location.origin}/meme/${id}`;
    const text = `Check out this hilarious meme: "${meme!.title}" on Meme Arena!`;
    
    const urls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + memeUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(memeUrl)}`,
      instagram: memeUrl
    };
    
    if (platform === 'instagram') {
      navigator.clipboard.writeText(memeUrl);
      toast({ title: "Link Copied!", description: "Share this link on Instagram Stories" });
    } else {
      window.open(urls[platform as keyof typeof urls], '_blank');
    }
  };

  const netScore = meme.upvotes - meme.downvotes;

  return (
    <div className="min-h-screen pt-16">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <Button 
          variant="outline" 
          onClick={() => navigate('/arena')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2" size={16} />
          Back to Arena
        </Button>

        <Card className="card-arena">
          <CardContent className="p-0">
            <div className="relative">
              {meme.imageUrl.startsWith('data:video') || meme.imageUrl.includes('.mp4') || meme.imageUrl.includes('.webm') ? (
                <video 
                  src={meme.imageUrl}
                  className="w-full max-h-96 object-contain bg-black"
                  controls
                  muted
                />
              ) : (
                <img 
                  src={meme.imageUrl} 
                  alt={meme.title}
                  className="w-full max-h-96 object-contain bg-black"
                />
              )}
              <div className="absolute top-4 right-4">
                <div className="relative group">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
                  >
                    <Share2 size={16} />
                  </Button>
                  <div className="absolute right-0 top-full mt-2 bg-card border rounded-lg shadow-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <div className="flex flex-col gap-1">
                      <Button size="sm" variant="ghost" onClick={() => handleShare('whatsapp')} className="text-green-600">
                        WhatsApp
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleShare('twitter')} className="text-blue-500">
                        Twitter
                      </Button>
                      <Button size="sm" variant="ghost" onClick={() => handleShare('instagram')} className="text-pink-500">
                        Instagram
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-6">
              <h1 className="text-3xl font-bold text-foreground mb-2">{meme.title}</h1>
              <p className="text-muted-foreground mb-6">by {meme.author}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className={`btn-vote-up ${meme.userVote === "up" ? "bg-success text-success-foreground" : ""}`}
                    onClick={() => handleVote("up")}
                  >
                    <ChevronUp size={20} className="mr-2" />
                    {meme.upvotes}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="lg"
                    className={`btn-vote-down ${meme.userVote === "down" ? "bg-destructive text-destructive-foreground" : ""}`}
                    onClick={() => handleVote("down")}
                  >
                    <ChevronDown size={20} className="mr-2" />
                    {meme.downvotes}
                  </Button>
                </div>
                
                <div className="text-right">
                  <div className={`font-bold text-3xl ${
                    netScore > 0 ? "text-success" : 
                    netScore < 0 ? "text-destructive" : 
                    "text-muted-foreground"
                  }`}>
                    {netScore > 0 ? "+" : ""}{netScore}
                  </div>
                  <div className="text-sm text-muted-foreground">net score</div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-border">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-success">{meme.upvotes}</div>
                    <div className="text-xs text-muted-foreground">Upvotes</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-destructive">{meme.downvotes}</div>
                    <div className="text-xs text-muted-foreground">Downvotes</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-primary">
                      {Math.round((meme.upvotes / (meme.upvotes + meme.downvotes)) * 100) || 0}%
                    </div>
                    <div className="text-xs text-muted-foreground">Approval</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments Section */}
        <Card className="card-arena mt-8">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <MessageCircle className="mr-2" size={24} />
              Comments ({comments.length})
            </h2>
            
            {/* Add Comment */}
            {isAuthenticated ? (
              <div className="flex gap-2 mb-6">
                <Input
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCommentSubmit()}
                  className="flex-1"
                />
                <Button onClick={handleCommentSubmit} disabled={!newComment.trim()}>
                  <Send size={16} />
                </Button>
              </div>
            ) : (
              <div className="text-center py-4 mb-6 bg-muted/20 rounded-lg">
                <p className="text-muted-foreground">Please login to comment</p>
              </div>
            )}
            
            {/* Comments List */}
            <div className="space-y-4">
              {comments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No comments yet. Be the first to comment!
                </div>
              ) : (
                comments.map((comment) => (
                  <div key={comment.id} className="border border-border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="font-semibold">{comment.author}</span>
                        <span className="text-muted-foreground text-sm ml-2">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className="text-foreground mb-3">{comment.text}</p>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className={`${comment.userVote === 'up' ? 'bg-success text-success-foreground' : ''}`}
                        onClick={() => handleCommentVote(comment.id, 'up')}
                      >
                        <ChevronUp size={14} className="mr-1" />
                        {comment.upvotes}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className={`${comment.userVote === 'down' ? 'bg-destructive text-destructive-foreground' : ''}`}
                        onClick={() => handleCommentVote(comment.id, 'down')}
                      >
                        <ChevronDown size={14} className="mr-1" />
                        {comment.downvotes}
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MemeDetail;