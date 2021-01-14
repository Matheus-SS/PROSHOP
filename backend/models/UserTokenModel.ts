import mongoose, { Document, Types } from 'mongoose';
import crypto from 'crypto';
import { promisify } from 'util';

export interface IUserToken {
  // properties
  user_id: Types.ObjectId;
  resetPasswordToken: string;
  createdAt?: Date;
  updatedAt?: Date;

  //methods
  generateToken: () => Promise<string>;
}

interface IUserTokenDocument extends IUserToken, Document {}

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

UserTokenSchema.methods.generateToken = async function generateToken() {
  const randBytes = promisify(crypto.randomBytes);
  const bytes = await randBytes(20).catch((error) => {
    throw new error();
  });
  return bytes.toString('hex');
};

const UserToken = mongoose.model<IUserTokenDocument>(
  'UserToken',
  UserTokenSchema
);

export default UserToken;
