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

class CreateShippingAddressService {
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
    userId,
    address,
    city,
    country,
    postalCode,
  }: IRequestDTO): Promise<IShippingAddressDocument> {
    const checkUserExists = await this.userRepository.findById(userId);

    if (!checkUserExists) {
      throw new Error('User not found');
    }

    const isUserAlreadyHaveAddress = await this.shippingAddressRepository.findByUserId(
      userId
    );

    if (isUserAlreadyHaveAddress) {
      throw new Error('User already has a registered address');
    }

    const shippingAddress = await this.shippingAddressRepository.create({
      address,
      city,
      country,
      postalCode,
      user: checkUserExists,
    });

    const newShippingAddress = shippingAddress.toObject<IShippingAddressDocument>(
      {
        transform: (doc, ret) => {
          delete ret.user?.password;
          return ret;
        },
      }
    );

    // show the shipping address without password field
    return newShippingAddress;
  }
}

export default CreateShippingAddressService;
