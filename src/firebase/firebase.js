import app, { auth, db, storage } from '@/firebase/config';
import { getAnalytics } from 'firebase/analytics';

let analytics = null;

if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.warn('Firebase Analytics could not be initialized:', error);
  }
}

export { app, analytics, auth, db, storage };
export default app;