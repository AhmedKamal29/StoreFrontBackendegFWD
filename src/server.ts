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
  res.send(
    '<h2 style="text-align:center; margin:5%">Hello There 👋🏻 again ! <br> This is the second project in the nanodegree hope you enjoy the code <br> Launch postman and take this project for a spin 😉 </h2>'
  );
});

app.listen(port, () => {
  console.log(`starting app on: ${url}`);
});

export default app;
