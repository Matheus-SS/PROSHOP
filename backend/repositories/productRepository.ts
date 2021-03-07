import { Model } from 'mongoose';
import { IProductDocument } from '../models/ProductModel';

import Product from '../models/ProductModel';

export interface IProductRepository {
  listProducts(): Promise<IProductDocument[]>;
  findProductById(id: string): Promise<IProductDocument | null>;
}

export default class ProductRepository implements IProductRepository {
  private product: Model<IProductDocument>;

  constructor() {
    this.product = Product;
  }

  public async listProducts(): Promise<IProductDocument[]> {
    const products = await this.product.find({});
    return products;
  }

  public async findProductById(id: string): Promise<IProductDocument | null> {
    const product = await Product.findById(id);
    return product;
  }
}
