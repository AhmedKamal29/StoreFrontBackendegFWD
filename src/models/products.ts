import client from '../pgdb';

export type Product = {
  id: number;
  product_name: string;
  product_price: number;
  Product_category: string;
};
