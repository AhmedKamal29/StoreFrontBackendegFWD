import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';

const app: express.Application = express();
const port: string = '3000';
const url: string = `https://localhost:${port}`;

app.use(bodyParser.json());

app.get('/', (req: Request, res: Response) => {
  res.send('the project begins here');
});

app.listen(3000, () => {
  console.log(`starting app on: ${url}`);
});
