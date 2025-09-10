import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import MemeCard from "@/components/MemeCard";
import { getAllMemes } from "@/services/memeService";
import { getCommentCount } from "@/services/commentService";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Generates a personalized title/keyword for the user based on their voting history
 * Analyzes the user's recent upvotes to determine their meme preferences
 * @param user - Current user object
 * @param memes - Array of all memes to analyze voting patterns
 * @returns Personalized keyword/title string
 */
const generatePersonalizedKeyword = (user: any, memes: any[]) => {
  if (!user) return "Cyber Warrior";
  
  // Get user's voting history from localStorage
  const votes = JSON.parse(localStorage.getItem('meme_arena_votes') || '[]');
  // Get last 5 upvotes to analyze recent preferences
  const userUpvotes = votes.filter((v: any) => v.userId === user.id && v.type === 'up').slice(-5);
  
  if (userUpvotes.length === 0) return "Rising Champion";
  
  // Extract titles of memes the user upvoted
  const upvotedMemes = userUpvotes.map((vote: any) => 
    memes.find(m => m.id === vote.memeId)?.title || ''
  ).filter(Boolean); // Remove empty titles
  
  const keywords = {
    'bug': 'Code Slayer',
    'production': 'Deploy Master', 
    'client': 'Client Whisperer',
    'code': 'Syntax Samurai',
    'emotional': 'Feels Guardian',
    'damage': 'Chaos Controller',
    'monitor': 'Screen Collector',
    'frontend': 'UI Ninja',
    'backend': 'Logic Lord'
  };
  
  // Check if any upvoted meme titles contain keyword patterns
  for (const [key, value] of Object.entries(keywords)) {
    if (upvotedMemes.some(title => title.toLowerCase().includes(key))) {
      return value;
    }
  }
  
  return ["Meme Connoisseur", "Humor Expert", "Laugh Master", "Comedy Critic"][userUpvotes.length % 4];
};
import heroImage from "@/assets/hero-cyber.jpg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, Crown, Users, Star } from "lucide-react";
import { Meme } from "@/data/mockMemes";

const Arena = () => {
  const [memes, setMemes] = useState<Meme[]>([]);
  const [personalizedKeyword, setPersonalizedKeyword] = useState("");
  const [memeOfTheDay, setMemeOfTheDay] = useState<Meme | null>(null);
  const { user } = useAuth();

  /**
 * Determines the "Meme of the Day" based on highest score
 * Uses localStorage to cache the selection for 24 hours
 * @param memes - Array of all available memes
 * @returns The meme with highest score for today, or null if no memes
 */
const getMemeOfTheDay = (memes: Meme[]) => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem('meme_of_the_day');
    
    if (stored) {
      const { date, memeId } = JSON.parse(stored);
      if (date === today) {
        return memes.find(m => m.id === memeId) || null;
      }
    }
    
    // Calculate new meme of the day based on highest net score (upvotes - downvotes)
    const sortedMemes = [...memes].sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
    const topMeme = sortedMemes[0]; // Get meme with highest score
    
    if (topMeme) {
      localStorage.setItem('meme_of_the_day', JSON.stringify({ date: today, memeId: topMeme.id }));
    }
    
    return topMeme || null;
  };

  const loadMemes = () => {
    const allMemes = getAllMemes(user?.id);
    setMemes(allMemes);
    setPersonalizedKeyword(generatePersonalizedKeyword(user, allMemes));
    setMemeOfTheDay(getMemeOfTheDay(allMemes));
  };

  useEffect(() => {
    loadMemes();
  }, [user]);

  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-6xl md:text-8xl font-black mb-6">
            <span className="text-gradient-primary">MEME </span>
            <span className="text-gradient-secondary">ARENA</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
            {user ? (
              <>Welcome back, <span className="text-gradient-primary font-bold">{personalizedKeyword} {user.username}</span>! Ready to conquer the digital arena? 🎭</>
            ) : (
              "Welcome to the ultimate battleground where the funniest memes rise to glory. Vote, upload, and dominate the leaderboard! 🎭"
            )}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="btn-arena text-lg px-8 py-4 pulse-cyber"
              onClick={() => window.location.href = '/upload'}
            >
              <Zap className="mr-2" size={20} />
              Upload Your Meme
            </Button>
            <Button 
              size="lg" 
              className="btn-cyber text-lg px-8 py-4"
              onClick={() => window.location.href = '/battle'}
            >
              Watch the Battle
            </Button>
          </div>

          {/* Stats */}
          <div className="flex justify-center space-x-8 mt-16">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Users className="text-primary" size={32} />
              </div>
              <div className="text-3xl font-bold text-gradient-primary">2.4K</div>
              <div className="text-gray-300">Cyber Warriors</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Zap className="text-secondary" size={32} />
              </div>
              <div className="text-3xl font-bold text-gradient-secondary">12.8K</div>
              <div className="text-gray-300">Neural Battles</div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Crown className="text-accent" size={32} />
              </div>
              <div className="text-3xl font-bold text-gradient-accent">847</div>
              <div className="text-gray-300">Digital Champions</div>
            </div>
          </div>
        </div>
      </section>

      {/* Meme Feed */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gradient-primary mb-4 glow-text">
              ⚡ Cyber Battles
            </h2>
            <p className="text-xl text-muted-foreground">
              The hottest memes currently battling in the digital arena
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {memes.map((meme) => (
              <MemeCard
                key={meme.id}
                id={meme.id}
                imageUrl={meme.imageUrl}
                title={meme.title}
                author={meme.author}
                authorId={(meme as any).authorId}
                upvotes={meme.upvotes}
                downvotes={meme.downvotes}
                userVote={meme.userVote}
                tags={(meme as any).tags || []}
                commentCount={getCommentCount(meme.id)}
                onUpdate={loadMemes}
              />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="text-lg px-8">
              Load More Epic Battles
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Arena;