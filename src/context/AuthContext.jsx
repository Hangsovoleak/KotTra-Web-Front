import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import * as authService from '@/services/authService';

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // On mount, try to restore session (e.g. from a stored token).
    // Swapped for a real /me call once the FastAPI backend exists.
    authService
      .getCurrentUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  const login = useCallback(async (credentials) => {
    setError(null);
    try {
      const loggedInUser = await authService.login(credentials);
      setUser(loggedInUser);
      return loggedInUser;
    } catch (err) {
      setError(err.message || 'Failed to log in');
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
  }, []);

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    error,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === undefined) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
