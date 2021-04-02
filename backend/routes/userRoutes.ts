import express from 'express';
import asyncHandler from 'express-async-handler';
import UserController from '../controllers/UserController';
import { protect, admin } from '../middleware/AuthenticationMiddleware';
const userRouter = express.Router();
const userController = new UserController();
userRouter.post('/', asyncHandler(userController.createUser));
userRouter.post('/login', asyncHandler(userController.authenticateUser));
userRouter.get(
  '/profile',
  protect,
  asyncHandler(userController.getUserProfile)
);
userRouter.put(
  '/profile',
  protect,
  asyncHandler(userController.updateUserProfile)
);

userRouter.get('/', protect, admin, userController.getUsers);

export default userRouter;
