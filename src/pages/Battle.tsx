import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getAllMemes, voteMeme } from "@/services/memeService";

const BATTLE_VOTES_KEY = 'meme_arena_battle_votes';

const getBattleVotes = () => {
  const votes = localStorage.getItem(BATTLE_VOTES_KEY);
  return votes ? JSON.parse(votes) : [];
};

const saveBattleVote = (userId: string, meme1Id: string, meme2Id: string, winnerId: string) => {
  const votes = getBattleVotes();
  const battleKey = [meme1Id, meme2Id].sort().join('-');
  votes.push({ userId, battleKey, winnerId, timestamp: Date.now() });
  localStorage.setItem(BATTLE_VOTES_KEY, JSON.stringify(votes));
};

const hasUserVotedInBattle = (userId: string, meme1Id: string, meme2Id: string) => {
  const votes = getBattleVotes();
  const battleKey = [meme1Id, meme2Id].sort().join('-');
  return votes.some((vote: any) => vote.userId === userId && vote.battleKey === battleKey);
};
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Swords, Crown } from "lucide-react";
import { Meme } from "@/data/mockMemes";

const Battle = () => {
  const [meme1, setMeme1] = useState<Meme | null>(null);
  const [meme2, setMeme2] = useState<Meme | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [battleHistory, setBattleHistory] = useState<string[]>([]);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const getRandomMemes = () => {
    const memes = getAllMemes();
    if (memes.length < 2) return;
    
    // Filter out previously battled memes
    const availableMemes = memes.filter(meme => !battleHistory.includes(meme.id));
    
    // If less than 2 available, reset history
    if (availableMemes.length < 2) {
      setBattleHistory([]);
      const shuffled = [...memes].sort(() => Math.random() - 0.5);
      setMeme1(shuffled[0]);
      setMeme2(shuffled[1]);
      return;
    }
    
    const shuffled = [...availableMemes].sort(() => Math.random() - 0.5);
    setMeme1(shuffled[0]);
    setMeme2(shuffled[1]);
  };

  useEffect(() => {
    getRandomMemes();
  }, []);

  const handleVote = async (selectedMeme: Meme) => {
    if (!isAuthenticated || !user || !meme1 || !meme2) {
      toast({
        title: "Login Required",
        description: "Please login to participate in battles",
        variant: "destructive"
      });
      return;
    }

    // Check if user already voted in this battle
    if (hasUserVotedInBattle(user.id, meme1.id, meme2.id)) {
      toast({
        title: "Already Voted",
        description: "You've already voted in this battle!",
        variant: "destructive"
      });
      return;
    }

    setIsVoting(true);
    try {
      // Vote for winner (upvote)
      voteMeme(selectedMeme.id, user.id, "up");
      
      // Save battle vote
      saveBattleVote(user.id, meme1.id, meme2.id, selectedMeme.id);
      
      // Track this battle to avoid repeats
      setBattleHistory(prev => [...prev, meme1.id, meme2.id]);
      
      toast({
        title: "Battle Vote Cast! ⚔️",
        description: `You chose "${selectedMeme.title}" as the winner!`,
      });
      
      setTimeout(() => {
        getRandomMemes();
        setIsVoting(false);
      }, 1500);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to cast vote",
        variant: "destructive"
      });
      setIsVoting(false);
    }
  };

  if (!meme1 || !meme2) {
    return (
      <div className="min-h-screen pt-16">
        <Navigation />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Loading battle...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gradient-primary mb-4 glow-text">
            ⚔️ Meme Battle Arena
          </h1>
          <p className="text-xl text-muted-foreground">
            Choose your champion! Click on the meme you think deserves the victory.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Card 
            className={`card-arena cursor-pointer transition-all duration-300 hover:scale-105 ${isVoting ? 'pointer-events-none opacity-50' : ''}`}
            onClick={() => handleVote(meme1)}
          >
            <CardContent className="p-0">
              <div className="relative">
                {meme1.imageUrl.startsWith('data:video') || meme1.imageUrl.includes('.mp4') || meme1.imageUrl.includes('.webm') ? (
                  <video 
                    src={meme1.imageUrl}
                    className="w-full h-80 object-cover rounded-t-lg"
                    muted
                    loop
                    autoPlay
                  />
                ) : (
                  <img 
                    src={meme1.imageUrl} 
                    alt={meme1.title}
                    className="w-full h-80 object-cover rounded-t-lg"
                  />
                )}
                <div className="absolute top-4 left-4">
                  <div className="bg-blue-500/80 backdrop-blur-sm px-3 py-1 rounded-full text-white font-bold">
                    <Crown size={16} className="inline mr-1" />
                    Challenger 1
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{meme1.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">by {meme1.author}</p>
                <div className="flex justify-between items-center">
                  <div className="text-success font-bold">↑{meme1.upvotes}</div>
                  <div className="text-destructive font-bold">↓{meme1.downvotes}</div>
                  <div className="text-primary font-bold">Score: {meme1.upvotes - meme1.downvotes}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className={`card-arena cursor-pointer transition-all duration-300 hover:scale-105 ${isVoting ? 'pointer-events-none opacity-50' : ''}`}
            onClick={() => handleVote(meme2)}
          >
            <CardContent className="p-0">
              <div className="relative">
                {meme2.imageUrl.startsWith('data:video') || meme2.imageUrl.includes('.mp4') || meme2.imageUrl.includes('.webm') ? (
                  <video 
                    src={meme2.imageUrl}
                    className="w-full h-80 object-cover rounded-t-lg"
                    muted
                    loop
                    autoPlay
                  />
                ) : (
                  <img 
                    src={meme2.imageUrl} 
                    alt={meme2.title}
                    className="w-full h-80 object-cover rounded-t-lg"
                  />
                )}
                <div className="absolute top-4 right-4">
                  <div className="bg-red-500/80 backdrop-blur-sm px-3 py-1 rounded-full text-white font-bold">
                    <Crown size={16} className="inline mr-1" />
                    Challenger 2
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{meme2.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">by {meme2.author}</p>
                <div className="flex justify-between items-center">
                  <div className="text-success font-bold">↑{meme2.upvotes}</div>
                  <div className="text-destructive font-bold">↓{meme2.downvotes}</div>
                  <div className="text-primary font-bold">Score: {meme2.upvotes - meme2.downvotes}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <div className="flex items-center justify-center mb-6">
            <Swords className="text-primary" size={32} />
          </div>
          <Button 
            onClick={getRandomMemes}
            className="btn-arena"
            disabled={isVoting}
          >
            {isVoting ? "Casting Vote..." : "New Battle"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Battle;