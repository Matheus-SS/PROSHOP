import 'dotenv/config';

import express, { Request, Response } from 'express';
import 'colorts/lib/string';
import { notFound, errorHandler } from './middleware/ErrorMiddleware';
import connectDB from './config/database';

import routes from './routes';

connectDB();

const app = express();

app.use(express.json());

app.get('/', (request: Request, response: Response) => {
  response.send('API is running...');
});

app.use(routes);

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
