import EtherealMailProvider from '../providers/MailProvider/EtherealMailProvider';
import HandlebarsMailTemplate from '../providers/MailTemplate/HandlebarsMailTemplate';
import UsersRepository from '../repositories/userRepository';
import UsersTokenRepository from '../repositories/userTokenRepository';
import SendForgotPasswordEmailService from '../services/users/SendForgotPasswordEmailService';

import mailConfig from '../config/mail';
import { Request, Response } from 'express';
import SendGridMailProvider from '../providers/MailProvider/SendGridMailProvider';

export default class ForgotPasswordController {
  public async sendForgotPasswordEmail(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { email } = request.body;

    const providers = {
      ethereal: new EtherealMailProvider(new HandlebarsMailTemplate()),
      sendgrid: new SendGridMailProvider(new HandlebarsMailTemplate()),
    };

    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      new UsersRepository(),
      new UsersTokenRepository(),
      providers[mailConfig.driver]
    );

    await sendForgotPasswordEmailService.execute(email);

    return response
      .status(200)
      .json(
        'Email enviado com sucesso, verifique sua caixa de entrada, lixo eletrônico ou spam'
      );
  }
}
