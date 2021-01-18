import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

const routeLogger = logger('router');

export default function (req: Request, res: Response, next: NextFunction) {
  const { headers, url, method } = (req.connection as any).parser.incoming;
  routeLogger.info(`Host ${headers['host']} - user-agent ${headers['user-agent']} requested: ${method} ${url}`);
  next();
}