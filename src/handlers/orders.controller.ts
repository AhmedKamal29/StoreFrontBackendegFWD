/* eslint-disable camelcase */
import express, { Request, Response } from 'express';
import { StoreOrders } from '../models/orders';
import { verifyAuth } from '../middleware/jwt';

const store = new StoreOrders();
const GetAllOrders = async (_req: Request, res: Response) => {
  try {
    const result = await store.index();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const GetUserOrder = async (req: Request, res: Response) => {
  try {
    const result = await store.show(parseInt(req.params['id']));
    if (result === null) {
      res.status(404).json({ message: 'Order not found' });
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const CreateNewOrder = async (req: Request, res: Response) => {
  try {
    const order = {
      user_id: req.body.user_id,
      order_status: req.body.order_status,
    };
    const result = await store.create(order);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const AddProductsToOrder = async (req: Request, res: Response) => {
  try {
    const order_product = {
      order_id: req.body.order_id,
      product_id: req.body.product_id,
      products_orderd_quantity: req.body.products_orderd_quantity,
    };
    const result = await store.addProducts(order_product);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const GetUserCompletedOrder = async (req: Request, res: Response) => {
  try {
    const result = await store.showCompleted(parseInt(req.params['id']));
    if (result === null) {
      res.status(404).json({ message: 'Order not found' });
    } else {
      res.json(result);
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const orders = (app: express.Application) => {
  app.get('/orders', GetAllOrders);
  app.get('/orders/user/:id', verifyAuth, GetUserOrder);
  app.post('/orders/user', CreateNewOrder);
  app.post('/orders/product/add', verifyAuth, AddProductsToOrder);
  app.get('/orders/user/completed/:id', verifyAuth, GetUserCompletedOrder);
};

export default orders;
