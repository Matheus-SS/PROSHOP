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
  matchPassword(password: string): Promise<boolean>;
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

UserSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

// this function will be execute when update or create a user
UserSchema.pre<IUserDocument>('save', async function (next: HookNextFunction) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model<IUserDocument>('User', UserSchema);

export default User;
