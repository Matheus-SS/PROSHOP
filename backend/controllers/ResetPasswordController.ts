import { Request, Response } from 'express';

import UsersTokenRepository from '../repositories/userTokenRepository';
import UsersRepository from '../repositories/userRepository';

import ResetPasswordService from '../services/users/ResetPasswordService';
import BCryptHashProvider from '../providers/PasswordHashProvider/BCryptHashProvider';

export default class ResetPasswordController {
  public async resetPassword(
    request: Request,
    response: Response
  ): Promise<void> {
    const { token, password, confirm_password } = request.body;

    const resetPasswordService = new ResetPasswordService(
      new UsersRepository(),
      new UsersTokenRepository(),
      new BCryptHashProvider()
    );

    await resetPasswordService.execute({
      token,
      password,
      confirm_password,
    });

    response.status(200).json('Password change successfully');
    return;
  }
}
