import { ObjectID } from 'mongodb';
import ShippingAddress, {
  IShippingAddressDocument,
} from '../../models/ShippingAddressModel';

import {
  ICreateShippingAddressDTO,
  IShippingAddressRepository,
} from '../shippingAddressRepository';

class MockShippingAddressRepository implements IShippingAddressRepository {
  private shippingAddress: IShippingAddressDocument[] = [];

  public async create(
    shippingAddressData: ICreateShippingAddressDTO
  ): Promise<IShippingAddressDocument> {
    const shippingAddress = new ShippingAddress();

    Object.assign(
      shippingAddress,
      { _id: new ObjectID() },
      shippingAddressData
    );

    this.shippingAddress.push(shippingAddress);

    return shippingAddress;
  }

  public async findByUserId(
    id: string
  ): Promise<IShippingAddressDocument | null> {
    const shippingAddress = this.shippingAddress.find(
      (shippingAddress) => shippingAddress.user._id === id
    );

    return shippingAddress || null;
  }

  public async save(
    shippingAddress: IShippingAddressDocument
  ): Promise<IShippingAddressDocument> {
    const findIndex = this.shippingAddress.findIndex(
      (findAddress) => findAddress._id === shippingAddress._id
    );

    this.shippingAddress[findIndex] = shippingAddress;

    return shippingAddress;
  }
}

export default MockShippingAddressRepository;
