import { IUserDocument } from '../../models/UserModel';
import { IPasswordHashDTO } from '../../providers/PasswordHashProvider/PasswordHashDTO';
import {
  IUsersRepository,
  ICreateUserDTO,
} from '../../repositories/userRepository';
import generateToken from '../../utils/generateToken';

export interface IResponse {
  user: IUserDocument;
  token: string;
}

class CreateUserService {
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
    name,
    password,
  }: ICreateUserDTO): Promise<IResponse> {
    const checkUserExists = await this.userRepository.findByEmail(email);

    if (checkUserExists) {
      throw new Error('User already exists');
    }

    const hashedPassword = await this.hashProvider.hashPassword(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id);

    return { user, token };
  }
}

export default CreateUserService;
