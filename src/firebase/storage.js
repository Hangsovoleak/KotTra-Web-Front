import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/firebase/config';

export async function uploadImage(file, path = 'uploads') {
  const storageRef = ref(storage, `${path}/${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  return getDownloadURL(snapshot.ref);
}

export async function deleteImage(path) {
  const imageRef = ref(storage, path);
  await deleteObject(imageRef);
}

export async function getImageURL(path) {
  return getDownloadURL(ref(storage, path));
}
