import MockUsersRepository from '../../repositories/mocks/mockUserRepository';
import MockUsersTokenRepository from '../../repositories/mocks/mockUserTokenRepository';
import MockBCryptHashProvider from '../../providers/PasswordHashProvider/mock/mockBCryptHashProvider';

import ResetPasswordService from '../../services/users/ResetPasswordService';

let mockUsersRepository: MockUsersRepository;
let mockUsersTokenRepository: MockUsersTokenRepository;
let mockBCryptHashProvider: MockBCryptHashProvider;

let resetPasswordService: ResetPasswordService;

describe('RESET PASSWORD SERVICE', () => {
  beforeEach(() => {
    mockUsersRepository = new MockUsersRepository();
    mockUsersTokenRepository = new MockUsersTokenRepository();
    mockBCryptHashProvider = new MockBCryptHashProvider();

    resetPasswordService = new ResetPasswordService(
      mockUsersRepository,
      mockUsersTokenRepository,
      mockBCryptHashProvider
    );
  });

  it('should be able to reset the password', async () => {
    const user = await mockUsersRepository.create({
      email: 'jhon@gmail.com',
      name: 'jhon',
      password: '123456',
    });

    const userToken = await mockUsersTokenRepository.create({
      token: 'TOKEN',
      userId: user._id,
    });

    await resetPasswordService.execute({
      token: userToken.resetPasswordToken,
      password: '1',
      confirm_password: '1',
    });

    const updatedUser = await mockUsersRepository.findById(user._id);

    expect(updatedUser?.password).toEqual('1');
  });

  it('should NOT be able to reset the password with non-existing TOKEN ', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'TOKEN_DOES_NOT_EXISTS',
        password: '1',
        confirm_password: '1',
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it('should NOT be able to reset the password with non-existing USER ', async () => {
    const userToken = await mockUsersTokenRepository.create({
      token: 'TOKEN',
      userId: 'USER_DOES_NOT_EXISTS',
    });

    await expect(
      resetPasswordService.execute({
        token: userToken.resetPasswordToken,
        confirm_password: '1',
        password: '1',
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it('should NOT be able to reset the password if passed more than 30 minutes', async () => {
    // Instructs Jest to use fake versions of the standard timer functions
    // pass 'modern' as an argument, @sinonjs/fake-timers will be used as implementation instead of Jest's own fake timers.
    jest.useFakeTimers('modern');

    const user = await mockUsersRepository.create({
      email: 'johndoe@gmail.com',
      name: 'John Doe',
      password: '123456',
    });

    const userToken = await mockUsersTokenRepository.create({
      token: 'TOKEN',
      userId: user._id,
    });

    const customDate = new Date();

    customDate.setMinutes(customDate.getMinutes() + 31);

    //Simulates a changing the system clock
    jest.setSystemTime(customDate);

    await expect(
      resetPasswordService.execute({
        token: userToken.resetPasswordToken,
        confirm_password: '1',
        password: '1',
      })
    ).rejects.toBeInstanceOf(Error);
  });

  it('should NOT be able to reset the password if password field is different from confirm password field', async () => {
    const user = await mockUsersRepository.create({
      email: 'jhon@gmail.com',
      name: 'jhon',
      password: '123456',
    });

    const userToken = await mockUsersTokenRepository.create({
      token: 'TOKEN',
      userId: user._id,
    });

    await expect(
      resetPasswordService.execute({
        token: userToken.resetPasswordToken,
        password: '1',
        confirm_password: '2',
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
