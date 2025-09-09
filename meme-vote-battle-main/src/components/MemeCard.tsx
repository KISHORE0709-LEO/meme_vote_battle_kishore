import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MemeCardProps {
  id: string;
  imageUrl: string;
  title: string;
  author: string;
  upvotes: number;
  downvotes: number;
  userVote?: "up" | "down" | null;
}

const MemeCard = ({ 
  id, 
  imageUrl, 
  title, 
  author, 
  upvotes: initialUpvotes, 
  downvotes: initialDownvotes,
  userVote: initialUserVote 
}: MemeCardProps) => {
  const [upvotes, setUpvotes] = useState(initialUpvotes);
  const [downvotes, setDownvotes] = useState(initialDownvotes);
  const [userVote, setUserVote] = useState(initialUserVote);
  const { toast } = useToast();

  const handleVote = (voteType: "up" | "down") => {
    // Simulate voting logic
    if (userVote === voteType) {
      // Remove vote
      if (voteType === "up") {
        setUpvotes(prev => prev - 1);
      } else {
        setDownvotes(prev => prev - 1);
      }
      setUserVote(null);
    } else {
      // Add or change vote
      if (userVote === "up" && voteType === "down") {
        setUpvotes(prev => prev - 1);
        setDownvotes(prev => prev + 1);
      } else if (userVote === "down" && voteType === "up") {
        setDownvotes(prev => prev - 1);
        setUpvotes(prev => prev + 1);
      } else {
        if (voteType === "up") {
          setUpvotes(prev => prev + 1);
        } else {
          setDownvotes(prev => prev + 1);
        }
      }
      setUserVote(voteType);
    }

    toast({
      title: voteType === "up" ? "Upvoted!" : "Downvoted!",
      description: `You ${voteType}voted "${title}"`,
      duration: 2000,
    });
  };

  const netScore = upvotes - downvotes;

  return (
    <div className="card-arena">
      <div className="relative">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-4 right-4">
          <Button
            variant="outline"
            size="sm"
            className="bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
          >
            <Share2 size={16} />
          </Button>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground text-sm mb-4">by {author}</p>
        
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