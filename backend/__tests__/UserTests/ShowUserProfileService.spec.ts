import MockUserRepository from '../../repositories/mocks/mockUserRepository';
import ShowUserProfileService from '../../services/users/ShowUserProfileService';

let mockUserRepository: MockUserRepository;
let showUserProfileService: ShowUserProfileService;

describe('Authenticate User', () => {
  beforeEach(() => {
    mockUserRepository = new MockUserRepository();

    showUserProfileService = new ShowUserProfileService(mockUserRepository);
  });

  it('Should be able to get profile user', async () => {
    const user = await mockUserRepository.create({
      name: 'jhon',
      email: 'jhon@gmail.com',
      password: '123456',
    });

    const response = await showUserProfileService.execute(user._id);

    expect(response._id).toBe(user._id);
    expect(response.email).toBe(user.email);
    expect(response.name).toBe(user.name);
  });

  it('Should NOT be able to found a user by ID', async () => {
    await mockUserRepository.create({
      name: 'jhon',
      email: 'jhon@gmail.com',
      password: '123456',
    });

    await expect(
      showUserProfileService.execute('WRONG_ID')
    ).rejects.toBeInstanceOf(Error);
  });
});
