import client from '../pgdb';

describe('Database connection test', () => {
  it('connect successfully to database', async () => {
    const connection = await client.connect();
    expect(connection).toBeTruthy();
    connection.release();
  });
});
