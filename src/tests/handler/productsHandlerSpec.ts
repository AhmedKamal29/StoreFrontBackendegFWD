import supertest from 'supertest';
import { StoreProducts } from '../../models/products';
import app from '../../server';

const request = supertest(app);
const store = new StoreProducts();

describe('Testing Products Handler', () => {
  it('Show a list of all products', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(await store.index());
  });
  // it('should create a new product', async () => {
  //   const user = {
  //     fname: 'ahmed',
  //     lname: 'kamal',
  //     PasswordDigest: 'Password',
  //   };
  //   const token = await request.post('/users/Login').send(user);

  //   const response = await request
  //     .post('/products/add')
  //     .set({
  //       authorization: token.body.token,
  //     })
  //     .send({
  //       productName: 'iphone 12',
  //       productPrice: 800,
  //       productCategory: 'smartphone',
  //     });
  //   expect(response.status).toBe(201);
  //   expect(response.body).toEqual({
  //     id: 1,
  //     productName: 'iphone 12',
  //     productPrice: '800',
  //     productCategory: 'smartphone',
  //   });
  // });

  it('should fail to create a new product', async () => {
    const response = await request.post('/products/add').send({
      productName: 'iphone 12',
      productPrice: 800,
      productCategory: 'smartphone',
    });
    expect(response.status).toBe(401);
  });
  it('should show a product when', async () => {
    const response = await request.get('/products/product/1');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(await store.show(1));
  });
});
