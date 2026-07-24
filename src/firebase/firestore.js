import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
  query,
  where,
} from 'firebase/firestore';
import { db } from '@/firebase/config';

const TASKS_COLLECTION = 'tasks';
const CATEGORIES_COLLECTION = 'categories';

let isFirestoreAvailable = true;

const withTimeout = (promise, ms = 2000) => {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Firebase connection timeout')), ms)
    ),
  ]);
};

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
    createdAt: task?.createdAt || null,
  };
}

function getLocalTasks(userId) {
  try {
    const raw = localStorage.getItem('kottra_tasks');
    const list = raw ? JSON.parse(raw) : [];
    return list.filter((task) => !userId || task.userId === userId);
  } catch (error) {
    console.error('Failed to read from localStorage:', error);
    return [];
  }
}

function saveLocalTasks(tasks) {
  try {
    localStorage.setItem('kottra_tasks', JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to write to localStorage:', error);
  }
}

function triggerFallbackEvent(errorMessage) {
  if (isFirestoreAvailable) {
    isFirestoreAvailable = false;
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('firestore-fallback', { detail: errorMessage }));
    }
  }
}

export async function getTasks(userId = null) {
  if (!isFirestoreAvailable) {
    const local = getLocalTasks(userId);
    return local.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  }

  try {
    const tasksRef = collection(db, TASKS_COLLECTION);
    const q = userId ? query(tasksRef, where('userId', '==', userId)) : tasksRef;
    const snapshot = await withTimeout(getDocs(q), 2000);

    const tasks = snapshot.docs.map((item) =>
      normalizeTask({ ...item.data() }, item.id)
    );

    return tasks.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  } catch (error) {
    console.error('Firestore getTasks error, falling back to localStorage:', error);
    triggerFallbackEvent(error.message);
    const local = getLocalTasks(userId);
    return local.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
  }
}


export async function addTask(task, userId = null) {
  if (!isFirestoreAvailable) {
    const localId = `local_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const payload = {
      ...normalizeTask(task, localId),
      userId,
      createdAt: Date.now(),
    };
    const all = getLocalTasks(null);
    all.push(payload);
    saveLocalTasks(all);
    return payload;
  }

  try {
    const payload = {
      ...normalizeTask(task, task?.id || ''),
      userId,
      createdAt: Date.now(),
    };
    const ref = await withTimeout(addDoc(collection(db, TASKS_COLLECTION), payload), 2000);
    return normalizeTask(payload, ref.id);
  } catch (error) {
    console.error('Firestore addTask error, falling back to localStorage:', error);
    triggerFallbackEvent(error.message);
    return addTask(task, userId);
  }
}

export async function updateTask(id, updates) {
  if (!isFirestoreAvailable || String(id).startsWith('local_')) {
    const all = getLocalTasks(null);
    const updated = all.map((t) => (t.id === id ? { ...t, ...updates } : t));
    saveLocalTasks(updated);
    const matched = updated.find((t) => t.id === id);
    return matched || { id, ...updates };
  }

  try {
    const taskRef = doc(db, TASKS_COLLECTION, id);
    await withTimeout(updateDoc(taskRef, updates), 2000);
    return { id, ...updates };
  } catch (error) {
    console.error('Firestore updateTask error, falling back to localStorage:', error);
    triggerFallbackEvent(error.message);
    return updateTask(id, updates);
  }
}

export async function deleteTask(id) {
  if (!isFirestoreAvailable || String(id).startsWith('local_')) {
    const all = getLocalTasks(null);
    const filtered = all.filter((t) => t.id !== id);
    saveLocalTasks(filtered);
    return;
  }

  try {
    const taskRef = doc(db, TASKS_COLLECTION, id);
    await withTimeout(deleteDoc(taskRef), 2000);
  } catch (error) {
    console.error('Firestore deleteTask error, falling back to localStorage:', error);
    triggerFallbackEvent(error.message);
    await deleteTask(id);
  }
}


export async function addCategory(category) {
  try {
    const ref = await addDoc(collection(db, CATEGORIES_COLLECTION), {
      ...category,
      createdAt: Date.now(),
    });
    return { id: ref.id, ...category };
  } catch (error) {
    console.error('Firestore addCategory error:', error);
    return { id: `local_cat_${Date.now()}`, ...category };
  }
}

export async function getCategories() {
  try {
    const snapshot = await getDocs(collection(db, CATEGORIES_COLLECTION));
    return snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
  } catch (error) {
    console.error('Firestore getCategories error:', error);
    return [];
  }
}

