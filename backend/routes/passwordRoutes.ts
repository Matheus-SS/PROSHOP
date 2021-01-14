import express from 'express';
import {
  sendForgotPasswordEmail,
  resetPassword,
} from '../controllers/ResetPasswordController';

const passwordRouter = express.Router();

passwordRouter.post('/forgot-password', sendForgotPasswordEmail);
passwordRouter.post('/reset', resetPassword);

export default passwordRouter;
