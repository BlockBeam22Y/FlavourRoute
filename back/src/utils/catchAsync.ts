import { Request, Response, NextFunction } from 'express';
import CustomError from './customError';

const catchAsync = (controller: (req: Request, res: Response) => Promise<void>) => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    controller(req, res)
      .catch((err: CustomError) => {
        next(err);
      });
  };
};

export default catchAsync;