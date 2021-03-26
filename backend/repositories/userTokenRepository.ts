import { Model } from 'mongoose';
import UserToken, { IUserTokenDocument } from '../models/UserTokenModel';

export interface ICreateUserTokenDTO {
  token: string;
  userId: string;
}

export interface IUsersTokenRepository {
  create(userData: ICreateUserTokenDTO): Promise<IUserTokenDocument>;
  findByToken(token: string): Promise<IUserTokenDocument | null>;
}

class UsersTokenRepository implements IUsersTokenRepository {
  private userToken: Model<IUserTokenDocument>;

  constructor() {
    this.userToken = UserToken;
  }

  public async create(
    userTokenData: ICreateUserTokenDTO
  ): Promise<IUserTokenDocument> {
    const userToken = await this.userToken.create({
      user_id: userTokenData.userId,
      resetPasswordToken: userTokenData.token,
    });

    return userToken;
  }

  public async findByToken(token: string): Promise<IUserTokenDocument | null> {
    const userToken = await this.userToken.findOne({
      resetPasswordToken: token,
    });

    return userToken;
  }
}

export default UsersTokenRepository;
