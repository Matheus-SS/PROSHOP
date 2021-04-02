import 'dotenv/config';

import express, { Request, Response } from 'express';
import 'colorts/lib/string';
import { notFound, errorHandler } from './middleware/ErrorMiddleware';
import connectDB from './config/database';
import path from 'path';
import routes from './routes';
import './controllers/ProductController';
import { admin } from './middleware/AuthenticationMiddleware';
connectDB();

const app = express();

app.use(express.json());

app.use(routes);

const __dirname = path.resolve();

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')));

  app.get('*', (request: Request, response: Response) =>
    response.sendFile(
      path.resolve(__dirname, 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (request: Request, response: Response) => {
    response.send('API is running...');
  });
}

// PAYPAL

app.get('/api/config/paypal', (request: Request, response: Response) => {
  response.send(process.env.PAYPAL_CLIENT_ID);
});

// handling with status error 404
app.use(notFound);

// handling with status error 500
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});
