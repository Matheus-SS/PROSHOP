import express from 'express';
import asyncHandler from 'express-async-handler';
import UserController from '../controllers/UserController';
import // authenticateUser,
// getUserProfile,
// createUser,
// updateUserProfile,
'../controllers/UserController';
import { protect } from '../middleware/AuthenticationMiddleware';
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

export default userRouter;
