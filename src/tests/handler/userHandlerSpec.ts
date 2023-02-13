import supertest from 'supertest';
import app from '../../server';
const request = supertest(app);

describe('User Route', (): void => {
  it('Should add a user to the database and return the data of the user along with the a JWT token', async (): Promise<void> => {
    const user = {
      fname: 'ahmed',
      lname: 'kamal',
      PasswordDigest: 'Password',
    };
    const response = await request.post('/users/signUp').send(user);
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should return all users', async (): Promise<void> => {
    const user = {
      fname: 'ahmed',
      lname: 'kamal',
      PasswordDigest: 'Password',
    };

    const token = await request.post('/users/Login').send(user);
    const response = await request.get('/users').set({
      authorization: token.body.token,
    });
    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('should return the requested user', async (): Promise<void> => {
    const user = {
      fname: 'ahmed',
      lname: 'kamal',
      PasswordDigest: 'Password',
    };

    const token = await request.post('/users/Login').send(user);
    const response = await request.get('/users/1').set({
      authorization: token.body.token,
    });
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(1);
  });

  it('should return a JWT token', async (): Promise<void> => {
    const user = {
      fname: 'ahmed',
      lname: 'kamal',
      PasswordDigest: 'Password',
    };

    const response = await request.post('/users/Login').send(user);
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });
  it('should add a product', async (): Promise<void> => {
    const product = {
      productName: 'iphone 12',
      productPrice: 800,
      productCategory: 'smartphone',
    };
    const user = {
      fname: 'ahmed',
      lname: 'kamal',
      PasswordDigest: 'Password',
    };

    const token = await request.post('/users/Login').send(user);
    const response = await request
      .post('/products/add')
      .set({
        authorization: token.body.token,
      })
      .send(product);

    expect(response.status).toBe(200);
  });
});
