import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: any) => Promise<any>;
  signup: (data: any) => Promise<any>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await authService.getCurrentUser();
        if (res.success) {
          setUser(res.data);
          // Auto-redirect admin to base terminal if on standard dashboard
          if (res.data.role === 'admin' && (window.location.pathname === '/dashboard' || window.location.pathname === '/')) {
            navigate('/admin/dashboard', { replace: true });
          }
        }
      } catch (error) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();

    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'leadzen-auth-trigger') {
        window.location.href = '/login';
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [navigate]);

  const login = async (credentials: any) => {
    const res = await authService.login(credentials);
    if (res.success) {
      setUser(res.data);
      if (res.data.role === 'admin') navigate('/admin/dashboard');
      else navigate('/dashboard');
    }
    return res;
  };

  const signup = async (data: any) => {
    const res = await authService.signup(data);
    if (res.success) {
      setUser(res.data);
      if (res.data.role === 'admin') navigate('/admin/dashboard');
      else navigate('/dashboard');
    }
    return res;
  };

  const logout = async () => {
    await authService.logout();
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
