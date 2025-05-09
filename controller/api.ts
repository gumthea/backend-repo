import { Request, Response } from 'express';
import { fetchUser, updateUser, fetchIdbyEmail } from '../repository/userCollection';
import { User } from '../entities/user';

export const fetchUserData = async (req: Request, res: Response): Promise<void> => {
  const uid = req.userId;
  
  if (!uid) {
    res.status(401).json({ message: 'Unauthorized: Missing user ID' });
    return;
  }

  try {
    const user = await fetchUser(uid);
    user ? res.status(200).json({ data: user }) : res.status(404).json({ message: 'User not found' });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

export const updateUserData = async (req: Request, res: Response): Promise<void> => {
  const uid = req.userId;
  const userData: Partial<User> = req.body;

  if (!uid) {
    res.status(401).json({ message: 'Unauthorized: Missing user ID' });
    return;
  }

  if (!userData || Object.keys(userData).length === 0) {
    res.status(400).json({ message: 'Invalid user data' });
    return;
  }

  try {
    await updateUser(uid, userData);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('updateUserData error:', err);
    res.status(500).json({ message: 'Failed to update user' });
  }
};
