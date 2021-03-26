import { IUserDocument } from '../../models/UserModel';
import { IUsersRepository } from '../../repositories/userRepository';

import { IPasswordHashDTO } from '../../providers/PasswordHashProvider/PasswordHashDTO';

import { IShippingAddressRepository } from '../../repositories/shippingAddressRepository';

import generateToken from '../../utils/generateToken';

export interface IProfileUser {
  userId: string;
  email: string;
  name: string;
  password: string;
}

export interface IResponse {
  updatedUser: IUserDocument;
  token: string;
}

class UpdateUserProfileService {
  private userRepository: IUsersRepository;
  private hashProvider: IPasswordHashDTO;
  private shippingAddressRepository: IShippingAddressRepository;

  constructor(
    userRepository: IUsersRepository,
    hashProvider: IPasswordHashDTO,
    shippingAddressRepository: IShippingAddressRepository
  ) {
    this.userRepository = userRepository;
    this.hashProvider = hashProvider;
    this.shippingAddressRepository = shippingAddressRepository;
  }

  public async execute({
    name,
    email,
    password,
    userId,
  }: IProfileUser): Promise<IResponse> {
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

    const shippingAddress = await this.shippingAddressRepository.findByUserId(
      userId
    );

    // updates the info from user in table shipping Address when user updates
    if (shippingAddress) {
      const newUpdatedUser = updatedUser.toObject<IUserDocument>();
      shippingAddress.user = newUpdatedUser;

      await this.shippingAddressRepository.save(shippingAddress);
    }

    const token = generateToken(updatedUser._id);

    return { updatedUser, token };
  }
}

export default UpdateUserProfileService;
