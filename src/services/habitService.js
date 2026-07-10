import { mockDelay } from '@/services/mockUtils';
import { CATEGORY_LIST } from '@/constants/categories';
// import api from '@/services/api'; // uncomment once FastAPI backend is live

export async function getGoalCategories() {
  // return (await api.get('/goals/categories')).data;
  return mockDelay(
    CATEGORY_LIST.map(({ key, title, description }) => ({ key, title, description }))
  );
}
