import {
  login as firebaseLogin,
  register as firebaseRegister,
  loginWithGoogle as firebaseLoginWithGoogle,
  logout as firebaseLogout,
  getCurrentUser as firebaseGetCurrentUser,
  resetPassword as firebaseResetPassword,
  confirmPasswordResetCode as firebaseConfirmPasswordResetCode,
  verifyResetCode as firebaseVerifyResetCode,
} from '@/firebase/auth';
import { updateProfile as updateFirebaseProfile } from 'firebase/auth';
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
  if (!email || !password) throw new Error('Email and password are required.');
  return await firebaseLogin({ email, password });
}

export async function register({ email, password, displayName }) {
  if (!email || !password) throw new Error('Email and password are required.');
  return await firebaseRegister({ email, password, displayName });
}

export async function loginWithGoogle() {
  return await firebaseLoginWithGoogle();
}

export async function logout() {
  await firebaseLogout();
}

export async function getCurrentUser() {
  return await firebaseGetCurrentUser();
}

export async function resetPassword(email) {
  if (!email) throw new Error('Email is required.');
  await firebaseResetPassword(email);
}

export async function confirmPasswordResetCode(oobCode, newPassword) {
  if (!oobCode || !newPassword) throw new Error('Reset code and new password are required.');
  await firebaseConfirmPasswordResetCode(oobCode, newPassword);
}

export async function verifyResetCode(oobCode) {
  if (!oobCode) throw new Error('Reset code is required.');
  return await firebaseVerifyResetCode(oobCode);
}

export async function updateUserProfile(updates) {
  const currentUser = auth.currentUser;
  if (!currentUser) return null;
  await updateFirebaseProfile(currentUser, updates);
  return mapUser(currentUser);
}

export const updateProfile = updateUserProfile;

