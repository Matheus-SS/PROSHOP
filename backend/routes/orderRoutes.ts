import express from 'express';
const orderRouter = express.Router();

import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  getOrders,
  updateOrderToDelivered,
} from '../controllers/orderController';
import { protect, admin } from '../middleware/AuthenticationMiddleware';

orderRouter.post('/', protect, addOrderItems);
orderRouter.get('/myorders', protect, getMyOrders);
orderRouter.get('/', protect, admin, getOrders);
orderRouter.get('/:id', protect, getOrderById);
orderRouter.put('/:id/pay', protect, updateOrderToPaid);
orderRouter.put('/:id/deliver', protect, admin, updateOrderToDelivered);

export default orderRouter;
