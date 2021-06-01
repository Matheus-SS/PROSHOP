// import MockProductRepository from '../../repositories/mocks/mockProductRepository';
// import ListAllProductService from  '../../services/products/ListAllProductsService';

// let mockProductRepository:MockProductRepository;
// let listAllProductService:ListAllProductService;

// describe('List all products', () => {
//   beforeEach(() =>{
//     mockProductRepository = new MockProductRepository();

//     listAllProductService = new ListAllProductService(mockProductRepository);
//   });

//   it('Should be able to list all products', async () => {
//     const products = await listAllProductService.execute();

//     products.forEach(product => {
//       expect(product._id).toBeTruthy(),
//       expect(product.name).toBeTruthy(),
//       expect(product.price).toBeTruthy()
//     })
//   });
// });
