import express from 'express';
const orderRouter = express.Router();

import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
} from '../controllers/orderController';
import { protect } from '../middleware/AuthenticationMiddleware';

orderRouter.post('/', protect, addOrderItems);
orderRouter.get('/myorders', protect, getMyOrders);
orderRouter.get('/:id', protect, getOrderById);
orderRouter.put('/:id/pay', protect, updateOrderToPaid);

export default orderRouter;
