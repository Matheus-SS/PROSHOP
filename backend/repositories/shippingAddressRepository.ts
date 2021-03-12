import { Model } from 'mongoose';
import ShippingAddress, {
  IShippingAddressDocument,
} from '../models/ShippingAddressModel';

export interface IShippingAddressRepository {
  findByUserId(id: string): Promise<IShippingAddressDocument | null>;
  save(user: IShippingAddressDocument): Promise<IShippingAddressDocument>;
}

class ShippingAddressRepository implements IShippingAddressRepository {
  private shippingAddress: Model<IShippingAddressDocument>;

  constructor() {
    this.shippingAddress = ShippingAddress;
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
