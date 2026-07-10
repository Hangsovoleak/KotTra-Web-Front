import { mockDelay } from '@/services/mockUtils';
import { getTaskStats } from '@/services/taskService';
// import api from '@/services/api'; // uncomment once FastAPI backend is live

export async function getDashboardReport() {
  // return (await api.get('/reports/dashboard')).data;
  const stats = await getTaskStats();
  return mockDelay(stats);
}
