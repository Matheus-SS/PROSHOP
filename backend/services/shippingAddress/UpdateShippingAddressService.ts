import { IShippingAddressDocument } from '../../models/ShippingAddressModel';
import { IShippingAddressRepository } from '../../repositories/shippingAddressRepository';
import { IUsersRepository } from '../../repositories/userRepository';

interface IRequestDTO {
  userId: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
}

class UpdateShippingAddressService {
  private userRepository: IUsersRepository;
  private shippingAddressRepository: IShippingAddressRepository;

  constructor(
    userRepository: IUsersRepository,
    shippingAddressRepository: IShippingAddressRepository
  ) {
    this.userRepository = userRepository;
    this.shippingAddressRepository = shippingAddressRepository;
  }

  public async execute({
    address,
    city,
    country,
    postalCode,
    userId,
  }: IRequestDTO): Promise<IShippingAddressDocument> {
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

    shippingAddress.address = address || shippingAddress.address;
    shippingAddress.city = city || shippingAddress.city;
    shippingAddress.postalCode = postalCode || shippingAddress.postalCode;
    shippingAddress.country = country || shippingAddress.country;

    const updatedShippingAddress = await this.shippingAddressRepository.save(
      shippingAddress
    );

    const newUpdatedShippingAddress = updatedShippingAddress.toObject<IShippingAddressDocument>(
      {
        transform: (doc, ret) => {
          delete ret.user?.password;
          return ret;
        },
      }
    );

    return newUpdatedShippingAddress;
  }
}

export default UpdateShippingAddressService;
