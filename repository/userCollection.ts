import { db } from '../config/firebaseConfig';
import { User } from '../entities/user';

const USERS_COLLECTION = db.collection('USERS')

export const updateUser = async (uid: string, data: Partial<User>): Promise<void> => {
  if (!uid || !data) throw new Error('Invalid parameters for updateUser');
  await USERS_COLLECTION.doc(uid).set(data, { merge: true });
};

export const fetchUser = async (uid: string): Promise<User | null> => {
  if (!uid?.trim()) {
    throw new Error("Invalid UID");
  }

  const snapshot = await USERS_COLLECTION.doc(uid).get();

  return snapshot.exists ? (snapshot.data() as User) : null;
};

export const fetchIdbyEmail = async (email: string) => {
  if (!email) throw new Error('Invalid email');
  return USERS_COLLECTION.where('email', '==', email).limit(1).get();
};
