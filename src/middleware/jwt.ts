import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = (req.headers.authorization ||
      req.headers.Authorization ||
      '') as string;
    console.log(`auth header: ${authorizationHeader}`);

    const token = authorizationHeader.split(' ')[1];
    jwt.verify(token, process.env.TOKEN_SECRET as string);
    res.locals.userId = (jwt.decode(token) as jwt.JwtPayload)?.user.id;
    next();
  } catch (error) {
    res
      .status(500)
      .send(
        `sorry an error has been caused from our end its not your fault 😉 :  ${error}`
      );
  }
};

// try {
//   const authHeader = req.get('Authorization');
//   console.log(authHeader);

//   const token = jwt.verify(
//     req.headers['authorization'] as unknown as string,
//     process.env.TOKEN_SECRET as string
//   );
//   console.log(token);

//   if (token) {
//     next();
//   } else {
//     res.status(401).send('Unauthorized access');
//   }
// }
