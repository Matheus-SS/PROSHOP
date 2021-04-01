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

//@desc update order
//@route UPDATE /api/orders/:id/pay
//@access Private
export const updateOrderToPaid = asyncHandler(
  async (request: Request, response: Response) => {
    const order = await Order.findById(request.params.id);

    if (order) {
      order.isPaid = true;
      (order.paidAt = new Date()),
        (order.paymentResult = {
          id: request.body.id,
          status: request.body.status,
          update_time: request.body.update_time,
          email_address: request.body.payer.email_address,
        });

      const updatedOrder = await order.save();
      return response.json(updatedOrder);
    } else {
      response.status(404);
      throw new Error('Order not found');
    }
  }
);

//@desc Get logged in user orders
//@route GET /api/orders/myorders
//@access Private
export const getMyOrders = asyncHandler(
  async (request: Request, response: Response) => {
    const orders = await Order.find({ user: request.userId });

    response.json(orders);
  }
);
