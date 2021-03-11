import { Model } from 'mongoose';
import { IUser, IUserDocument } from '../models/UserModel';

import User from '../models/UserModel';

export interface ICreateUserDTO {
  name: string;
  email: string;
  password: string;
}

export interface IUsersRepository {
  create(userData: ICreateUserDTO): Promise<IUserDocument>;
  findByEmail(email: string): Promise<IUserDocument | null>;
  findById(id: string): Promise<IUserDocument | null>;
  save(user:IUserDocument):Promise<IUserDocument>;
}

class UsersRepository implements IUsersRepository {
  private user: Model<IUserDocument>;

  constructor() {
    this.user = User;
  }

  public async create(userData: ICreateUserDTO): Promise<IUserDocument> {
    const user = await this.user.create(userData);

    return user;
  }

  public async findByEmail(email: string): Promise<IUserDocument | null> {
    const user = await this.user.findOne({ email });

    return user;
  }

  public async findById(id: string): Promise<IUserDocument | null> {
    const user = await this.user.findById(id);

    return user;
  }

  public async save(user:IUserDocument): Promise<IUserDocument> {
    return await this.user.replaceOne(user._id,user);
  }
}

export default UsersRepository;