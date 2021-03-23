import { ObjectID } from 'mongodb';
import { IUsersRepository, ICreateUserDTO } from '../userRepository';

import User, { IUserDocument } from '../../models/UserModel';

class MockUsersRepository implements IUsersRepository {
  private users: IUserDocument[] = [];

  public async findByEmail(email: string): Promise<IUserDocument | null> {
    const findUser = this.users.find((user) => user.email === email);

    return findUser || null;
  }

  public async findById(id: string): Promise<IUserDocument | null> {
    const findUser = this.users.find((user) => user._id === id);

    return findUser || null;
  }

  public async create(userData: ICreateUserDTO): Promise<IUserDocument> {
    const user = new User();

    Object.assign(user, { _id: new ObjectID() }, userData);

    this.users.push(user);

    return user;
  }

  public async save(user: IUserDocument): Promise<IUserDocument> {
    const findIndex = this.users.findIndex(
      (findUser) => findUser._id === user._id
    );

    this.users[findIndex] = user;

    return user;
  }
}
export default MockUsersRepository;
