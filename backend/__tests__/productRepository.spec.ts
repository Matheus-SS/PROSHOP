import MockProductRepository from '../repositories/mocks/mockProductRepository';
import ListAllProductService from '../services/products/ListAllProductsService';
import ListProductByIdService from '../services/products/ListProductByIdService';

let mockProductRepository: MockProductRepository;
let listAllProduct: ListAllProductService;
let listProductById: ListProductByIdService;

beforeEach(() => {
  mockProductRepository = new MockProductRepository();

  listAllProduct = new ListAllProductService(mockProductRepository);
  listProductById = new ListProductByIdService(mockProductRepository);
});

describe('ListAllProducs', () => {
  it('should be able to list all products', async () => {
    const expectedUsers = [
      {
        user: 'test',
        name: 'Airpods Wireless Bluetooth Headphones',
        image: '/images/airpods.jpg',
        description:
          'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
        brand: 'Apple',
        category: 'Electronics',
        price: 89.99,
        countInStock: 10,
        rating: 4.5,
        numReviews: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await listAllProduct.execute();
    expect(expectedUsers).toEqual(expectedUsers);
  });

  it('should be able to list a unique product', async () => {
    const expectedUsers = [
      {
        _id: '1',
        user: 'test',
        name: 'Airpods Wireless Bluetooth Headphones',
        image: '/images/airpods.jpg',
        description:
          'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
        brand: 'Apple',
        category: 'Electronics',
        price: 89.99,
        countInStock: 10,
        rating: 4.5,
        numReviews: 12,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: '2',
        user: 'test',
        name: 'iPhone 11 Pro 256GB Memory',
        image: '/images/phone.jpg',
        description:
          'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
        brand: 'Apple',
        category: 'Electronics',
        price: 599.99,
        countInStock: 7,
        rating: 4.0,
        numReviews: 8,
      },
    ];
    const product = await listProductById.execute('1');
    expect(product).toEqual(expectedUsers[0]);
  });
});
