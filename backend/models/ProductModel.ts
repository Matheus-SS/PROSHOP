import mongoose, { Document, Types } from 'mongoose';
import { ReviewSchema } from './ReviewModel';

export interface IProduct {
  user: Types.ObjectId;
  name: string;
  image: string;
  brand: string;
  category: boolean;
  description: string;
  reviews: mongoose.Schema[];
  rating: number;
  numReviews: number;
  price: number;
  countInStock: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProductDocument extends IProduct, Document {}

const ProductSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [ReviewSchema],

    // average of reviews ratings
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model<IProductDocument>('Product', ProductSchema);

export default Product;
