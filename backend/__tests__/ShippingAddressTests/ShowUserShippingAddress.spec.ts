import MockUserRepository from '../../repositories/mocks/mockUserRepository';
import MockShippingAddressRepository from '../../repositories/mocks/mockShippingAddressRepository';

import ShowUserShippingAddressService from '../../services/shippingAddress/ShowUserShippingAddressService';

let mockUserRepository: MockUserRepository;
let mockShippingAddressRepository: MockShippingAddressRepository;

let showUserShippingAddressService: ShowUserShippingAddressService;

describe('Show User Shipping Address', () => {
  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    mockShippingAddressRepository = new MockShippingAddressRepository();

    showUserShippingAddressService = new ShowUserShippingAddressService(
      mockUserRepository,
      mockShippingAddressRepository
    );
  });

  it('Should be able to GET the user address', async () => {
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

    const shippingAddress = await showUserShippingAddressService.execute(
      user._id
    );

    expect(shippingAddress).toHaveProperty('_id');
    expect(shippingAddress).toHaveProperty('user._id');
  });

  it('Should NOT be able to FOUND the user', async () => {
    await expect(
      showUserShippingAddressService.execute('WRONG-USER_ID')
    ).rejects.toBeInstanceOf(Error);
  });

  it('Should be NOT have a registered address', async () => {
    const user = await mockUserRepository.create({
      name: 'Jhon',
      email: 'jhon@gmail.com',
      password: '123456',
    });

    await expect(
      showUserShippingAddressService.execute(user._id)
    ).rejects.toBeInstanceOf(Error);
  });
});
