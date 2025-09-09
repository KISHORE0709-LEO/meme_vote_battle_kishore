import { useState } from "react";
import Navigation from "@/components/Navigation";
import MemeCard from "@/components/MemeCard";
import { mockMemes } from "@/data/mockMemes";
import heroImage from "@/assets/hero-cyber.jpg";
import { Button } from "@/components/ui/button";
import { Zap, Crown, Users } from "lucide-react";

const Arena = () => {
  const [memes] = useState(mockMemes);

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
            <span className="text-gradient-primary">MEME</span>
            <br />
            <span className="text-gradient-secondary">ARENA</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Welcome to the ultimate battleground where the funniest memes rise to glory. 
            Vote, upload, and dominate the leaderboard! 🎭
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="btn-arena text-lg px-8 py-4 pulse-cyber">
              <Zap className="mr-2" size={20} />
              Enter the Cyber Arena
            </Button>
            <Button size="lg" className="btn-cyber text-lg px-8 py-4">
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
                upvotes={meme.upvotes}
                downvotes={meme.downvotes}
                userVote={meme.userVote}
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