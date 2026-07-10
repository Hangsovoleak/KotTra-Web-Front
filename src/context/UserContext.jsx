import { createContext, useContext, useState, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import * as authService from '@/services/authService';

const UserContext = createContext(undefined);

export function UserProvider({ children }) {
  const { user, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState(null);

  const updateProfile = useCallback(async (updates) => {
    const updated = await authService.updateProfile(updates);
    setProfile(updated);
    return updated;
  }, []);

  const value = {
    profile: profile || user,
    isAuthenticated,
    updateProfile,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (ctx === undefined) throw new Error('useUser must be used within a UserProvider');
  return ctx;
}
