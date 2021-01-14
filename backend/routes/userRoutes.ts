import express from 'express';
import {
  authenticateUser,
  getUserProfile,
  createUser,
  updateUserProfile,
} from '../controllers/UserController';
import { protect } from '../middleware/AuthenticationMiddleware';
const userRouter = express.Router();

userRouter.post('/', createUser);
userRouter.post('/login', authenticateUser);
userRouter.get('/profile', protect, getUserProfile);
userRouter.put('/profile', protect, updateUserProfile);

export default userRouter;
