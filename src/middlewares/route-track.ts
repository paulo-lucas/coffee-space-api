import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const routeLogger = logger('router');

export default function (req: Request, res: Response, next: NextFunction) {
  // console.log(req);

  next();
}