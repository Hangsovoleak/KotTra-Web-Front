import { useEffect, useState } from 'react';
import * as taskService from '@/services/taskService';

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;
    taskService.getCategories().then((data) => {
      if (active) {
        setCategories(data);
        setIsLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  return { categories, isLoading };
}
