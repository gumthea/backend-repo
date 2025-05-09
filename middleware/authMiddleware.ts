import { Request, Response, NextFunction } from 'express';

// Extend the Request interface to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}
import admin from 'firebase-admin';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader?.split(" ")[1];
  if (!token) {
    res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token as string);
    req.userId = decodedToken.uid;
    
    return next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

