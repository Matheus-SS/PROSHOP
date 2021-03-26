import express from 'express';
import asyncHandler from 'express-async-handler';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import ResetPasswordController from '../controllers/ResetPasswordController';

const passwordRouter = express.Router();
const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

passwordRouter.post(
  '/forgot-password',
  asyncHandler(forgotPasswordController.sendForgotPasswordEmail)
);
passwordRouter.post(
  '/reset',
  asyncHandler(resetPasswordController.resetPassword)
);

export default passwordRouter;
