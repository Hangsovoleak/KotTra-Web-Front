import { useState, useEffect, useCallback } from 'react';
import * as taskService from '@/services/taskService';

/** Loads and mutates the task list, keeping local state in sync with the service layer. */
export function useTasks() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await taskService.getTasks();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const addTask = useCallback(async (task) => {
    const created = await taskService.createTask(task);
    setTasks((prev) => [created, ...prev]);
    return created;
  }, []);

  const removeTask = useCallback(async (id) => {
    await taskService.deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return { tasks, isLoading, error, refresh, addTask, removeTask };
}
