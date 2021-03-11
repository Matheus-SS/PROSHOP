import { IProductDocument } from '../../models/ProductModel';
import { IProductRepository } from '../../repositories/productRepository';

class ListProductByIdService {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  public async execute(id: string):Promise<IProductDocument> {
    const product = await this.productRepository.findProductById(id);

    if (!product) {
      throw new Error('Product not Found');
    }

    return product;
  }
}

export default ListProductByIdService;
