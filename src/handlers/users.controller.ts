import express, { Request, Response } from 'express';
import { StoreUsers } from '../models/users';
import jwt from 'jsonwebtoken';
// import { verifyAuth } from '../middleware/jwt';

const store = new StoreUsers();

const CreateNewUser = async (req: Request, res: Response) => {
  try {
    const user = {
      FName: req.body.fname,
      LName: req.body.lname,
      PasswordDigest: req.body.password_digest,
    };
    const newUser = await store.create(user);
    jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
    res.json({ newUser });
  } catch (error) {
    res.status(500).json({ message: 'wait' });
  }
};

const users = (app: express.Application) => {
  app.post('/users/signUp', CreateNewUser);
};
export default users;
