import MockUserRepository from '../../repositories/mocks/mockUserRepository';
import MockShippingAddressRepository from '../../repositories/mocks/mockShippingAddressRepository';

import CreateShippingAddressService from '../../services/shippingAddress/CreateShippingAddressService';

let mockUserRepository: MockUserRepository;
let mockShippingAddressRepository: MockShippingAddressRepository;

let createShippingAddressService: CreateShippingAddressService;

describe('Create Shipping Address', () => {
  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    mockShippingAddressRepository = new MockShippingAddressRepository();

    createShippingAddressService = new CreateShippingAddressService(
      mockUserRepository,
      mockShippingAddressRepository
    );
  });

  it('Should be able to CREATE a new Address', async () => {
    const user = await mockUserRepository.create({
      name: 'Jhon',
      email: 'jhon@gmail.com',
      password: '123456',
    });

    const shippingAddress = await createShippingAddressService.execute({
      address: 'Rua Safira',
      city: 'Kanto',
      country: 'Japan',
      postalCode: '22333999',
      userId: user._id,
    });

    expect(shippingAddress).toHaveProperty('_id');
    expect(shippingAddress).toHaveProperty('user._id');
  });

  it('Should NOT be able to create a new Address if user NOT found', async () => {
    await expect(
      createShippingAddressService.execute({
        address: 'Rua Safira',
        city: 'Kanto',
        country: 'Japan',
        postalCode: '22333999',
        userId: 'WRONG-USER_ID',
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it('Should NOT be able to create a new Address if user already have a registered address', async () => {
    const user = await mockUserRepository.create({
      name: 'Jhon',
      email: 'jhon@gmail.com',
      password: '123456',
    });

    await mockShippingAddressRepository.create({
      address: 'Rua Safira',
      city: 'Kanto',
      country: 'Japan',
      postalCode: '22333999',
      user: user,
    });

    await expect(
      createShippingAddressService.execute({
        address: 'Rua Safira',
        city: 'Kanto',
        country: 'Japan',
        postalCode: '22333999',
        userId: user._id,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
