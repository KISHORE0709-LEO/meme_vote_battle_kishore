import React, { Suspense } from 'react';
import { Zap, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Lazy load Spline to prevent blocking
const Spline = React.lazy(() => import('@splinetool/react-spline'));

const Intro = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen overflow-hidden" style={{background: 'var(--gradient-background)'}}>
      {/* Header with Logo */}
      <header className="absolute top-0 left-0 z-10 p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <span className="text-3xl font-bold text-gradient-primary">
            Meme Arena
          </span>
        </div>
      </header>

      {/* Main Content */}
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
        {/* Left Side - 3D Robot */}
        <div className="relative flex items-center justify-center">
          <div className="w-full h-full min-h-[500px] lg:min-h-screen">
            <Suspense fallback={
              <div className="flex items-center justify-center h-full">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                  <p className="text-foreground/60">Loading 3D Experience...</p>
                </div>
              </div>
            }>
              <Spline
                scene="https://prod.spline.design/rU2-Ks0SC0T5od9B/scene.splinecode"
                style={{ width: '100%', height: '100%' }}
              />
            </Suspense>
          </div>
        </div>

        {/* Right Side - Content */}
        <div className="flex items-center justify-center p-8 lg:p-12">
          <div className="max-w-md text-center lg:text-left">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Welcome to the
              <span className="block text-gradient-primary">
                Ultimate Meme Arena
              </span>
            </h1>
            
            <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
              Join thousands of meme warriors battling in the most epic digital arena. Vote, upload, and climb the leaderboard!
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3 text-primary">
                <div className="w-2 h-2 bg-primary rounded-full"></div>
                <span className="text-sm font-medium">Epic Meme Battles</span>
              </div>
              <div className="flex items-center gap-3 text-secondary">
                <div className="w-2 h-2 bg-secondary rounded-full"></div>
                <span className="text-sm font-medium">Cyber Leaderboards</span>
              </div>
              <div className="flex items-center gap-3 text-accent">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-sm font-medium">Digital Glory</span>
              </div>
            </div>

            <button
              onClick={handleGetStarted}
              className="btn-arena group flex items-center gap-3 mx-auto lg:mx-0"
            >
              Enter the Arena
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>

            <div className="mt-8 pt-6 border-t border-primary/20">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-gradient-primary">2.4K</div>
                  <div className="text-xs text-muted-foreground">Cyber Warriors</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gradient-secondary">12.8K</div>
                  <div className="text-xs text-muted-foreground">Neural Battles</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-gradient-accent">847</div>
                  <div className="text-xs text-muted-foreground">Digital Champions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Intro;