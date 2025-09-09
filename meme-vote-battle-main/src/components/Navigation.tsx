import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Trophy, Upload, Home, User } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Arena", icon: Home },
    { path: "/upload", label: "Upload", icon: Upload },
    { path: "/leaderboard", label: "Leaderboard", icon: Trophy },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-gradient-primary glow-text">
              ⚡ Cyber Arena
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
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
          </div>

          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <User size={16} className="mr-2" />
              Login
            </Button>
            <Button className="btn-arena" size="sm">
              Join Cyber Arena
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;