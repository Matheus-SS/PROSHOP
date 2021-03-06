import mongoose, { Document } from 'mongoose';

export interface IUser {
  // properties
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;

}

export interface IUserDocument extends IUser, Document {}

export const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model<IUserDocument>('User', UserSchema);

export default User;
