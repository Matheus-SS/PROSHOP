import MockProductRepositoryService from '../../repositories/mocks/mockProductRepository';
import ListAllProductService from  '../../services/products/ListAllProductsService';

let mockProductRepository:MockProductRepositoryService;
let listAllProductService:ListAllProductService;

describe('List all products', () => {
  beforeEach(() =>{
    mockProductRepository = new MockProductRepositoryService;

    listAllProductService = new ListAllProductService(mockProductRepository);
  });

  it('Should be able to list all products', async () => {
    const products = await listAllProductService.execute();
    console.log(products)
    products.forEach(product => {
      expect(product._id).toBeTruthy(),
      expect(product.name).toBeTruthy(),
      expect(product.price).toBeTruthy()
    })
  });
});