import MockUserRepository from '../../repositories/mocks/mockUserRepository';
import MockShippingAddressRepository from '../../repositories/mocks/mockShippingAddressRepository';

import UpdateShippingAddressService from '../../services/shippingAddress/UpdateShippingAddressService';

let mockUserRepository: MockUserRepository;
let mockShippingAddressRepository: MockShippingAddressRepository;

let updateShippingAddressService: UpdateShippingAddressService;

describe('UPDATE Shipping Address', () => {
  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    mockShippingAddressRepository = new MockShippingAddressRepository();

    updateShippingAddressService = new UpdateShippingAddressService(
      mockUserRepository,
      mockShippingAddressRepository
    );
  });

  it('Should be able to UPDATE the user address', async () => {
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

    const shippingAddress = await updateShippingAddressService.execute({
      address: 'Rua Rubi',
      city: 'Hoen',
      country: 'Korea',
      postalCode: '99999999',
      userId: user._id,
    });

    expect(shippingAddress.address).toEqual('Rua Rubi');
    expect(shippingAddress.city).toEqual('Hoen');
    expect(shippingAddress.country).toEqual('Korea');
    expect(shippingAddress.postalCode).toEqual('99999999');
  });

  it('Should NOT be able to FOUND the user', async () => {
    await expect(
      updateShippingAddressService.execute({
        address: 'test1',
        city: 'test2',
        country: 'test3',
        postalCode: 'test4',
        userId: 'WRONG-USER_ID',
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it('Should be NOT have a registered address', async () => {
    const user = await mockUserRepository.create({
      name: 'Jhon',
      email: 'jhon@gmail.com',
      password: '123456',
    });

    await expect(
      updateShippingAddressService.execute({
        userId: user._id,
        address: 'test1',
        city: 'test2',
        country: 'test3',
        postalCode: 'test4',
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
