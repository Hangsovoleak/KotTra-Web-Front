import { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext(undefined);

let idCounter = 0;

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const notify = useCallback((message, type = 'info', duration = 3000) => {
    const id = ++idCounter;
    setNotifications((prev) => [...prev, { id, message, type }]);
    if (duration > 0) {
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, duration);
    }
    return id;
  }, []);

  const dismiss = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, notify, dismiss }}>
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (ctx === undefined) throw new Error('useNotifications must be used within a NotificationProvider');
  return ctx;
}
