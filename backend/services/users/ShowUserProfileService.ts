import { IUserDocument } from '../../models/UserModel';
import { IUsersRepository } from '../../repositories/userRepository';

class ShowUserProfileService {
  private userRepository: IUsersRepository;

  constructor(userRepository: IUsersRepository) {
    this.userRepository = userRepository;
  }

  public async execute(id: string): Promise<IUserDocument> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    return user;
  }
}

export default ShowUserProfileService;
