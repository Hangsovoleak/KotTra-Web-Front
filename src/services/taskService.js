import {
  addCategory as addCategoryDoc,
  addTask as addTaskDoc,
  deleteTask as deleteTaskDoc,
  getCategories as getCategoriesDoc,
  getTasks as getTasksDoc,
  updateTask as updateTaskDoc,
} from '@/firebase/firestore';
import { getCurrentUser } from '@/services/authService';

function normalizeTask(task, fallbackId) {
  return {
    id: task?.id || fallbackId,
    title: task?.title || 'Untitled task',
    description: task?.description || '',
    categories: Array.isArray(task?.categories) ? task.categories : [],
    from: task?.from || '09:00',
    to: task?.to || '10:00',
    period: task?.period || 'AM',
    date: task?.date || new Date().toISOString().slice(0, 10),
    completed: Boolean(task?.completed),
    userId: task?.userId || null,
  };
}

export async function getTasks(userId = null) {
  const currentUser = await getCurrentUser();
  const effectiveUserId = userId || currentUser?.uid || null;
  const tasks = await getTasksDoc(effectiveUserId);
  return tasks.map((task) => normalizeTask(task, task.id));
}

export async function getTask(id) {
  const tasks = await getTasks();
  return tasks.find((task) => task.id === id);
}

export async function createTask(task, userId = null) {
  const currentUser = await getCurrentUser();
  const created = await addTaskDoc(task, userId || currentUser?.uid || null);
  return normalizeTask(created, created.id);
}

export async function updateTask(id, updates) {
  const updated = await updateTaskDoc(id, updates);
  return normalizeTask({ id, ...updates, ...updated }, id);
}

export async function deleteTask(id) {
  await deleteTaskDoc(id);
}

export async function getTaskStats(userId = null) {
  const tasks = await getTasks(userId);
  return {
    meeting: tasks.filter((task) => task.categories.includes('meeting')).length,
    learning: tasks.filter((task) => task.categories.includes('learning')).length,
    event: tasks.filter((task) => task.categories.includes('event')).length,
    general: tasks.filter((task) => task.categories.includes('general')).length,
  };
}

export async function addCategory(category) {
  return addCategoryDoc(category);
}

export async function getCategories() {
  return getCategoriesDoc();
}
