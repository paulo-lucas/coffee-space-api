import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.json';

export function authWriter(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ error: 'No token provided' });

  const parts: Array<string> = authHeader.split(' ');

  if (parts.length !== 2)
    return res.status(401).json({ error: 'Token error' });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).json({ error: 'Token malformatted' });

  jwt.verify(token, authConfig.secret, (err, decoded: any) => {
    if (err)
      return res.status(401).json({ error: 'Token invalid' });

    req.body.writerId = decoded.id;
    return next();
  })
}