import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dbquery from '../db/queryHandler';
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

export async function authAdmin(req: Request, res: Response, next: NextFunction) {
  const writerId = req.body.writerId;
  const query = `SELECT writer_isadmin FROM writers WHERE id_writer = ${writerId}`;

  const dbresponse = await dbquery(query);
  console.log(dbresponse.result);

  if (dbresponse.err || !dbresponse.result.length)
    return res.status(404).json({ error: "Writer doesn't exist" });

  req.body.writerIsAdmin = dbresponse.result[0].writer_isadmin;
  next();
}