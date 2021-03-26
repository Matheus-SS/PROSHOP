import {
  IShippingAddressDocument,
  IShippingAddress,
} from '../../models/ShippingAddressModel';
import { IShippingAddressRepository } from '../../repositories/shippingAddressRepository';
import { IUsersRepository } from '../../repositories/userRepository';

class ShowUserShippingAddressService {
  private userRepository: IUsersRepository;
  private shippingAddressRepository: IShippingAddressRepository;

  constructor(
    userRepository: IUsersRepository,
    shippingAddressRepository: IShippingAddressRepository
  ) {
    this.userRepository = userRepository;
    this.shippingAddressRepository = shippingAddressRepository;
  }

  public async execute(userId: string): Promise<IShippingAddressDocument> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const shippingAddress = await this.shippingAddressRepository.findByUserId(
      userId
    );

    if (!shippingAddress) {
      throw new Error(
        'User does not have a registered address, please register a address'
      );
    }

    const newShippingAddress = shippingAddress.toObject<IShippingAddressDocument>(
      {
        transform: (doc, ret) => {
          delete ret.user?.password;
          return ret;
        },
      }
    );

    return newShippingAddress;
  }
}

export default ShowUserShippingAddressService;
