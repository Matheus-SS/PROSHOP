import mongoose, { Document, Types } from 'mongoose';

export interface IReview {
  user: string;
  name: string;
  rating: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface IReviewDocument extends IReview, Document {}

const ReviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model<IReviewDocument>('Review', ReviewSchema);

export { Review, ReviewSchema };
