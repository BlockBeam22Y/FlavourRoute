import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes';
import IError from './interfaces/IError';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use(router);

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.statusCode ?? 500).json({
    message: err.message
  });
})

export default app;