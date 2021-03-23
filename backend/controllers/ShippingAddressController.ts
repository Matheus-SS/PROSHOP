import { Request, Response } from 'express';

import asyncHandler from 'express-async-handler';
import ShippingAddress from '../models/ShippingAddressModel';
import User from '../models/UserModel';
import ShippingAddressRepository from '../repositories/shippingAddressRepository';
import UsersRepository from '../repositories/userRepository';
import CreateShippingAddressService from '../services/shippingAddress/CreateShippingAddressService';
import ShowUserShippingAddressService from '../services/shippingAddress/ShowUserShippingAddressService';

export default class ShippingAddressController {
  // @desc       Register a new address
  // @route      POST /api/address
  // @access     Private
  public async createShippingAddress(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { address, city, postalCode, country } = request.body;
    const userId = request.userId;
    const createShippingAddressService = new CreateShippingAddressService(
      new UsersRepository(),
      new ShippingAddressRepository()
    );

    const shippingAddress = await createShippingAddressService.execute({
      address,
      city,
      country,
      postalCode,
      userId,
    });

    return response.status(200).json(shippingAddress);
  }

  // // @desc       Get user address
  // // @route      GET /api/address
  // // @access     Private
  public async getUserShippingAddress(
    request: Request,
    response: Response
  ): Promise<Response> {
    const userId = request.userId;
    const showUserShippingAddressService = new ShowUserShippingAddressService(
      new UsersRepository(),
      new ShippingAddressRepository()
    );

    const shippingAddress = await showUserShippingAddressService.execute(
      userId
    );

    return response.status(200).json(shippingAddress);
  }
}

// // @desc       Update Shipping Address
// // @route      PUT /api/address
// // @access     Private
// export const updateShippingAddress = asyncHandler(
//   async (request: Request, response: Response): Promise<Response> => {
//     const user = await User.findById(request.userId);

//     if (!user) {
//       response.status(404);
//       throw new Error('User not found');
//     }

//     const shippingAddress = await ShippingAddress.findOne({
//       'user._id': request.userId,
//     }).select('-__v -user.password -user.__v');

//     if (!shippingAddress) {
//       throw new Error(
//         'User does not have a registered address, please register a address'
//       );
//     }

//     shippingAddress.address = request.body.address || shippingAddress.address;
//     shippingAddress.city = request.body.city || shippingAddress.city;
//     shippingAddress.postalCode =
//       request.body.postalCode || shippingAddress.postalCode;
//     shippingAddress.country = request.body.country || shippingAddress.country;

//     const updatedShippingAddress = await shippingAddress.save();

//     return response.status(200).json(updatedShippingAddress);
//   }
// );
