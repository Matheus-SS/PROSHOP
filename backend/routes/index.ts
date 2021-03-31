import { Router } from 'express';
import productRouter from './productRoutes';
import userRouter from './userRoutes';
import shippingAddressRouter from './shippingAddressRoutes';
import passwordRouter from './passwordRoutes';
import orderRouter from './orderRoutes';

const routes = Router();

routes.use('/api/products', productRouter);
routes.use('/api/users', userRouter);
routes.use('/api/address', shippingAddressRouter);
routes.use('/api/password', passwordRouter);
routes.use('/api/orders', orderRouter);

export default routes;
