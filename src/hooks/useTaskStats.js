import { useState, useEffect } from 'react';
import * as taskService from '@/services/taskService';

export function useTaskStats() {
  const [stats, setStats] = useState({ meeting: 0, learning: 0, event: 0, general: 0 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    taskService.getTaskStats().then((data) => {
      if (active) {
        setStats(data);
        setIsLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return { stats, isLoading };
}
