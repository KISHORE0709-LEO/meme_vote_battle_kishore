import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const { login, register, loading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!isLogin && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (!isLogin && !username.trim()) {
      setError('Username is required');
      return;
    }
    
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, username.trim());
      }
      navigate('/arena');
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) {
      setError('Please enter your email address');
      return;
    }
    
    // Simulate password reset
    const users = JSON.parse(localStorage.getItem('meme_arena_users') || '[]');
    const user = users.find((u: any) => u.email === resetEmail);
    
    if (!user) {
      setError('No account found with this email address');
      return;
    }
    
    // In a real app, this would send an email
    // For demo, we'll show the password
    const password = localStorage.getItem(`password_${user.id}`);
    setError(`Your password is: ${password}`);
    
    setTimeout(() => {
      setShowForgotPassword(false);
      setResetEmail('');
      setError('');
    }, 5000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
      {/* Animated Background */}
      <div className="absolute inset-0" style={{background: 'var(--gradient-background)'}}>
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(51,204,255,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(51,204,255,0.3)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
        
        {/* Floating Orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}} />
        
        {/* Moving Lines */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary to-transparent animate-pulse" style={{animationDelay: '1s'}} />
          <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-accent to-transparent animate-pulse" style={{animationDelay: '3s'}} />
          <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-primary to-transparent animate-pulse" style={{animationDelay: '2s'}} />
        </div>
      </div>
      <Card className="card-arena w-full max-w-md relative z-10">
        {/* Card Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-accent rounded-lg blur opacity-30" />
        <CardHeader className="text-center relative z-20">
          <CardTitle className="text-2xl font-bold text-gradient-primary">
            {showForgotPassword ? 'Reset Password' : (isLogin ? 'Sign In' : 'Sign Up')}
          </CardTitle>
          <p className="text-foreground/80">
            {showForgotPassword 
              ? 'Enter your email to reset your password'
              : (isLogin ? 'Welcome back to Meme Arena' : 'Join the Meme Arena community')
            }
          </p>
        </CardHeader>
        <CardContent className="relative z-20">
          {showForgotPassword ? (
            <form onSubmit={handleForgotPassword} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Email</label>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  required
                  className="bg-input border-primary/30 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                />
              </div>
              
              {error && (
                <div className={`px-4 py-3 rounded-md text-sm backdrop-blur-sm ${
                  error.includes('Your password is:') 
                    ? 'bg-success/20 border border-success/50 text-success'
                    : 'bg-destructive/20 border border-destructive/50 text-destructive'
                }`}>
                  {error}
                </div>
              )}
              
              <Button type="submit" className="btn-arena w-full" size="lg">
                Reset Password
              </Button>
              
              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-primary hover:text-primary/80 hover:underline"
                  onClick={() => {
                    setShowForgotPassword(false);
                    setResetEmail('');
                    setError('');
                  }}
                >
                  Back to Sign In
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Username</label>
                <Input
                  placeholder="Choose a username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength={3}
                  className="bg-input border-primary/30 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Email</label>
              <Input
                type="email"
                placeholder="your.email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-input border-primary/30 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground/80">Password</label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={isLogin ? 'Enter your password' : 'Create a strong password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="pr-10 bg-input border-primary/30 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-primary hover:text-primary/80" />
                  ) : (
                    <Eye className="h-4 w-4 text-primary hover:text-primary/80" />
                  )}
                </button>
              </div>
            </div>
            
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground/80">Confirm Password</label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="pr-10 bg-input border-primary/30 text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-primary/20"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-primary hover:text-primary/80" />
                    ) : (
                      <Eye className="h-4 w-4 text-primary hover:text-primary/80" />
                    )}
                  </button>
                </div>
              </div>
            )}
            
            {error && (
              <div className="bg-destructive/20 border border-destructive/50 text-destructive px-4 py-3 rounded-md text-sm backdrop-blur-sm">
                {error}
              </div>
            )}
            
            <Button type="submit" className="btn-arena w-full" size="lg">
              {isLogin ? 'Sign In' : 'Create Account'}
            </Button>
            
            {isLogin && (
              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-primary hover:text-primary/80 hover:underline"
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot your password?
                </button>
              </div>
            )}
            
            <div className="text-center text-xs text-muted-foreground">
              By continuing, you agree to our{' '}
              <a href="#" className="text-primary hover:text-primary/80 hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary hover:text-primary/80 hover:underline">
                Privacy Policy
              </a>
            </div>
            
            <div className="text-center pt-4 border-t border-primary/20">
              <button
                type="button"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError('');
                  setPassword('');
                  setConfirmPassword('');
                }}
              >
                {isLogin 
                  ? "Don't have an account? Sign up" 
                  : 'Already have an account? Sign in'
                }
              </button>
            </div>
          </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;