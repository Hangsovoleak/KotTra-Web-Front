import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import * as taskService from '@/services/taskService';

export const TaskContext = createContext(undefined);

export function TaskProvider({ children }) {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
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
  }, [user?.uid]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addTask = useCallback(async (task) => {
    const created = await taskService.createTask(task, user?.uid);
    setTasks((prev) => [created, ...prev]);
    return created;
  }, [user?.uid]);

  const updateTask = useCallback(async (id, updates) => {
    const updated = await taskService.updateTask(id, updates);
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updated } : task)));
    return updated;
  }, []);

  const removeTask = useCallback(async (id) => {
    await taskService.deleteTask(id);
    setTasks((prev) => prev.filter((task) => task.id !== id));
  }, []);

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
