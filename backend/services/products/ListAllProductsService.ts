import { IProductDocument } from '../../models/ProductModel';
import { IProductRepository } from '../../repositories/productRepository';

class ListAllProductService {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  public async execute(): Promise<IProductDocument[]> {
    const products = await this.productRepository.listProducts();
    return products;
  }
}

export default ListAllProductService;
