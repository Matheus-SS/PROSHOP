import ProductModel,{ IProductDocument } from '../../models/ProductModel';
import { IProductRepository } from '../productRepository';
const prod = new ProductModel();
Object.assign(prod, {
  _id:'1',
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
});

export default class ProductRepository implements IProductRepository {
  private product: IProductDocument[] = [prod];

  public async listProducts(): Promise<IProductDocument[]> {
    const products =  this.product;
    return products;
  }

  public async findProductById(id: string): Promise<IProductDocument | null> {
    const product =  this.product.find((product) => product._id === id) || null;
    return product;
  }
}
