import { IPasswordHashDTO } from '../../providers/PasswordHashProvider/PasswordHashDTO';
import { IUsersRepository } from '../../repositories/userRepository';
import { IUsersTokenRepository } from '../../repositories/userTokenRepository';

import { differenceInMinutes } from 'date-fns';

interface IRequest {
  token: string;
  password: string;
  confirm_password: string;
}

class ResetPasswordService {
  private userRepository: IUsersRepository;
  private userTokenRepository: IUsersTokenRepository;
  private hashProvider: IPasswordHashDTO;

  constructor(
    usersRepository: IUsersRepository,
    usersTokenRepository: IUsersTokenRepository,
    hashProvider: IPasswordHashDTO
  ) {
    this.userRepository = usersRepository;
    this.userTokenRepository = usersTokenRepository;
    this.hashProvider = hashProvider;
  }
  public async execute({
    token,
    password,
    confirm_password,
  }: IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw Error('Token does not exists');
    }

    const user = await this.userRepository.findById(userToken.user_id);

    if (!user) {
      throw Error('User does not exists');
    }

    let minutes;
    if (userToken.createdAt) {
      minutes = differenceInMinutes(new Date(), userToken.createdAt);

      //throw a error if token is greater than 30 minutes
      if (minutes > 30) {
        throw Error('Token expired');
      }
    }

    if (password !== confirm_password) {
      throw Error('Confirm password different from password');
    }

    user.password = await this.hashProvider.hashPassword(password);

    await this.userRepository.save(user);
  }
}

export default ResetPasswordService;
