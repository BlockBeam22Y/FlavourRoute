import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './routes';
import path from 'path';
import CustomError from './utils/customError';

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use(router);

app.use((err: CustomError, req: Request, res: Response, next: NextFunction): void => {
  const errorData = err.data ?? new CustomError().data;

  res.status(errorData.statusCode).json({
    message: errorData.message(err.params),
    ...err.params
  });
})

export default app;