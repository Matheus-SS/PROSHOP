import { Router } from 'express';
import productRouter from './productRoutes';
import userRouter from './userRoutes';
import shippingAddressRouter from './shippingAddressRoutes';
import passwordRouter from './passwordRoutes';

const routes = Router();

routes.use('/api/products', productRouter);
routes.use('/api/users', userRouter);
routes.use('/api/address', shippingAddressRouter);
routes.use('/api/password', passwordRouter);

export default routes;
