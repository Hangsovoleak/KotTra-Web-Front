import { mockDelay } from '@/services/mockUtils';
// import api from '@/services/api'; // uncomment once FastAPI backend is live

// Scaffolded for future budget/finance tracking features. No finance UI
// exists in the current source screenshots, so this only exposes the
// shape future pages will need.
export async function getFinanceSummary() {
  // return (await api.get('/finance/summary')).data;
  return mockDelay({ income: 0, expenses: 0, balance: 0 });
}
