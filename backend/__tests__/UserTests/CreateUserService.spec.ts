import MockUserRepository from '../../repositories/mocks/mockUserRepository';
import MockBCryptHashProvider from '../../providers/PasswordHashProvider/BCryptHashProvider';

import CreateUserService from '../../services/users/CreateUserService';

let mockUserRepository: MockUserRepository;
let mockBCryptHashProvider: MockBCryptHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    mockBCryptHashProvider = new MockBCryptHashProvider();

    createUserService = new CreateUserService(
      mockUserRepository,
      mockBCryptHashProvider
    );
  });

  it('Should be able to create a new user', async () => {
    const response = await createUserService.execute({
      name: 'jhon',
      email: 'jhon@gmail.com',
      password: '123456',
    });

    expect(response.user).toHaveProperty('_id');
    expect(response.user).toHaveProperty('name');
    expect(response.user).toHaveProperty('email');
    expect(response.user).toHaveProperty('isAdmin');
    expect(response).toHaveProperty('token');
  });

  it('it should NOT be able to create a new user with same email from another', async () => {
    await createUserService.execute({
      name: 'jhon',
      email: 'jhon@gmail.com',
      password: '123456',
    });

    await expect(
      createUserService.execute({
        name: 'jhon',
        email: 'jhon@gmail.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
