import { mockDelay } from '@/services/mockUtils';
import { getTasks } from '@/services/taskService';
// import api from '@/services/api'; // uncomment once FastAPI backend is live

export async function getEventsForMonth(year, month) {
  // return (await api.get(`/calendar?year=${year}&month=${month}`)).data;
  const tasks = await getTasks();
  return tasks.filter((t) => {
    const d = new Date(t.date);
    return d.getFullYear() === year && d.getMonth() === month;
  });
}

export async function getEventsForDate(dateStr) {
  // return (await api.get(`/calendar/day?date=${dateStr}`)).data;
  const tasks = await getTasks();
  return mockDelay(tasks.filter((t) => t.date === dateStr));
}
