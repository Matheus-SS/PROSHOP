import EtherealMailProvider from '../providers/MailProvider/EtherealMailProvider';
import HandlebarsMailTemplate from '../providers/MailTemplate/HandlebarsMailTemplate';
import UsersRepository from '../repositories/userRepository';
import UsersTokenRepository from '../repositories/userTokenRepository';
import SendForgotPasswordEmailService from '../services/users/SendForgotPasswordEmailService';

import mailConfig from '../config/mail';
import { Request, Response } from 'express';
import SendinBlueMailProvider from '../providers/MailProvider/SendinBlueMailProvider';

export default class ForgotPasswordController {
  public async sendForgotPasswordEmail(
    request: Request,
    response: Response
  ): Promise<void> {
    const { email } = request.body;

    const providers = {
      ethereal: new EtherealMailProvider(new HandlebarsMailTemplate()),
      sendinblue: new SendinBlueMailProvider(new HandlebarsMailTemplate()),
    };

    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      new UsersRepository(),
      new UsersTokenRepository(),
      providers[mailConfig.driver]
    );

    await sendForgotPasswordEmailService.execute(email);

    response
      .status(200)
      .json(
        'Email enviado com sucesso, verifique sua caixa de entrada, lixo eletrônico ou spam'
      );
    return;
  }
}
