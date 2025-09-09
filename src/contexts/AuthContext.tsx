import React, { createContext, useContext, useState, useEffect } from 'react';

// Simple JWT implementation for browser
const createToken = (payload: any): string => {
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = btoa(JSON.stringify({ ...payload, exp: Date.now() + 7 * 24 * 60 * 60 * 1000 }));
  return `${header}.${body}.signature`;
};

const verifyToken = (token: string): any => {
  try {
    const [, payload] = token.split('.');
    const decoded = JSON.parse(atob(payload));
    if (decoded.exp < Date.now()) throw new Error('Token expired');
    return decoded;
  } catch {
    return null;
  }
};

interface User {
  id: string;
  email: string;
  username: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, username: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

const USERS_KEY = 'meme_arena_users';
const TOKEN_KEY = 'meme_arena_token';
const JWT_SECRET = 'meme_arena_secret_key';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    if (storedToken) {
      const decoded = verifyToken(storedToken);
      if (decoded) {
        const users = getUsers();
        const foundUser = users.find(u => u.id === decoded.userId);
        if (foundUser) {
          setUser(foundUser);
          setToken(storedToken);
        } else {
          localStorage.removeItem(TOKEN_KEY);
        }
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }
    }
    setLoading(false);
  }, []);

  const getUsers = (): User[] => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  };

  const saveUsers = (users: User[]) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };



  const login = async (email: string, password: string) => {
    const users = getUsers();
    const foundUser = users.find(u => u.email === email);
    
    if (!foundUser) {
      throw new Error('User not found');
    }
    
    const storedPassword = localStorage.getItem(`password_${foundUser.id}`);
    if (storedPassword !== password) {
      throw new Error('Invalid password');
    }
    
    const newToken = createToken({ userId: foundUser.id });
    
    setUser(foundUser);
    setToken(newToken);
    localStorage.setItem(TOKEN_KEY, newToken);
  };

  const register = async (email: string, password: string, username: string) => {
    const users = getUsers();
    
    if (users.find(u => u.email === email)) {
      throw new Error('Email already exists');
    }
    
    if (users.find(u => u.username === username)) {
      throw new Error('Username already exists');
    }
    
    const newUser: User = {
      id: Date.now().toString(),
      email,
      username,
      role: users.length === 0 ? 'admin' : 'user'
    };
    
    users.push(newUser);
    saveUsers(users);
    localStorage.setItem(`password_${newUser.id}`, password);
    
    const newToken = createToken({ userId: newUser.id });
    
    setUser(newUser);
    setToken(newToken);
    localStorage.setItem(TOKEN_KEY, newToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem(TOKEN_KEY);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      register,
      logout,
      isAuthenticated: !!user && !!token,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
};