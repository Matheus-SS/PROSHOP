import { Request, Response } from 'express';
import Product from '../models/ProductModel';
import { Review } from '../models/ReviewModel';
import User from '../models/UserModel';

export default class ReviewController {
  // @desc     Create new Review
  // @route    POST /api/products/:id/reviews
  // @access   Private

  public async createProductReview(
    request: Request,
    response: Response
  ): Promise<void> {
    const { rating, comment } = request.body;

    const products = await Product.findById(request.params.id);

    const user = await User.findById(request.userId);

    if (!products || !user) {
      response.status(404);
      throw new Error('Product not found');
    }

    // user cannot reviewed the same product more than 1 time
    const alreadyReviewed = products.reviews.find(
      (productReview) =>
        productReview.user.toString() === request.userId.toString()
    );

    if (alreadyReviewed) {
      response.status(400);
      throw new Error('You already reviewed this product');
    }

    const review = {
      name: user.name,
      rating: Number(rating),
      comment,
      user: request.userId,
    };

    products.reviews.push(review);

    products.numReviews = products.reviews.length;

    const averageRating =
      products.reviews.reduce(
        (accumulator, review) => review.rating + accumulator,
        0
      ) / products.reviews.length;

    products.rating = averageRating;

    const newProduct = await products.save();
    response.status(201).json(newProduct);
    return;
  }
}
