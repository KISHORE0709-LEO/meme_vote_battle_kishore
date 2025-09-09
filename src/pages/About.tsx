import Navigation from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Home, Swords, Trophy, Star, Upload, MessageCircle, Share2, 
  Tag, Sparkles, Eye, ThumbsUp, ThumbsDown, Crown, Users,
  Shield, Lock, Zap, RefreshCw, Heart
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen pt-16">
      <Navigation />
      
      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gradient-primary mb-4 glow-text">
            🎭 About Meme Arena
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The ultimate digital battleground where memes compete for glory! 
            Upload, vote, battle, and climb the leaderboard in the most epic meme voting platform.
          </p>
        </div>

        {/* Navigation Guide */}
        <Card className="card-arena mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              🧭 Navigation Guide
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Home className="text-primary mt-1" size={20} />
                  <div>
                    <h3 className="font-bold">Arena (Home)</h3>
                    <p className="text-sm text-muted-foreground">Main meme feed with voting, comments, and sharing. View all memes in a grid layout.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Swords className="text-secondary mt-1" size={20} />
                  <div>
                    <h3 className="font-bold">Battle Mode</h3>
                    <p className="text-sm text-muted-foreground">Head-to-head meme battles. Choose between two memes - winner gets an upvote!</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Trophy className="text-accent mt-1" size={20} />
                  <div>
                    <h3 className="font-bold">Leaderboard</h3>
                    <p className="text-sm text-muted-foreground">Top 10 memes ranked by net score (upvotes - downvotes). See the champions!</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Star className="text-yellow-400 mt-1" size={20} />
                  <div>
                    <h3 className="font-bold">MOTD (Meme of the Day)</h3>
                    <p className="text-sm text-muted-foreground">Daily spotlight for the highest-scoring meme. Updates automatically each day.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Core Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Voting System */}
          <Card className="card-arena">
            <CardHeader>
              <CardTitle className="flex items-center">
                <ThumbsUp className="mr-2 text-success" size={24} />
                Voting System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-success">Upvote ↑</Badge>
                  <span className="text-sm">Like the meme? Give it an upvote!</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-destructive">Downvote ↓</Badge>
                  <span className="text-sm">Not funny? Downvote it.</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">Toggle</Badge>
                  <span className="text-sm">Change or remove your vote anytime</span>
                </div>
              </div>
              <div className="bg-muted/20 p-3 rounded-lg">
                <p className="text-sm"><strong>Rules:</strong></p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• One vote per meme per user</li>
                  <li>• Must be logged in to vote</li>
                  <li>• Votes update in real-time</li>
                  <li>• Net score = Upvotes - Downvotes</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          {/* Upload System */}
          <Card className="card-arena">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="mr-2 text-primary" size={24} />
                Upload System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Badge className="bg-primary">Images</Badge>
                  <span className="text-sm">JPG, PNG, GIF, WebP</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-secondary">Videos</Badge>
                  <span className="text-sm">MP4, WebM (auto-play)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-accent">AI Captions</Badge>
                  <span className="text-sm">Get funny title suggestions</span>
                </div>
              </div>
              <div className="bg-muted/20 p-3 rounded-lg">
                <p className="text-sm"><strong>Upload Rules:</strong></p>
                <ul className="text-sm text-muted-foreground mt-1 space-y-1">
                  <li>• Must be logged in to upload</li>
                  <li>• Title is required</li>
                  <li>• Tags are optional but recommended</li>
                  <li>• File size limit: 50MB</li>
                  <li>• Content must be appropriate</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Battle Mode Rules */}
        <Card className="card-arena mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              ⚔️ Battle Mode Rules
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-primary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Swords className="text-primary" size={24} />
                </div>
                <h3 className="font-bold mb-2">1. Choose Your Champion</h3>
                <p className="text-sm text-muted-foreground">Two random memes appear side by side. Click on the one you think is funnier!</p>
              </div>
              
              <div className="text-center">
                <div className="bg-success/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Crown className="text-success" size={24} />
                </div>
                <h3 className="font-bold mb-2">2. Winner Takes All</h3>
                <p className="text-sm text-muted-foreground">Your chosen meme gets +1 upvote. The other meme gets nothing (no penalty).</p>
              </div>
              
              <div className="text-center">
                <div className="bg-secondary/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <RefreshCw className="text-secondary" size={24} />
                </div>
                <h3 className="font-bold mb-2">3. Next Battle</h3>
                <p className="text-sm text-muted-foreground">New memes appear automatically. Keep battling to discover more content!</p>
              </div>
            </div>
            
            <div className="bg-muted/20 p-4 rounded-lg">
              <h4 className="font-bold mb-2">Battle Rules:</h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground">
                <ul className="space-y-1">
                  <li>• Must be logged in to participate</li>
                  <li>• One vote per battle per user</li>
                  <li>• Cannot vote on same battle twice</li>
                  <li>• Battles avoid recent repeats</li>
                </ul>
                <ul className="space-y-1">
                  <li>• Winner gets regular upvote</li>
                  <li>• Battle votes count toward leaderboard</li>
                  <li>• Automatic new battle after voting</li>
                  <li>• Works with both images and videos</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Advanced Features */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Comments & Social */}
          <Card className="card-arena">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageCircle className="mr-2 text-primary" size={24} />
                Comments & Social
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <MessageCircle className="text-primary mt-1" size={16} />
                  <div>
                    <h4 className="font-semibold">Comments</h4>
                    <p className="text-sm text-muted-foreground">Add comments on meme detail pages. Vote on comments too!</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Share2 className="text-secondary mt-1" size={16} />
                  <div>
                    <h4 className="font-semibold">Share</h4>
                    <p className="text-sm text-muted-foreground">Share to WhatsApp, Twitter, or Instagram Stories directly.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Tag className="text-accent mt-1" size={16} />
                  <div>
                    <h4 className="font-semibold">Tags</h4>
                    <p className="text-sm text-muted-foreground">Categorize memes with tags like #coding, #funny, #college.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI & Personalization */}
          <Card className="card-arena">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="mr-2 text-yellow-400" size={24} />
                AI & Personalization
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <Sparkles className="text-yellow-400 mt-1" size={16} />
                  <div>
                    <h4 className="font-semibold">AI Caption Generator</h4>
                    <p className="text-sm text-muted-foreground">Get funny title suggestions when uploading memes.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Users className="text-primary mt-1" size={16} />
                  <div>
                    <h4 className="font-semibold">Personalized Keywords</h4>
                    <p className="text-sm text-muted-foreground">Your welcome message changes based on voting history.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Zap className="text-secondary mt-1" size={16} />
                  <div>
                    <h4 className="font-semibold">Real-time Updates</h4>
                    <p className="text-sm text-muted-foreground">Vote counts update instantly across all users.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User System */}
        <Card className="card-arena mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              👤 User System & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-bold mb-3 flex items-center">
                  <Shield className="mr-2 text-success" size={20} />
                  Access Levels
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">Public</Badge>
                    <span>View memes, leaderboard</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-primary">User</Badge>
                    <span>Upload, vote, comment</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-destructive">Admin</Badge>
                    <span>Delete memes (first user)</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="font-bold mb-3 flex items-center">
                  <Lock className="mr-2 text-primary" size={20} />
                  Authentication
                </h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• JWT token-based auth</li>
                  <li>• Secure password storage</li>
                  <li>• Email & username required</li>
                  <li>• Forgot password recovery</li>
                  <li>• Auto-login persistence</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold mb-3 flex items-center">
                  <Eye className="mr-2 text-secondary" size={20} />
                  Privacy
                </h3>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• Local data storage</li>
                  <li>• No external tracking</li>
                  <li>• User-controlled content</li>
                  <li>• Transparent voting</li>
                  <li>• Community moderation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Technical Features */}
        <Card className="card-arena mb-12">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              ⚡ Technical Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-primary/20 rounded-lg p-4 mb-3">
                  <RefreshCw className="text-primary mx-auto" size={32} />
                </div>
                <h4 className="font-bold">Real-time Sync</h4>
                <p className="text-sm text-muted-foreground">WebSocket-powered live updates</p>
              </div>
              
              <div className="text-center">
                <div className="bg-success/20 rounded-lg p-4 mb-3">
                  <Zap className="text-success mx-auto" size={32} />
                </div>
                <h4 className="font-bold">Fast Performance</h4>
                <p className="text-sm text-muted-foreground">Optimized React with Vite</p>
              </div>
              
              <div className="text-center">
                <div className="bg-secondary/20 rounded-lg p-4 mb-3">
                  <Heart className="text-secondary mx-auto" size={32} />
                </div>
                <h4 className="font-bold">Responsive Design</h4>
                <p className="text-sm text-muted-foreground">Works on all devices</p>
              </div>
              
              <div className="text-center">
                <div className="bg-accent/20 rounded-lg p-4 mb-3">
                  <Star className="text-accent mx-auto" size={32} />
                </div>
                <h4 className="font-bold">Modern UI</h4>
                <p className="text-sm text-muted-foreground">Cyber-themed with animations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Getting Started */}
        <Card className="card-arena">
          <CardHeader>
            <CardTitle className="text-2xl">🚀 Getting Started</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold mb-4">For New Users:</h3>
                <ol className="space-y-2 text-sm">
                  <li className="flex items-start space-x-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">1</span>
                    <span>Click "Join Cyber Arena" to create account</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">2</span>
                    <span>Browse memes in Arena and start voting</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">3</span>
                    <span>Try Battle mode for head-to-head voting</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">4</span>
                    <span>Upload your first meme with AI help</span>
                  </li>
                </ol>
              </div>
              
              <div>
                <h3 className="font-bold mb-4">Pro Tips:</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• First registered user becomes admin automatically</li>
                  <li>• Use tags to make memes discoverable</li>
                  <li>• Video memes get 3x more engagement</li>
                  <li>• Check MOTD daily for featured content</li>
                  <li>• Share memes to grow the community</li>
                  <li>• Comment and engage with other users</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;