import { mockDelay } from '@/services/mockUtils';
// import api from '@/services/api'; // uncomment once FastAPI backend is live

let mockTasks = [
  {
    id: 'tsk_001',
    title: 'Hackathon',
    description: 'Team hackathon kickoff and planning session.',
    categories: ['meeting', 'learning', 'general', 'event'],
    from: '7:00',
    to: '8:30',
    period: 'PM',
    date: '2026-02-11',
  },
  {
    id: 'tsk_002',
    title: 'Hackathon',
    description: 'Team hackathon kickoff and planning session.',
    categories: ['meeting', 'learning', 'general', 'event'],
    from: '7:00',
    to: '8:30',
    period: 'PM',
    date: '2026-02-11',
  },
  {
    id: 'tsk_003',
    title: 'Hackathon',
    description: 'Team hackathon kickoff and planning session.',
    categories: ['meeting', 'learning', 'general', 'event'],
    from: '7:00',
    to: '8:30',
    period: 'PM',
    date: '2026-02-11',
  },
  {
    id: 'tsk_004',
    title: 'Hackathon',
    description: 'Team hackathon kickoff and planning session.',
    categories: ['meeting', 'learning', 'general', 'event'],
    from: '7:00',
    to: '8:30',
    period: 'PM',
    date: '2026-02-11',
  },
];

export async function getTasks() {
  // return (await api.get('/tasks')).data;
  return mockDelay(mockTasks);
}

export async function getTask(id) {
  // return (await api.get(`/tasks/${id}`)).data;
  return mockDelay(mockTasks.find((t) => t.id === id));
}

export async function createTask(task) {
  // return (await api.post('/tasks', task)).data;
  const newTask = { ...task, id: `tsk_${Date.now()}` };
  mockTasks = [newTask, ...mockTasks];
  return mockDelay(newTask);
}

export async function updateTask(id, updates) {
  // return (await api.patch(`/tasks/${id}`, updates)).data;
  mockTasks = mockTasks.map((t) => (t.id === id ? { ...t, ...updates } : t));
  return mockDelay(mockTasks.find((t) => t.id === id));
}

export async function deleteTask(id) {
  // return (await api.delete(`/tasks/${id}`)).data;
  mockTasks = mockTasks.filter((t) => t.id !== id);
  return mockDelay(true);
}

export async function getTaskStats() {
  // return (await api.get('/tasks/stats')).data;
  return mockDelay({ meeting: 12, learning: 40, event: 7, general: 12 });
}
