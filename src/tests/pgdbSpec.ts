import client from '../pgdb';

describe('Database', () => {
  it('should connect', async () => {
    const conn = await client.connect();
    expect(conn).toBeTruthy();
    conn.release();
  });
});
