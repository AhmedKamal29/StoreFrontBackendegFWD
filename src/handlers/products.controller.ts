import express, { Request, Response } from 'express';
import { StoreProducts } from '../models/products';
import { verifyAuth } from '../middleware/jwt';

const store = new StoreProducts();
const GetAllProducts = async (_req: Request, res: Response) => {
  try {
    const result = await store.index();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const ShowSpacificProduct = async (req: Request, res: Response) => {
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

const CreateNewProduct = async (req: Request, res: Response) => {
  try {
    const product = {
      productName: req.body.productName,
      productPrice: req.body.productPrice,
      productCategory: req.body.productCategory,
    };

    const result = await store.create(product);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const product = await store.show(parseInt(req.params['id']));
    if (product === null) {
      res.status(404).json({ message: 'no such product exist' });
    } else {
      await store.delete(parseInt(req.params['id']));
      res.status(200).json({ message: 'deleted successfully' });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const products = (app: express.Application) => {
  app.get('/products', GetAllProducts);
  app.get('/products/product/:id', ShowSpacificProduct);
  app.post('/products/add', verifyAuth, CreateNewProduct);
  app.delete('/products/product/delete/:id', deleteProduct);
};

export default products;
