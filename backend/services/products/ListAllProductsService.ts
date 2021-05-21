import { IProductDocument } from '../../models/ProductModel';
import { IProductRepository } from '../../repositories/productRepository';

class ListAllProductService {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  public async execute(keyword: string): Promise<IProductDocument[]> {
    const keyWord = keyword
      ? {
          name: {
            $regex: keyword,
            $options: 'i',
          },
        }
      : {};
    const products = await this.productRepository.listProducts(keyWord);
    return products;
  }
}

export default ListAllProductService;
