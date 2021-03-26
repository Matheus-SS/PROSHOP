import mongoose, { Document, Types } from 'mongoose';

export interface IUserToken {
  // properties
  user_id: Types.ObjectId;
  resetPasswordToken: string;
  createdAt?: Date;
  updatedAt?: Date;

  //methods
}

export interface IUserTokenDocument extends IUserToken, Document {}

const UserTokenSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    resetPasswordToken: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserToken = mongoose.model<IUserTokenDocument>(
  'UserToken',
  UserTokenSchema
);

export default UserToken;
