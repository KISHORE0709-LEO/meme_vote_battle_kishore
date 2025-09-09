import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-8xl font-black text-gradient-primary mb-4">404</h1>
          <h2 className="text-2xl font-bold text-foreground mb-2">Arena Not Found</h2>
          <p className="text-muted-foreground">
            Looks like this meme got lost in the digital void. Let's get you back to the action!
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="btn-arena">
            <Link to="/">
              <Home className="mr-2" size={18} />
              Back to Arena
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/leaderboard">
              View Leaderboard
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
