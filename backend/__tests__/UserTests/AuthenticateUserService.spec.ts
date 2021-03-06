import MockUserRepository from '../../repositories/mocks/mockUserRepository';
import MockBCryptHashProvider from '../../providers/PasswordHashProvider/mock/mockBCryptHashProvider';
import AutheticateUserService from '../../services/users/AuthenticateUserService';

let mockUserRepository: MockUserRepository;
let mockBCryptHashProvider: MockBCryptHashProvider;
let authenticateUserService: AutheticateUserService;

describe('Authenticate User', () => {
  beforeEach(() => {
    mockUserRepository = new MockUserRepository();
    mockBCryptHashProvider = new MockBCryptHashProvider();

    authenticateUserService = new AutheticateUserService(
      mockUserRepository,
      mockBCryptHashProvider
    );
  });

  it('Should be able to authenticate a user', async () => {
    await mockUserRepository.create({
      name: 'jhon',
      email: 'jhon@gmail.com',
      password: '123456',
    });

    const response = await authenticateUserService.execute({
      email: 'jhon@gmail.com',
      password: '123456',
    });

    expect(response.user).toHaveProperty('_id');
    expect(response.user).toHaveProperty('name');
    expect(response.user).toHaveProperty('email');
    expect(response.user).toHaveProperty('isAdmin');
    expect(response).toHaveProperty('token');
  });

  it('Should NOT be able to authenticate a user with WRONG EMAIL', async () => {
    await mockUserRepository.create({
      name: 'jhon',
      email: 'jhon@gmail.com',
      password: '123456',
    });

    await expect(
      authenticateUserService.execute({
        email: 'jhon@yahoo.com',
        password: '123456',
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it('Should NOT be able to authenticate a user with WRONG PASSWORD', async () => {
    await mockUserRepository.create({
      name: 'jhon',
      email: 'jhon@gmail.com',
      password: '123456',
    });

    await expect(
      authenticateUserService.execute({
        email: 'jhon@gmail.com',
        password: 'wrong-password',
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
