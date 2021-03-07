import { IUserDocument } from '../../models/UserModel';
import { IUsersRepository } from '../../repositories/userRepository';
import { IPasswordHashDTO } from '../../providers/PasswordHashProvider/PasswordHashDTO';
import generateToken from '../../utils/generateToken';

export interface IAuthenticateUser {
  email: string;
  password: string;
}

export interface IResponse {
  user: IUserDocument;
  token: string;
}

class AuthenticateUserService {
  private userRepository: IUsersRepository;
  private hashProvider: IPasswordHashDTO;

  constructor(
    userRepository: IUsersRepository,
    hashProvider: IPasswordHashDTO
  ) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({
    email,
    password,
  }: IAuthenticateUser): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    const matchedPassword = await this.hashProvider.comparePasswordHash(
      password,
      user.password
    );

    if (!matchedPassword) {
      throw new Error('Incorrect email/password combination.');
    }

    const token = generateToken(user._id);

    return { user, token };
  }
}

export default AuthenticateUserService;
