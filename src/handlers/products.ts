/* eslint-disable camelcase */
import express, { Request, Response } from 'express';
import { StoreProducts } from '../models/products';
import { verifyAuth } from '../middleware/jwt';

const store = new StoreProducts();

const index = async (_req: Request, res: Response) => {
  try {
    const result = await store.index();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const result = await store.show(parseInt(req.params['id']));
    if (result === null) {
      res.status(404).json({ message: 'Product not found' });
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product = {
      product_name: req.body.name,
      product_price: req.body.price,
      product_category: req.body.category,
    };

    const result = await store.create(product);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const products = (app: express.Application) => {
  app.get('/products', index);
  app.get('/products/product/:id', show);
  app.post('/products/add', verifyAuth, create);
};

export default products;
