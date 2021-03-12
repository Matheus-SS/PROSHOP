import mongoose, { Document } from 'mongoose';
import { UserSchema, IUserDocument } from './UserModel';

export interface IShippingAddress {
  user: mongoose.SchemaType;
  city: string;
  address: string;
  postalCode: string;
  country: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IShippingAddressDocument extends IShippingAddress, Document {}

const ShippingAddressSchema = new mongoose.Schema(
  {
    user: UserSchema,
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    postalCode: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ShippingAddress = mongoose.model<IShippingAddressDocument>(
  'ShippingAddress',
  ShippingAddressSchema
);

export default ShippingAddress;
