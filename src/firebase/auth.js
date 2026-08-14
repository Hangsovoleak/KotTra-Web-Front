import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  confirmPasswordReset,
  verifyPasswordResetCode,
} from 'firebase/auth';
import { auth } from '@/firebase/config';

export function getAuthErrorMessage(error) {
  if (!error) return 'An unexpected error occurred.';
  const code = error.code || '';
  switch (code) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Invalid email address or password.';
    case 'auth/email-already-in-use':
      return 'An account with this email address already exists.';
    case 'auth/weak-password':
      return 'Password should be at least 6 characters long.';
    case 'auth/invalid-email':
      return 'Please enter a valid email address.';
    case 'auth/too-many-requests':
      return 'Too many unsuccessful attempts. Please try again later.';
    case 'auth/network-request-failed':
      return 'Network error. Please check your internet connection.';
    case 'auth/expired-action-code':
      return 'The password reset link has expired. Please request a new one.';
    case 'auth/invalid-action-code':
      return 'The password reset link is invalid or has already been used.';
    case 'auth/popup-closed-by-user':
      return 'Sign-in popup was closed before completing the sign-in.';
    default:
      return error.message || 'Authentication failed. Please try again.';
  }
}

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
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    return mapUser(credential.user);
  } catch (error) {
    throw new Error(getAuthErrorMessage(error));
  }
}

export async function register({ email, password, displayName }) {
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
      await updateProfile(credential.user, { displayName });
    }
    return mapUser(credential.user);
  } catch (error) {
    throw new Error(getAuthErrorMessage(error));
  }
}

export async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const credential = await signInWithPopup(auth, provider);
    return mapUser(credential.user);
  } catch (error) {
    throw new Error(getAuthErrorMessage(error));
  }
}

export async function logout() {
  await signOut(auth);
}

export async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw new Error(getAuthErrorMessage(error));
  }
}

export async function confirmPasswordResetCode(oobCode, newPassword) {
  try {
    await confirmPasswordReset(auth, oobCode, newPassword);
  } catch (error) {
    throw new Error(getAuthErrorMessage(error));
  }
}

export async function verifyResetCode(oobCode) {
  try {
    return await verifyPasswordResetCode(auth, oobCode);
  } catch (error) {
    throw new Error(getAuthErrorMessage(error));
  }
}

export function getCurrentUser() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(mapUser(user));
    });
  });
}

