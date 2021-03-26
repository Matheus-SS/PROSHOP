import { ObjectID } from 'mongodb';
import { v4 } from 'uuid';
import UserToken, { IUserTokenDocument } from '../../models/UserTokenModel';
import {
  ICreateUserTokenDTO,
  IUsersTokenRepository,
} from '../userTokenRepository';

class MockUsersTokenRepository implements IUsersTokenRepository {
  private usersToken: IUserTokenDocument[] = [];

  public async create(
    userTokenData: ICreateUserTokenDTO
  ): Promise<IUserTokenDocument> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      _id: ObjectID,
      user_id: userTokenData.userId,
      resetPasswordToken: userTokenData.token,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.usersToken.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<IUserTokenDocument | null> {
    const userToken = this.usersToken.find(
      (userToken) => userToken.resetPasswordToken === token
    );

    return userToken || null;
  }
}

export default MockUsersTokenRepository;
