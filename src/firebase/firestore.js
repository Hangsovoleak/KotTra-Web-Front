import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '@/firebase/config';

const TASKS_COLLECTION = 'tasks';
const CATEGORIES_COLLECTION = 'categories';

function normalizeTask(task, id) {
  return {
    id,
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
  const tasksRef = collection(db, TASKS_COLLECTION);
  let q = query(tasksRef, orderBy('createdAt', 'desc'));

  if (userId) {
    q = query(tasksRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));
  }

  const snapshot = await getDocs(q);
  return snapshot.docs.map((item) => normalizeTask({ ...item.data() }, item.id));
}

export async function addTask(task, userId = null) {
  const payload = {
    ...normalizeTask(task, task?.id || ''),
    userId,
    createdAt: Date.now(),
  };
  const ref = await addDoc(collection(db, TASKS_COLLECTION), payload);
  return normalizeTask(payload, ref.id);
}

export async function updateTask(id, updates) {
  const taskRef = doc(db, TASKS_COLLECTION, id);
  await updateDoc(taskRef, updates);
  return { id, ...updates };
}

export async function deleteTask(id) {
  const taskRef = doc(db, TASKS_COLLECTION, id);
  await deleteDoc(taskRef);
}

export async function addCategory(category) {
  const ref = await addDoc(collection(db, CATEGORIES_COLLECTION), {
    ...category,
    createdAt: Date.now(),
  });
  return { id: ref.id, ...category };
}

export async function getCategories() {
  const snapshot = await getDocs(collection(db, CATEGORIES_COLLECTION));
  return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
}
