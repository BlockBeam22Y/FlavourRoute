import { Request, Response, NextFunction } from 'express';
import IController from '../interfaces/IController';
import IError from '../interfaces/IError';

const catchAsync = (controller: IController): IController => {
  return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    controller(req, res, next)
      .catch((err: IError) => {
        next(err);
      });
  };
};

export default catchAsync;