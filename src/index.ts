import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';

const app = express();

dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('hello, world');
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`server run on port ${process.env.PORT}`);
});
