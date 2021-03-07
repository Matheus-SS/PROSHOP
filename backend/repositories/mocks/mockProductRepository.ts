import { IProductDocument } from '../../models/ProductModel';
import { IProductRepository } from '../productRepository';

export default class ProductRepository implements IProductRepository {
  private product: IProductDocument[] = [];

  public async listProducts(): Promise<IProductDocument[]> {
    const products = this.product;
    return products;
  }

  public async findProductById(id: string): Promise<IProductDocument | null> {
    const product = this.product.find((product) => product._id === id) || null;
    return product;
  }
}
