import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '@/firebase/config';

function mapUser(user) {
  if (!user) return null;
  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName || user.email?.split('@')[0] || 'Guest',
    avatarUrl: user.photoURL || null,
  };
}

export async function login({ email, password }) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return mapUser(credential.user);
}

export async function register({ email, password, displayName }) {
  const credential = await createUserWithEmailAndPassword(auth, email, password);
  if (displayName) {
    await updateProfile(credential.user, { displayName });
  }
  return mapUser(credential.user);
}

export async function logout() {
  await signOut(auth);
}

export async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
}

export function getCurrentUser() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(mapUser(user));
    });
  });
}
