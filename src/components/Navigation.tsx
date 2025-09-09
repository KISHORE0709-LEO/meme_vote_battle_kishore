import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, Upload, Home, User, LogOut, Info, Menu, X, Swords, Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getAllMemes } from "@/services/memeService";

const Navigation = () => {
  const location = useLocation();
  const { user, logout, isAuthenticated, loading } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [memeOfTheDay, setMemeOfTheDay] = useState<any>(null);

  const handleLogout = () => {
    setIsLoggingOut(true);
    logout();
    setIsLoggingOut(false);
  };

  const navItems = [
    { path: "/arena", label: "Arena", icon: Home },
    { path: "/battle", label: "Battle", icon: Swords },
    { path: "/about", label: "About", icon: Info },
    { path: "/leaderboard", label: "Leaderboard", icon: Trophy },
  ];

  const getMemeOfTheDay = () => {
    const today = new Date().toDateString();
    const stored = localStorage.getItem('meme_of_the_day');
    
    if (stored) {
      const { date, memeId } = JSON.parse(stored);
      if (date === today) {
        const memes = getAllMemes();
        return memes.find(m => m.id === memeId) || null;
      }
    }
    
    const memes = getAllMemes();
    const sortedMemes = [...memes].sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes));
    const topMeme = sortedMemes[0];
    
    if (topMeme) {
      localStorage.setItem('meme_of_the_day', JSON.stringify({ date: today, memeId: topMeme.id }));
    }
    
    return topMeme || null;
  };

  React.useEffect(() => {
    setMemeOfTheDay(getMemeOfTheDay());
  }, []);



  return (
    <nav className="fixed top-0 w-full z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 w-full">
          {/* Logo at complete left */}
          <Link to="/arena" className="flex items-center">
            <div className="text-2xl font-bold text-gradient-primary glow-text">
              ⚡ Meme Arena
            </div>
          </Link>

          {/* Navigation items at complete right */}
          <div className="flex items-center space-x-4 ml-auto">
            {/* Desktop navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                      isActive 
                        ? "bg-primary/20 text-primary" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    <Icon size={18} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                );
              })}
              
              {memeOfTheDay && (
                <Link
                  to={`/meme/${memeOfTheDay.id}`}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30 transition-all duration-200 border border-yellow-400/30"
                  title={`Meme of the Day: ${memeOfTheDay.title}`}
                >
                  <Star size={16} className="animate-pulse" />
                  <span className="font-medium text-sm">MOTD</span>
                </Link>
              )}
              
              {/* User info */}
              {loading ? (
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
              ) : isAuthenticated ? (
                <>
                  <span className="text-sm text-muted-foreground">
                    Welcome, {user?.username || user?.email?.split('@')[0]}
                  </span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleLogout}
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="outline" size="sm">
                      <User size={16} className="mr-2" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button className="btn-arena" size="sm">
                      Join Cyber Arena
                    </Button>
                  </Link>
                </>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-lg border-b border-border">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                    isActive 
                      ? "bg-primary/20 text-primary" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
            
            {memeOfTheDay && (
              <Link
                to={`/meme/${memeOfTheDay.id}`}
                className="flex items-center space-x-3 px-3 py-3 rounded-lg bg-yellow-400/20 text-yellow-400 hover:bg-yellow-400/30 transition-all duration-200 border border-yellow-400/30"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Star size={20} className="animate-pulse" />
                <span className="font-medium">Meme of the Day</span>
              </Link>
            )}
            
            <div className="border-t border-border pt-4 mt-4">
              {loading ? (
                <div className="flex items-center justify-center py-3">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </div>
              ) : isAuthenticated ? (
                <>
                  <div className="px-3 py-2 text-sm text-muted-foreground">
                    Welcome, {user?.username || user?.email?.split('@')[0]}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                  >
                    <LogOut size={16} className="mr-2" />
                    Logout
                  </Button>
                </>
              ) : (
                <div className="space-y-2">
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full">
                      <User size={16} className="mr-2" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="btn-arena w-full" size="sm">
                      Join Cyber Arena
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;