import MockUserRepository from '../../repositories/mocks/mockUserRepository';
import MockHashProvider from '../../providers/PasswordHashProvider/mock/mockHashProvider';

import CreateUserService from '../../services/users/CreateUserService';

let mockUserRepository: MockUserRepository;
let mockHashProvider: MockHashProvider;
let createUserService: CreateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    mockHashProvider = new MockHashProvider();

    createUserService = new CreateUserService(
      mockUserRepository,
      mockHashProvider
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
});
