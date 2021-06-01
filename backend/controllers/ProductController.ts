import { Request, Response } from 'express';
import Product from '../models/ProductModel';

import ProductRepository from '../repositories/productRepository';

import ListAllProductService from '../services/products/ListAllProductsService';
import ListProductByIdService from '../services/products/ListProductByIdService';

export default class ProductController {
  public async getProducts(
    request: Request,
    response: Response
  ): Promise<Response> {
    const getProducts = new ListAllProductService(new ProductRepository());
    const productData = {
      keyword: String(request.query.keyword),
      pageNumber: Number(request.query.pageNumber),
    };

    const { products, currentPage, quantityPages } = await getProducts.execute(
      productData
    );
    return response.status(200).json({ products, currentPage, quantityPages });
  }

  public async getProductById(
    request: Request,
    response: Response
  ): Promise<Response> {
    const getProductById = new ListProductByIdService(new ProductRepository());
    const product = await getProductById.execute(request.params.id);

    return response.status(200).json(product);
  }

  // @desc       Delete a product
  // @route      DELETE /api/products/:id
  // @access     Private/Admin
  public async deleteProduct(
    request: Request,
    response: Response
  ): Promise<Response> {
    const product = await Product.findById(request.params.id);

    if (product) {
      await product.remove();
      return response.json({ message: 'Product removed' });
    } else {
      response.status(404);
      throw new Error('Product not found');
    }
  }

  // @desc     create a product
  // @route    CREATE /api/products/
  // @access   Private/Admin

  public async createProduct(
    request: Request,
    response: Response
  ): Promise<Response> {
    const product = new Product({
      name: 'Sample name',
      price: 0,
      user: request.userId,
      image: '/images/sample.jpg',
      brand: 'Sample brand',
      category: 'Sample category',
      countInStock: 0,
      numReviews: 0,
      description: 'sample description',
    });

    const createdProduct = await product.save();
    return response.status(201).json(createdProduct);
  }

  // @desc     Update a product
  // @route    UPDATE /api/products/:id
  // @access   Private/Admin

  public async updateProduct(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { name, price, description, image, brand, category, countInStock } =
      request.body;

    const product = await Product.findById(request.params.id);

    if (product) {
      product.name = name;
      product.price = price;
      product.description = description;
      product.image = image;
      product.brand = brand;
      product.category = category;
      product.countInStock = countInStock;
    } else {
      response.status(404);
      throw new Error('Product not found');
    }

    const updatedProduct = await product.save();
    return response.status(201).json(updatedProduct);
  }

  // @desc     Get top rated products
  // @route    GET /api/products/top
  // @access   Public

  public async getTopProducts(
    request: Request,
    response: Response
  ): Promise<Response> {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);

    return response.status(200).json(products);
  }
}
