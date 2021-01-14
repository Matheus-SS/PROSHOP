import express from 'express';
import { getProductById, getProducts } from '../controllers/ProductController';
const productRouter = express.Router();

// @desc       Fetch all products
// @route      GET /api/products
// @access     Public
productRouter.get('/', getProducts);

// @desc       Fetch single products
// @route      GET /api/products/:id
// @access     Public
productRouter.get('/:id', getProductById);

export default productRouter;
