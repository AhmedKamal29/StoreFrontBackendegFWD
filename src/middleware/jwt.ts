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
    } else {
      res.status(401).send('Unauthorized access');
    }
  } catch (error) {
    res
      .status(500)
      .send(
        `sorry an error has been caused from our end its not your fault 😉 :  ${error}`
      );
  }
};
