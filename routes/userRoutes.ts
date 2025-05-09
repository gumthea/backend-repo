import express from 'express';
import {
  fetchUserData,
  updateUserData,
} from '../controller/api';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authMiddleware);

router.get('/fetch-user-data', fetchUserData);
router.put('/update-user-data', updateUserData);

export { router as userRoutes };
