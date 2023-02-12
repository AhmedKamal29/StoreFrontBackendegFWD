import express, { Request, Response } from 'express';
import { StoreUsers, User } from '../models/users';
import jwt from 'jsonwebtoken';
// import { verifyAuth } from '../middleware/jwt';

const store = new StoreUsers();
const GetAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};
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
    res.status(500).json({ message: error });
  }
};
const AuthUser = async (req: Request, res: Response) => {
  const newUser: User = {
    FName: req.body.fname,
    LName: req.body.lname,
    PasswordDigest: req.body.password_digest,
  };
  try {
    const user = await store.authenticate(newUser);
    if (user) {
      const token = jwt.sign(
        { user: user },
        process.env.TOKEN_SECRET as string
      );
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const users = (app: express.Application) => {
  app.get('/users', GetAllUsers);
  app.post('/users/signUp', CreateNewUser);
  app.post('/users/Login', AuthUser);
};
export default users;
