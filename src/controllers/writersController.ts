import { Request, Response, Router } from 'express';
import jwt from   'jsonwebtoken';
import bcrypt from 'bcrypt';
import dbquery from '../db/queryHandler';
import { authWriter } from '../middlewares/authentication';
import authConfig from '../config/auth.json';

const writersController = Router();

function generateToken(params: Object) {
  return jwt.sign(params, authConfig.secret, {
      expiresIn: 259200
  });
}

writersController.post("/auth", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const selectQuery = `SELECT id_writer, writer_name ,writer_password FROM writers WHERE writer_email = '${email}'`;
  const selectDBResponse = await dbquery(selectQuery);
console.log(selectDBResponse)
  if (!selectDBResponse.result.length)
    return res.status(400).json({ error: "Writer not found" });

  const writer: any = selectDBResponse.result[0];

  if (!await bcrypt.compare(password, writer.writer_password))
    return res.status(400).json({ error: "Invalid Password" });

  writer.writer_password = undefined;

  return res.status(200).json({
    writer,
    token: generateToken({ id: writer.id_writer })
  });
});

writersController.get("/token", authWriter, (req: Request, res: Response) => {
  const { writerId } = req.body;

  return res.status(200).json({
    token: generateToken({ id: writerId })
  });
});

writersController.get("/index", (req: Request, res: Response) => {

});

writersController.get("/:id", (req: Request, res: Response) => {

});

export default writersController;