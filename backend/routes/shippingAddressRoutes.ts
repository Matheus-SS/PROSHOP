import express from 'express';
import asyncHandler from 'express-async-handler';

import ShippingAddressController from '../controllers/ShippingAddressController';
import { protect } from '../middleware/AuthenticationMiddleware';

const shippingAddressRouter = express.Router();
const shippingController = new ShippingAddressController();

shippingAddressRouter.post(
  '/',
  protect,
  asyncHandler(shippingController.createShippingAddress)
);
// shippingAddressRouter.get('/', protect, getUserShippingAddress);
// shippingAddressRouter.put('/', protect, updateShippingAddress);

export default shippingAddressRouter;
