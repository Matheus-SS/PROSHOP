import mongoose, { Document, HookNextFunction } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser {
  // properties
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  //methods
  // matchPassword(password: string): Promise<boolean>;
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
