import Product, { IProductDocument } from '../../models/ProductModel';
import { IProductRepository } from '../../repositories/productRepository';

interface IRequest {
  keyword: string;
  pageNumber: number;
}

interface IResponse {
  products: IProductDocument[];
  currentPage: number;
  quantityPages: number;
}

class ListAllProductService {
  private productRepository: IProductRepository;

  constructor(productRepository: IProductRepository) {
    this.productRepository = productRepository;
  }

  public async execute(productData: IRequest): Promise<IResponse> {
    const itemsPerPage = 5;
    const currentPage = productData.pageNumber || 1;
    const keyWord =
      productData.keyword !== 'undefined'
        ? {
            name: {
              $regex: productData.keyword,
              $options: 'i',
            },
          }
        : {};

    const count = await Product.countDocuments({ ...keyWord });
    const products = await Product.find({ ...keyWord })
      .limit(itemsPerPage)
      .skip(itemsPerPage * (currentPage - 1));
    return {
      products,
      currentPage,
      quantityPages: Math.ceil(count / itemsPerPage),
    };
  }
}

export default ListAllProductService;
