import MockUsersRepository from '../../repositories/mocks/mockUserRepository';
import MockUsersTokenRepository from '../../repositories/mocks/mockUserTokenRepository';
import MockMailProvider from '../../providers/MailProvider/mock/mockMailProvider';

import SendForgotPasswordEmailService from '../../services/users/SendForgotPasswordEmailService';

let mockUserRepository: MockUsersRepository;
let mockUsersTokenRepository: MockUsersTokenRepository;
let mockMailProvider: MockMailProvider;

let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SEND FORGOT PASSWORD EMAIL SERVICE', () => {
  beforeEach(() => {
    mockUserRepository = new MockUsersRepository();
    mockUsersTokenRepository = new MockUsersTokenRepository();
    mockMailProvider = new MockMailProvider();

    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      mockUserRepository,
      mockUsersTokenRepository,
      mockMailProvider
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(mockMailProvider, 'sendMail');

    await mockUserRepository.create({
      email: 'jhon@gmail.com',
      name: 'Jhon',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute('jhon@gmail.com');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should NOT be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmailService.execute('jhon@gmail.com')
    ).rejects.toBeInstanceOf(Error);
  });
});
