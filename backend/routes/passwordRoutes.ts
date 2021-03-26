import express from 'express';
import asyncHandler from 'express-async-handler';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import {
  sendForgotPasswordEmail,
  resetPassword,
} from '../controllers/ResetPasswordController';

const passwordRouter = express.Router();
const forgotPasswordController = new ForgotPasswordController();

passwordRouter.post(
  '/forgot-password',
  asyncHandler(forgotPasswordController.sendForgotPasswordEmail)
);
// passwordRouter.post('/reset', resetPassword);

export default passwordRouter;
