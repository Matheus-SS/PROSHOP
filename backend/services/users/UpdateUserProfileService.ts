import { IUserDocument } from '../../models/UserModel';
import { IUsersRepository } from '../../repositories/userRepository';
import { IPasswordHashDTO } from '../../providers/PasswordHashProvider/PasswordHashDTO';
import generateToken from '../../utils/generateToken';

export interface IProfileUser {
  userId:string,
  email: string;
  name:string;
  password: string;
}

export interface IResponse {
  user: IUserDocument;
  token: string;
}

class UpdateUserProfileService {
  private userRepository: IUsersRepository;
  private hashProvider: IPasswordHashDTO;

  constructor(
    userRepository: IUsersRepository,
    hashProvider: IPasswordHashDTO
  ) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
  }

  public async execute({name,email,password,userId}:IProfileUser ): Promise<IResponse> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }
    const userWithUpdatedEmail = await this.userRepository.findByEmail(email);

    const parseIdToString = String(userWithUpdatedEmail?._id);

    if (userWithUpdatedEmail && parseIdToString !== userId) {
        throw new Error('Email already in use');
      }

    user.name = name || user.name;
    user.email = email || user.email;

    if (password) {
      const hashedPassword = await this.hashProvider.hashPassword(password);
      user.password = hashedPassword;
    }

    const updatedUser = await this.userRepository.save(user);
  }
}

export default UpdateUserProfileService;