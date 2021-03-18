import { Model } from 'mongoose';
import ShippingAddress, {
  IShippingAddressDocument,
} from '../models/ShippingAddressModel';

import { IUserDocument } from '../models/UserModel';

export interface ICreateShippingAddressDTO {
  address: string;
  city: string;
  country: string;
  postalCode: string;
  user: IUserDocument;
}

export interface IShippingAddressRepository {
  findByUserId(id: string): Promise<IShippingAddressDocument | null>;
  save(
    shippingAddress: IShippingAddressDocument
  ): Promise<IShippingAddressDocument>;
  create(
    shippingAddressData: ICreateShippingAddressDTO
  ): Promise<IShippingAddressDocument>;
}

class ShippingAddressRepository implements IShippingAddressRepository {
  private shippingAddress: Model<IShippingAddressDocument>;

  constructor() {
    this.shippingAddress = ShippingAddress;
  }

  public async create(
    shippingAddressData: ICreateShippingAddressDTO
  ): Promise<IShippingAddressDocument> {
    const shippingAddress = await this.shippingAddress.create(
      shippingAddressData
    );

    return shippingAddress;
  }

  public async findByUserId(
    id: string
  ): Promise<IShippingAddressDocument | null> {
    const shippingAddress = await this.shippingAddress.findOne({
      'user._id': id,
    });

    return shippingAddress;
  }

  public async save(
    shippingAddress: IShippingAddressDocument
  ): Promise<IShippingAddressDocument> {
    const updatedShippingAddress = await this.shippingAddress.findOneAndUpdate(
      {
        _id: shippingAddress._id,
      },
      shippingAddress,
      {
        new: true, // return a new document updated
        upsert: true, // return a new document if not found the object to update
      }
    );
    return updatedShippingAddress;
  }
}

export default ShippingAddressRepository;
