import { Request, Response } from 'express';

import asyncHandler from 'express-async-handler';
import ShippingAddress from '../models/ShippingAddressModel';
import User from '../models/UserModel';

// @desc       Register a new address
// @route      POST /api/address
// @access     Private
export const createShippingAddress = asyncHandler(
  async (request: Request, response: Response): Promise<Response> => {
    const { address, city, postalCode, country } = request.body;

    const user = await User.findById(request.userId);

    if (!user) {
      response.status(404);
      throw new Error('User not found');
    }

    const isUserAlreadyHaveAddress = await ShippingAddress.findOne({
      'user._id': request.userId,
    });

    if (isUserAlreadyHaveAddress) {
      throw new Error('User already has a registered address');
    }

    const shippingAddress = await ShippingAddress.create({
      address,
      city,
      country,
      postalCode,
      user,
    });

    const newShippingAddress = shippingAddress.toObject();

    delete newShippingAddress.user.password;

    // show the shipping address without password field
    return response.status(200).json(newShippingAddress);
  }
);

// @desc       Get user address
// @route      GET /api/address
// @access     Private
export const getUserShippingAddress = asyncHandler(
  async (request: Request, response: Response): Promise<Response> => {
    const user = await User.findById(request.userId);

    if (!user) {
      response.status(404);
      throw new Error('User not found');
    }

    const shippingAddress = await ShippingAddress.findOne({
      'user._id': request.userId,
    }).select('-__v -user.password -user.__v');

    if (!shippingAddress) {
      throw new Error(
        'User does not have a registered address, please register a address'
      );
    }

    return response.status(200).json(shippingAddress);
  }
);

// @desc       Update Shipping Address
// @route      PUT /api/address
// @access     Private
export const updateShippingAddress = asyncHandler(
  async (request: Request, response: Response): Promise<Response> => {
    const user = await User.findById(request.userId);

    if (!user) {
      response.status(404);
      throw new Error('User not found');
    }

    const shippingAddress = await ShippingAddress.findOne({
      'user._id': request.userId,
    }).select('-__v -user.password -user.__v');

    if (!shippingAddress) {
      throw new Error(
        'User does not have a registered address, please register a address'
      );
    }

    shippingAddress.address = request.body.address || shippingAddress.address;
    shippingAddress.city = request.body.city || shippingAddress.city;
    shippingAddress.postalCode =
      request.body.postalCode || shippingAddress.postalCode;
    shippingAddress.country = request.body.country || shippingAddress.country;

    const updatedShippingAddress = await shippingAddress.save();

    return response.status(200).json(updatedShippingAddress);
  }
);
