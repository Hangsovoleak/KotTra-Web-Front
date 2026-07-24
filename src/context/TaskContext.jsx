import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNotifications } from '@/context/NotificationContext';
import * as authService from '@/services/authService';
import * as taskService from '@/services/taskService';

export const TaskContext = createContext(undefined);

export function TaskProvider({ children }) {
  const { user, isLoading: authLoading } = useAuth();
  const { notify } = useNotifications();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    function handleFallback() {
      notify(
        'Firestore database not found or initialized. Falling back to local storage.',
        'info',
        6000
      );
    }
    window.addEventListener('firestore-fallback', handleFallback);
    return () => {
      window.removeEventListener('firestore-fallback', handleFallback);
    };
  }, [notify]);

  const refresh = useCallback(async () => {
    if (authLoading) return;

    setIsLoading(true);
    try {
      const data = await taskService.getTasks(user?.uid);
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [authLoading, user?.uid]);

  useEffect(() => {
    if (!authLoading) {
      refresh();
    }
  }, [authLoading, refresh]);

  const addTask = useCallback(async (task) => {
    if (authLoading) {
      throw new Error('Please wait for your account to finish loading before adding tasks.');
    }

    const currentUser = await authService.getCurrentUser();
    const effectiveUserId = user?.uid || currentUser?.uid || null;

    if (!effectiveUserId) {
      throw new Error('Please sign in before saving tasks.');
    }

    const created = await taskService.createTask(task, effectiveUserId);
    setTasks((prev) => [created, ...prev]);
    await refresh();
    return created;
  }, [authLoading, refresh, user?.uid]);

  const updateTask = useCallback(async (id, updates) => {
    const updated = await taskService.updateTask(id, updates);
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updated } : task)));
    await refresh();
    return updated;
  }, [refresh]);

  const removeTask = useCallback(async (id) => {
    await taskService.deleteTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
    await refresh();
  }, [refresh]);

  const value = {
    tasks,
    isLoading,
    error,
    refresh,
    addTask,
    updateTask,
    removeTask,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}

export function useTaskContext() {
  const ctx = useContext(TaskContext);
  if (ctx === undefined) throw new Error('useTaskContext must be used within a TaskProvider');
  return ctx;
}
