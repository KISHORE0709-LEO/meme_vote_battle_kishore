import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { requireAuth, requireAdmin } from '@/middleware/authMiddleware';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin: needsAdmin = false }) => {
  const { isAuthenticated, user, token, loading } = useAuth();

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

  if (!requireAuth(token)) {
    return <Navigate to="/login" replace />;
  }

  if (needsAdmin && !requireAdmin(token, user?.role)) {
    return <Navigate to="/arena" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;