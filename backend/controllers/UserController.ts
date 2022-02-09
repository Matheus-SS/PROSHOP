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
  public async createUser(request: Request, response: Response): Promise<void> {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService(
      new UsersRepository(),
      new BCryptHashProvider()
    );
    const { user, token } = await createUser.execute({ name, email, password });

    response.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token,
    });
    return;
  }

  // @desc       Get user profile
  // @route      GET /api/users/profile
  // @access     Private
  public async getUserProfile(
    request: Request,
    response: Response
  ): Promise<void> {
    const userId = request.userId;

    const getUserProfile = new ShowUserProfileService(new UsersRepository());

    const user = await getUserProfile.execute(userId);

    response.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
    return;
  }

  // @desc       Authenticate user & get token
  // @route      POST /api/users/login
  // @access     Public
  public async authenticateUser(
    request: Request,
    response: Response
  ): Promise<void> {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService(
      new UsersRepository(),
      new BCryptHashProvider()
    );

    const { user, token } = await authenticateUser.execute({ email, password });

    response.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: token,
    });
    return;
  }

  // @desc       Update user profile
  // @route      PUT /api/users/profile
  // @access     Private
  public async updateUserProfile(
    request: Request,
    response: Response
  ): Promise<void> {
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

    response.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: token,
    });
    return;
  }

  // @desc       Get users
  // @route      GET /api/users
  // @access     Private/Admin
  public async getUsers(
    request: Request,
    response: Response
  ): Promise<Response> {
    const users = await User.find({});

    return response.status(200).json(users);
  }

  // @desc       Delete user
  // @route      DELETE /api/users/:id
  // @access     Private/Admin
  public async deleteUser(
    request: Request,
    response: Response
  ): Promise<Response> {
    const user = await User.findById(request.params.id);
    try {
      if (!user) {
        throw new Error('User not found');
      }
      await user.remove();
      return response.json({ message: 'User removed' });
    } catch (error: any) {
      return response.status(404).json({ message: error.message });
    }
  }

  // @desc       Get user by ID
  // @route      GET /api/users/:id
  // @access     Private/Admin
  public async getUserById(
    request: Request,
    response: Response
  ): Promise<void> {
    const user = await User.findById(request.params.id).select('-password');

    if (user) {
      response.status(200).json(user);
      return;
    } else {
      response.status(404);
      throw new Error('User not found');
    }
  }

  // @desc       Update user
  // @route      PUT /api/users/:id
  // @access     Private/Admin
  public async updateUser(request: Request, response: Response): Promise<void> {
    const user = await User.findById(request.params.id);

    if (user) {
      user.name = request.body.name || user.name;
      user.email = request.body.email || user.email;

      user.isAdmin = request.body.isAdmin;

      const updatedUser = await user.save();

      response.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
      return;
    } else {
      response.status(404);
      throw new Error('User not found');
    }
  }
}
