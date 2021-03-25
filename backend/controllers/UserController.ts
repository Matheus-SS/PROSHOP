import { Request, Response } from 'express';
import UsersRepository from '../repositories/userRepository';
import ShippingAddressRepository from '../repositories/shippingAddressRepository';

import BCryptHashProvider from '../providers/PasswordHashProvider/BCryptHashProvider';

import CreateUserService from '../services/users/CreateUserService';
import ShowUserProfileService from '../services/users/ShowUserProfileService';
import AuthenticateUserService from '../services/users/AuthenticateUserService';
import UpdateUserProfileService from '../services/users/UpdateUserProfileService';

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
}

// export const authenticateUser = asyncHandler(
//   async (request: Request, response: Response): Promise<Response> => {
//     const { email, password } = request.body;

//     const user = await User.findOne({ email });

//     if (!user) {
//       response.status(404);
//       throw new Error('Incorrect email/password combination.');
//     }

//     const matchedPassword = await user.matchPassword(password);

//     if (!matchedPassword) {
//       response.status(404);
//       throw new Error('Incorrect email/password combinantion.');
//     }

//     return response.status(200).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       token: generateToken(user._id),
//     });
//   }
// );

// // @desc       Get user profile
// // @route      GET /api/users/profile
// // @access     Private
// export const getUserProfile = asyncHandler(
//   async (request: Request, response: Response): Promise<Response> => {
//     const user = await User.findById(request.userId);

//     if (!user) {
//       response.status(404);
//       throw new Error('User not found');
//     }

//     return response.status(200).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//     });
//   }
// );

// // @desc       Register a new user
// // @route      POST /api/users
// // @access     Public
// export const createUser = asyncHandler(
//   async (request: Request, response: Response): Promise<Response> => {
//     const { name, email, password } = request.body;

//     const isUser = await User.findOne({ email });

//     if (isUser) {
//       response.status(404);
//       throw new Error('User already exists');
//     }

//     const user = await User.create({
//       name,
//       email,
//       password,
//     });

//     return response.status(200).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//       token: generateToken(user._id),
//     });
//   }
// );

// // @desc       Update user profile
// // @route      PUT /api/users/profile
// // @access     Private
// export const updateUserProfile = asyncHandler(
//   async (request: Request, response: Response): Promise<Response> => {
//     const user = await User.findById(request.userId);

//     if (!user) {
//       response.status(404);
//       throw new Error('User not found');
//     }

//     const userWithUpdatedEmail = await User.findOne({
//       email: request.body.email,
//     });

//     const parseIdToString = String(userWithUpdatedEmail?._id);

//     if (userWithUpdatedEmail && parseIdToString !== request.userId) {
//       throw new Error('Email already in use');
//     }

//     user.name = request.body.name || user.name;
//     user.email = request.body.email || user.email;

//     if (request.body.password) {
//       user.password = request.body.password;
//     }

//     const updatedUser = await user.save();

//     const shippingAddress = await ShippingAddress.findOne({
//       'user._id': request.userId,
//     });

//     // updates the info from user in table shipping Address when user updates
//     if (shippingAddress) {
//       const newUpdatedUser = updatedUser.toObject();
//       shippingAddress.user = newUpdatedUser;

//       await shippingAddress.save();
//     }

//     return response.status(200).json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//       token: generateToken(updatedUser._id),
//     });
//   }
// )
