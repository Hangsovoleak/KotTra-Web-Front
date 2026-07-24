import { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext(undefined);

let idCounter = 0;

const typeStyles = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  error: 'border-red-200 bg-red-50 text-red-700',
  info: 'border-sky-200 bg-sky-50 text-sky-700',
};

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

      {notifications.length > 0 ? (
        <div className="fixed right-4 top-4 z-[1000] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`rounded-2xl border px-4 py-3 text-sm font-semibold shadow-lg ${typeStyles[notification.type] || typeStyles.info}`}
            >
              <div className="flex items-start justify-between gap-3">
                <span>{notification.message}</span>
                <button
                  type="button"
                  onClick={() => dismiss(notification.id)}
                  className="ml-2 text-inherit opacity-75 transition-opacity hover:opacity-100"
                  aria-label="Dismiss notification"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (ctx === undefined) throw new Error('useNotifications must be used within a NotificationProvider');
  return ctx;
}
