import { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ThemeContext = createContext(undefined);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('kottra-theme') || 'light');

  useEffect(() => {
    localStorage.setItem('kottra-theme', theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (ctx === undefined) throw new Error('useTheme must be used within a ThemeProvider');
  return ctx;
}
