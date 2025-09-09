import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, Share2, Trash2, MessageCircle, Tag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useWebSocket } from "@/contexts/WebSocketContext";
import { voteMeme, deleteMeme } from "@/services/memeService";
import { useNavigate } from "react-router-dom";

interface MemeCardProps {
  id: string;
  imageUrl: string;
  title: string;
  author: string;
  authorId?: string;
  upvotes: number;
  downvotes: number;
  userVote?: "up" | "down" | null;
  tags?: string[];
  commentCount?: number;
  onUpdate?: () => void;
}

const MemeCard = ({ 
  id, 
  imageUrl, 
  title, 
  author,
  authorId, 
  upvotes: initialUpvotes, 
  downvotes: initialDownvotes,
  userVote: initialUserVote,
  tags = [],
  commentCount = 0,
  onUpdate
}: MemeCardProps) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [userVote, setUserVote] = useState(initialUserVote);
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const { sendMessage } = useWebSocket();
  const navigate = useNavigate();

  const handleVote = (voteType: "up" | "down") => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Login Required",
        description: "Please login to vote on memes",
        variant: "destructive"
      });
      return;
    }

    try {
      const result = voteMeme(id, user.id, voteType);
      setUpvotes(result.meme.upvotes);
      setDownvotes(result.meme.downvotes);
      setUserVote(result.meme.userVote);
      
      // Send real-time update
      sendMessage({
        type: 'VOTE_UPDATE',
        memeId: id,
        upvotes: result.meme.upvotes,
        downvotes: result.meme.downvotes
      });
      
      toast({
        title: result.meme.userVote ? (result.meme.userVote === "up" ? "Upvoted!" : "Downvoted!") : "Vote removed",
        description: `${title}`,
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

  const handleDelete = () => {
    if (!user) return;
    
    try {
      deleteMeme(id);
      toast({
        title: "Meme Deleted",
        description: "Meme has been removed"
      });
      onUpdate?.();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete meme",
        variant: "destructive"
      });
    }
  };

  // Allow any logged-in user to delete memes (for testing)
  const canDelete = !!user;

  const handleShare = (platform: string) => {
    const memeUrl = `${window.location.origin}/meme/${id}`;
    const text = `Check out this hilarious meme: "${title}" on Meme Arena!`;
    
    const urls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(text + ' ' + memeUrl)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(memeUrl)}`,
      instagram: memeUrl // Instagram doesn't support direct sharing, just copy URL
    };
    
    if (platform === 'instagram') {
      navigator.clipboard.writeText(memeUrl);
      toast({ title: "Link Copied!", description: "Share this link on Instagram Stories" });
    } else {
      window.open(urls[platform as keyof typeof urls], '_blank');
    }
  };

  const netScore = upvotes - downvotes;

  return (
    <div className="card-arena">
      <div className="relative cursor-pointer" onClick={() => navigate(`/meme/${id}`)}>
        {imageUrl.startsWith('data:video') || imageUrl.includes('.mp4') || imageUrl.includes('.webm') ? (
          <video 
            src={imageUrl}
            className="w-full h-64 object-cover hover:opacity-90 transition-opacity"
            muted
            loop
            autoPlay
          />
        ) : (
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-64 object-cover hover:opacity-90 transition-opacity"
          />
        )}
        <div className="absolute top-4 right-4 flex gap-2">
          {canDelete && (
            <Button
              variant="outline"
              size="sm"
              className="bg-red-500/80 backdrop-blur-sm border-red-400/20 text-white hover:bg-red-600/80"
              onClick={handleDelete}
            >
              <Trash2 size={16} />
            </Button>
          )}
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
        <h3 
          className="text-xl font-bold text-foreground mb-2 cursor-pointer hover:text-primary transition-colors"
          onClick={() => navigate(`/meme/${id}`)}
        >
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-2">by {author}</p>
        
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.map((tag, index) => (
              <span key={index} className="bg-primary/20 text-primary px-2 py-1 rounded-full text-xs flex items-center">
                <Tag size={10} className="mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className={`btn-vote-up ${userVote === "up" ? "bg-success text-success-foreground" : ""}`}
              onClick={() => handleVote("up")}
            >
              <ChevronUp size={16} className="mr-1" />
              {upvotes}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className={`btn-vote-down ${userVote === "down" ? "bg-destructive text-destructive-foreground" : ""}`}
              onClick={() => handleVote("down")}
            >
              <ChevronDown size={16} className="mr-1" />
              {downvotes}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate(`/meme/${id}`)}
              className="text-muted-foreground hover:text-foreground"
            >
              <MessageCircle size={16} className="mr-1" />
              {commentCount}
            </Button>
          </div>
          
          <div className="text-right">
            <div className={`font-bold text-lg ${
              netScore > 0 ? "text-success" : 
              netScore < 0 ? "text-destructive" : 
              "text-muted-foreground"
            }`}>
              {netScore > 0 ? "+" : ""}{netScore}
            </div>
            <div className="text-xs text-muted-foreground">net score</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemeCard;