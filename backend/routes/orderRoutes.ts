import express from 'express';
const orderRouter = express.Router();

import { addOrderItems, getOrderById } from '../controllers/orderController';
import { protect } from '../middleware/AuthenticationMiddleware';

orderRouter.post('/', protect, addOrderItems);
orderRouter.get('/:id', protect, getOrderById);

export default orderRouter;
