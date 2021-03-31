import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/OrderModel';

//@desc Create new order
//@route POST /api/orders
//@access Private

export const addOrderItems = asyncHandler(
  async (request: Request, response: Response) => {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = request.body;

    if (orderItems && orderItems.length === 0) {
      response.status(400);
      throw new Error('No order Items');
    } else {
      const order = new Order({
        orderItems,
        user: request.userId,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
      });

      const createdOrder = await order.save();

      return response.status(200).json(createdOrder);
    }
  }
);

//@desc get order by ID
//@route GET /api/orders/:id
//@access Private
export const getOrderById = asyncHandler(
  async (request: Request, response: Response) => {
    const order = await Order.findById(request.params.id).populate(
      'user',
      'name email'
    );

    if (order) {
      return response.json(order);
    } else {
      response.status(404);
      throw new Error('Order not found');
    }
  }
);
