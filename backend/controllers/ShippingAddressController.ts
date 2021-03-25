import { Request, Response } from 'express';

import ShippingAddressRepository from '../repositories/shippingAddressRepository';
import UsersRepository from '../repositories/userRepository';

import CreateShippingAddressService from '../services/shippingAddress/CreateShippingAddressService';
import ShowUserShippingAddressService from '../services/shippingAddress/ShowUserShippingAddressService';
import UpdateShippingAddressService from '../services/shippingAddress/UpdateShippingAddressService';

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

  // // @desc       Update Shipping Address
  // // @route      PUT /api/address
  // // @access     Private
  public async updateShippingAddress(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { address, city, postalCode, country } = request.body;
    const userId = request.userId;
    const updateShippingAddressService = new UpdateShippingAddressService(
      new UsersRepository(),
      new ShippingAddressRepository()
    );

    const shippingAddress = await updateShippingAddressService.execute({
      userId,
      address,
      city,
      postalCode,
      country,
    });

    return response.status(200).json(shippingAddress);
  }
}
