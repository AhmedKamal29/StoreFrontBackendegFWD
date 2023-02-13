import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = jwt.verify(
      req.headers['authorization'] as unknown as string,
      process.env.TOKEN_SECRET as string
    );
    if (token) {
      next();
    }
  } catch (error) {
    res.status(401).send('Access denied ⛔');
  }
};
