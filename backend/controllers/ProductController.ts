import { Request, Response } from 'express';

import ProductRepository from '../repositories/productRepository';

import ListAllProductService from '../services/products/ListAllProductsService';
import ListProductByIdService from '../services/products/ListProductByIdService';

export default class ProductController {
  public async getProducts(_: Request, response: Response): Promise<Response> {
    const getProducts = new ListAllProductService(new ProductRepository());
    const products = await getProducts.execute();
    return response.status(200).json(products);
  }

  public async getProductById(request: Request, response: Response) {
    const getProductById = new ListProductByIdService(new ProductRepository());
    const product = await getProductById.execute(request.params.id);

    return response.status(200).json(product);
  }
}
