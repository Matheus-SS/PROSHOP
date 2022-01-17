import { IUserDocument } from '../../models/UserModel';
import { IPasswordHashDTO } from '../../providers/PasswordHashProvider/PasswordHashDTO';
import generateToken from '../../utils/generateToken';
import { v4 } from 'uuid';
import path from 'path';
import UserToken from '../../models/UserTokenModel';
import { IMailProvider } from '../../providers/MailProvider/IMailProvider';
import { IUsersRepository } from '../../repositories/userRepository';
import { IUsersTokenRepository } from '../../repositories/userTokenRepository';

class SendForgotPasswordEmailService {
  private userRepository: IUsersRepository;
  private userTokenRepository: IUsersTokenRepository;
  private mailProvider: IMailProvider;

  constructor(
    userRepository: IUsersRepository,
    userTokenRepository: IUsersTokenRepository,
    mailProvider: IMailProvider
  ) {
    this.userRepository = userRepository;
    this.userTokenRepository = userTokenRepository;
    this.mailProvider = mailProvider;
  }

  public async execute(email: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('User not found');
    }
    const token = v4();

    await this.userTokenRepository.create({
      token: token,
      userId: user._id,
    });

    const URL = `${process.env.APP_URL}/reset-password?token=${token}`;

    const templatePath = path.resolve(
      __dirname,
      '..',
      '..',
      'views',
      'forgot-password.hbs'
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: 'Recuperação de senha',
      templateData: {
        file: templatePath,
        variables: {
          name: user.name,
          link: URL,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
