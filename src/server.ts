import express, { Request, Response } from 'express';
import cors from 'cors';
import products from './handlers/products';

const app: express.Application = express();
const port: number = 3000;
const url: string = `https://localhost:${port}`;
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

products(app);

app.get('/', (req: Request, res: Response) => {
  res.send('the project begins here');
});

app.listen(port, () => {
  console.log(`starting app on: ${url}`);
});

export default app;
