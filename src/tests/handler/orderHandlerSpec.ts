/* eslint-disable camelcase */
import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe('Order Route', (): void => {
  it('should return all orders for a user', async (): Promise<void> => {
    const user = {
      fname: 'ahmed',
      lname: 'kamal',
      PasswordDigest: 'Password',
    };
    await request.post('/users/signUp').send(user);
    const token = await request.post('/users/Login').send(user);
    const response = await request.get('/orders/user/1').set({
      authorization: token.body.token,
    });
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should add an order to the database and return it', async (): Promise<void> => {
    const order = {
      user_id: 1,
      order_status: false,
    };
    const user = {
      fname: 'ahmed',
      lname: 'kamal',
      PasswordDigest: 'Password',
    };
    await request.post('/users/signUp').send(user);
    const token = await request.post('/users/Login').send(user);
    const response = await request
      .post('/orders/user')
      .set({
        authorization: token.body.token,
      })
      .send(order);

    expect(response.status).toBe(200);
  });

  it('should return an array of complete orders based on the user id', async (): Promise<void> => {
    const user = {
      fname: 'ahmed',
      lname: 'kamal',
      PasswordDigest: 'Password',
    };

    await request.post('/users/signUp').send(user);
    const token = await request.post('/users/Login').send(user);
    const response = await request.get('/orders/user/completed/1').set({
      authorization: token.body.token,
    });
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
