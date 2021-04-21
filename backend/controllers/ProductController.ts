import { Request, Response } from 'express';
import Product from '../models/ProductModel';

import ProductRepository from '../repositories/productRepository';

import ListAllProductService from '../services/products/ListAllProductsService';
import ListProductByIdService from '../services/products/ListProductByIdService';

export default class ProductController {
  public async getProducts(_: Request, response: Response): Promise<Response> {
    const getProducts = new ListAllProductService(new ProductRepository());
    const products = await getProducts.execute();
    return response.status(200).json(products);
  }

  public async getProductById(
    request: Request,
    response: Response
  ): Promise<Response> {
    const getProductById = new ListProductByIdService(new ProductRepository());
    const product = await getProductById.execute(request.params.id);

    return response.status(200).json(product);
  }

  // @desc       Delete a product
  // @route      DELETE /api/products/:id
  // @access     Private/Admin
  public async deleteProduct(
    request: Request,
    response: Response
  ): Promise<Response> {
    const product = await Product.findById(request.params.id);

    if (product) {
      await product.remove();
      return response.json({ message: 'Product removed' });
    } else {
      response.status(404);
      throw new Error('Product not found');
    }
  }
}
