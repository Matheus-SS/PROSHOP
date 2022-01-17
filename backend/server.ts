import 'dotenv/config';

import express, { Request, Response } from 'express';
import 'colorts/lib/string';
import { notFound, errorHandler } from './middleware/ErrorMiddleware';
import connectDB from './config/database';
import path from 'path';
import routes from './routes';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import swaggerFile from './swagger.json';
import cors from 'cors';
import cloudinary from 'cloudinary';

connectDB();

const app = express();
app.use(
  cors({
    origin: '*',
  })
);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());

//* config image storage cloud
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//* GENERATE SWAGGER UI
if (process.env.NODE_ENV === 'development') {
  app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerFile));
}
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

app.use(
  './uploads',
  express.static(path.join(__dirname, '/backend/uploads/compressed'))
);

//* PAYPAL
app.get('/api/config/paypal', (request: Request, response: Response) => {
  response.send(process.env.PAYPAL_CLIENT_ID);
});

//* handling with status error 404
app.use(notFound);

//* handling with status error 500
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});
