import { Request, Response, NextFunction } from 'express';
import AsyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

interface ITokenPayload {
  id: string;
  iat: number;
  exp: number;
}
export const protect = AsyncHandler(
  async (request: Request, response: Response, next: NextFunction) => {
    let token;

    if (
      request.headers.authorization &&
      request.headers.authorization.startsWith('Bearer')
    ) {
      try {
        token = request.headers.authorization.split(' ')[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default');

        const { id } = decoded as ITokenPayload;

        request.userId = id;

        next();
      } catch (error) {
        console.error(error);
        response.status(401);
        throw new Error('Not authorized, token failed');
      }
    }

    if (!token) {
      response.status(401);
      throw new Error('Not authorized, no token');
    }
  }
);
