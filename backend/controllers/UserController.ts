import { Request, Response } from 'express';
import UsersRepository from '../repositories/userRepository';
import ShippingAddressRepository from '../repositories/shippingAddressRepository';

import BCryptHashProvider from '../providers/PasswordHashProvider/BCryptHashProvider';

import CreateUserService from '../services/users/CreateUserService';
import ShowUserProfileService from '../services/users/ShowUserProfileService';
import AuthenticateUserService from '../services/users/AuthenticateUserService';
import UpdateUserProfileService from '../services/users/UpdateUserProfileService';
import User from '../models/UserModel';

export default class UserController {
  // // @desc       Register a new user
  // // @route      POST /api/users
  // // @access     Public
  public async createUser(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService(
      new UsersRepository(),
      new BCryptHashProvider()
    );
    const { user, token } = await createUser.execute({ name, email, password });

    return response.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token,
    });
  }

  // @desc       Get user profile
  // @route      GET /api/users/profile
  // @access     Private
  public async getUserProfile(
    request: Request,
    response: Response
  ): Promise<Response> {
    const userId = request.userId;

    const getUserProfile = new ShowUserProfileService(new UsersRepository());

    const user = await getUserProfile.execute(userId);

    return response.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  }

  // @desc       Authenticate user & get token
  // @route      POST /api/users/login
  // @access     Public
  public async authenticateUser(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService(
      new UsersRepository(),
      new BCryptHashProvider()
    );

    const { user, token } = await authenticateUser.execute({ email, password });

    return response.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token,
    });
  }

  // @desc       Update user profile
  // @route      PUT /api/users/profile
  // @access     Private
  public async updateUserProfile(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { name, email, password } = request.body;
    const userId = request.userId;

    const updateUserProfile = new UpdateUserProfileService(
      new UsersRepository(),
      new BCryptHashProvider(),
      new ShippingAddressRepository()
    );

    const { updatedUser, token } = await updateUserProfile.execute({
      name,
      email,
      password,
      userId,
    });

    return response.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: token,
    });
  }

  // @desc       Get user profile
  // @route      GET /api/users
  // @access     Private/Admin
  public async getUsers(
    request: Request,
    response: Response
  ): Promise<Response> {
    const users = await User.find({});

    return response.status(200).json(users);
  }
}
