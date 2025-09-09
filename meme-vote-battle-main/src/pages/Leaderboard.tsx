import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockMemes } from "@/data/mockMemes";
import { Trophy, Crown, Medal, TrendingUp } from "lucide-react";

const Leaderboard = () => {
  // Sort memes by net score (upvotes - downvotes)
  const topMemes = [...mockMemes]
    .map(meme => ({
      ...meme,
      netScore: meme.upvotes - meme.downvotes
    }))
    .sort((a, b) => b.netScore - a.netScore)
    .slice(0, 10);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Crown className="text-yellow-400" size={24} />;
      case 1:
        return <Trophy className="text-gray-400" size={24} />;
      case 2:
        return <Medal className="text-orange-400" size={24} />;
      default:
        return <span className="text-2xl font-bold text-muted-foreground">#{index + 1}</span>;
    }
  };

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black">Champion</Badge>;
      case 1:
        return <Badge className="bg-gradient-to-r from-gray-300 to-gray-500 text-black">Runner-up</Badge>;
      case 2:
        return <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white">3rd Place</Badge>;
      default:
        return <Badge variant="outline">Top 10</Badge>;
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gradient-primary mb-4 glow-text">
            🚀 Neural Hall of Fame
          </h1>
          <p className="text-xl text-muted-foreground">
            The most legendary memes that conquered the cyber arena
          </p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {topMemes.slice(0, 3).map((meme, index) => (
            <Card key={meme.id} className={`card-arena ${index === 0 ? 'ring-2 ring-primary shadow-glow-primary' : ''}`}>
              <CardHeader className="text-center">
                <div className="flex justify-center mb-2">
                  {getRankIcon(index)}
                </div>
                {getRankBadge(index)}
              </CardHeader>
              <CardContent className="text-center">
                <img 
                  src={meme.imageUrl} 
                  alt={meme.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="font-bold text-lg mb-2">{meme.title}</h3>
                <p className="text-muted-foreground text-sm mb-3">by {meme.author}</p>
                
                <div className="flex justify-center items-center space-x-4">
                  <div className="text-center">
                    <div className="text-success font-bold text-xl">↑{meme.upvotes}</div>
                    <div className="text-xs text-muted-foreground">upvotes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-destructive font-bold text-xl">↓{meme.downvotes}</div>
                    <div className="text-xs text-muted-foreground">downvotes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-primary font-bold text-xl">{meme.netScore}</div>
                    <div className="text-xs text-muted-foreground">net score</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Full Leaderboard */}
        <Card className="card-arena">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="mr-2 text-primary" size={24} />
              Complete Rankings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topMemes.map((meme, index) => (
                <div 
                  key={meme.id}
                  className={`flex items-center space-x-4 p-4 rounded-lg transition-all duration-200 hover:bg-muted/20 ${
                    index < 3 ? 'bg-muted/10' : ''
                  }`}
                >
                  <div className="flex items-center justify-center w-12">
                    {getRankIcon(index)}
                  </div>
                  
                  <img 
                    src={meme.imageUrl} 
                    alt={meme.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg">{meme.title}</h4>
                    <p className="text-muted-foreground">by {meme.author}</p>
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="text-center">
                      <div className="text-success font-bold">↑{meme.upvotes}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-destructive font-bold">↓{meme.downvotes}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-primary font-bold text-xl">{meme.netScore}</div>
                      <div className="text-xs text-muted-foreground">net score</div>
                    </div>
                    {index < 3 && getRankBadge(index)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mt-12">
          <Card className="card-arena text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-gradient-primary mb-2">
                {topMemes.reduce((sum, meme) => sum + meme.upvotes + meme.downvotes, 0).toLocaleString()}
              </div>
              <p className="text-muted-foreground">Total Votes Cast</p>
            </CardContent>
          </Card>
          
          <Card className="card-arena text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-gradient-secondary mb-2">
                {topMemes[0]?.netScore || 0}
              </div>
              <p className="text-muted-foreground">Highest Score</p>
            </CardContent>
          </Card>
          
          <Card className="card-arena text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-gradient-primary mb-2">
                {new Set(topMemes.map(meme => meme.author)).size}
              </div>
              <p className="text-muted-foreground">Unique Champions</p>
            </CardContent>
          </Card>
          
          <Card className="card-arena text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-gradient-secondary mb-2">
                {Math.round(topMemes.reduce((sum, meme) => sum + (meme.upvotes / (meme.upvotes + meme.downvotes) * 100), 0) / topMemes.length)}%
              </div>
              <p className="text-muted-foreground">Avg Approval</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;