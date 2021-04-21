import express from 'express';
import ProductController from '../controllers/ProductController';
import asyncHandler from 'express-async-handler';
import { protect, admin } from '../middleware/AuthenticationMiddleware';
const productRouter = express.Router();
const productController = new ProductController();

// @desc       Fetch all products
// @route      GET /api/products
// @access     Public
productRouter.get('/', asyncHandler(productController.getProducts));

// @desc       Fetch single products
// @route      GET /api/products/:id
// @access     Public
productRouter.get('/:id', asyncHandler(productController.getProductById));

productRouter.post(
  '/',
  protect,
  admin,
  asyncHandler(productController.createProduct)
);

productRouter.put(
  '/:id',
  protect,
  admin,
  asyncHandler(productController.updateProduct)
);

productRouter.delete('/:id', protect, admin, productController.deleteProduct);

export default productRouter;
