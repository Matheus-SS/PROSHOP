import MockUserRepository from '../../repositories/mocks/mockUserRepository';
import MockShippingAddressRepository from '../../repositories/mocks/mockShippingAddressRepository';

import MockBCryptHashProvider from '../../providers/PasswordHashProvider/mock/mockBCryptHashProvider';

import UpdateUserProfileService from '../../services/users/UpdateUserProfileService';

let mockUserRepository: MockUserRepository;
let mockShippingAddressRepository: MockShippingAddressRepository;
let mockBCryptHashProvider: MockBCryptHashProvider;

let updateUserProfileService: UpdateUserProfileService;

describe('UPDATE USER PROFILE', () => {
  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    mockBCryptHashProvider = new MockBCryptHashProvider();
    mockShippingAddressRepository = new MockShippingAddressRepository();

    updateUserProfileService = new UpdateUserProfileService(
      mockUserRepository,
      mockBCryptHashProvider,
      mockShippingAddressRepository
    );
  });

  it('Should be able UPDATE the profile', async () => {
    const user = await mockUserRepository.create({
      name: 'jhon',
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

    const response = await updateUserProfileService.execute({
      name: 'Paul',
      email: 'paul@yahoo.com.br',
      password: '99999',
      userId: user._id,
    });

    expect(response.updatedUser.email).toEqual('paul@yahoo.com.br');
    expect(response.updatedUser.name).toEqual('Paul');
    expect(response.updatedUser.password).toEqual('99999');
    expect(response).toHaveProperty('token');
  });

  it('Should NOT be able to found user', async () => {
    const user = await mockUserRepository.create({
      name: 'jhon',
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
      updateUserProfileService.execute({
        name: 'Paul',
        email: 'paul@yahoo.com.br',
        password: '99999',
        userId: 'WRONG-USER_ID',
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it('Should NOT be able to update user with same email in database', async () => {
    const user = await mockUserRepository.create({
      name: 'jhon',
      email: 'jhon@gmail.com',
      password: '123456',
    });

    const user2 = await mockUserRepository.create({
      name: 'ash',
      email: 'ash@gmail.com',
      password: '123456',
    });

    await expect(
      updateUserProfileService.execute({
        name: 'ash',
        email: 'ash@gmail.com',
        password: '99999',
        userId: user._id,
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
