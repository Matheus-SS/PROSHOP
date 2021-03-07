import express from 'express';
import ProductController from '../controllers/ProductController';
import asyncHandler from 'express-async-handler';

const productRouter = express.Router();
const productController = new ProductController();

// @desc       Fetch all products
// @route      GET /api/products
// @access     Public
productRouter.get('/', asyncHandler(productController.getProducts));

// @desc       Fetch single products
// @route      GET /api/products/:id
// @access     Public
productRouter.get('/:id', productController.getProductById);

export default productRouter;
