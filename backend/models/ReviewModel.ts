import mongoose, { Document } from 'mongoose';

export interface IReview {
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
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model<IReviewDocument>('Review', ReviewSchema);

export { Review, ReviewSchema };
