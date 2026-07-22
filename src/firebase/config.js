import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDElf21FC18KTI2Bn-FgBkD-WE2a9c_91Y',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'kottra-ecd82.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'kottra-ecd82',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'kottra-ecd82.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '852967609607',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:852967609607:web:1658a9445aa4973f1161a2',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-QK3ZZBR4FX',
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
