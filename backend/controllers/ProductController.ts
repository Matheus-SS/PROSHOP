import { Request, Response } from 'express';

import asyncHandler from 'express-async-handler';
import Product from '../models/ProductModel';

// @desc       Fetch all products
// @route      GET /api/products
// @access     Public
export const getProducts = asyncHandler(
  async (request: Request, response: Response): Promise<Response> => {
    const products = await Product.find({});
    return response.status(200).json(products);
  }
);

// @desc       Fetch single products
// @route      GET /api/products/:id
// @access     Public
export const getProductById = asyncHandler(
  async (request: Request, response: Response): Promise<Response> => {
    const product = await Product.findById(request.params.id);

    if (!product) {
      response.status(404);
      throw new Error('Product not Found');
    }

    return response.status(200).json(product);
  }
);
