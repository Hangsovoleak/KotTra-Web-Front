import { useTasks } from '@/hooks/useTasks';

export function useTaskStats() {
  const { tasks, isLoading } = useTasks();

  const stats = {
    meeting: (tasks || []).filter((task) => (task.categories || []).includes('meeting')).length,
    learning: (tasks || []).filter((task) => (task.categories || []).includes('learning')).length,
    event: (tasks || []).filter((task) => (task.categories || []).includes('event')).length,
    general: (tasks || []).filter((task) => (task.categories || []).includes('general')).length,
  };

  return { stats, isLoading };
}

