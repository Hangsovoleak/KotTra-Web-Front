import axios from 'axios';

// Base URL will point at the FastAPI backend once it exists.
// e.g. VITE_API_BASE_URL=https://api.kottra.app/v1
const baseURL = import.meta.env.VITE_API_BASE_URL || '/api';

export const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('kottra-token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
