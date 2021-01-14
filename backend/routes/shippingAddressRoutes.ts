import express from 'express';
import {
  createShippingAddress,
  getUserShippingAddress,
  updateShippingAddress,
} from '../controllers/ShippingAddressController';
import { protect } from '../middleware/AuthenticationMiddleware';
const shippingAddressRouter = express.Router();

shippingAddressRouter.post('/', protect, createShippingAddress);
shippingAddressRouter.get('/', protect, getUserShippingAddress);
shippingAddressRouter.put('/', protect, updateShippingAddress);

export default shippingAddressRouter;
