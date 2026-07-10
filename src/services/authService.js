import { mockDelay } from '@/services/mockUtils';
// import api from '@/services/api'; // uncomment once FastAPI backend is live

const MOCK_USER = {
  id: 'usr_001',
  name: 'Kmeng Tomnerng',
  email: 'kmengtomnerng@gmail.com',
  avatarUrl: null,
};

export async function login({ email, password }) {
  // return (await api.post('/auth/login', { email, password })).data;
  if (!email || !password) throw new Error('Email and password are required');
  return mockDelay(MOCK_USER);
}

export async function logout() {
  // return (await api.post('/auth/logout')).data;
  return mockDelay(true);
}

export async function getCurrentUser() {
  // return (await api.get('/auth/me')).data;
  return mockDelay(MOCK_USER, 150);
}

export async function updateProfile(updates) {
  // return (await api.patch('/auth/me', updates)).data;
  return mockDelay({ ...MOCK_USER, ...updates });
}
