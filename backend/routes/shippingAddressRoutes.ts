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
shippingAddressRouter.get(
  '/',
  protect,
  asyncHandler(shippingController.getUserShippingAddress)
);
shippingAddressRouter.put(
  '/',
  protect,
  asyncHandler(shippingController.updateShippingAddress)
);

export default shippingAddressRouter;
