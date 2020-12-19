import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
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

writersController.get("/", async (req: Request, res: Response) => {
  const query = `
    SELECT
      id_writer,
      writer_name,
      writer_avatar,
      writer_email,
      writer_linkedin,
      writer_github,
      writer_twitter,
      writer_bio,
      writer_title,
      writer_website
    FROM writers`;

  const dbresponse = await dbquery(query);

  if (dbresponse.err || !dbresponse.result.length)
    return res.status(404).json({ error: "No writers where found" });

  res.status(200).json(dbresponse.result);
});

writersController.get("/:id", async (req: Request, res: Response) => {
  const { id } = req.params;

  const query = `
      SELECT
        id_writer,
        writer_name,
        writer_avatar,
        writer_email,
        writer_linkedin,
        writer_github,
        writer_twitter,
        writer_bio,
        writer_title,
        writer_website
      FROM writers
      WHERE
        ${Number(id)
      ? `id_writer = ${id}`
      : `UPPER(writer_name) = UPPER('${id.replace(/-/g, ' ')}')`
    }`;

  const dbresponse = await dbquery(query);

  if (dbresponse.err || !dbresponse.result.length)
    return res.status(404).json({ error: "Writer does not exist" });

  res.status(200).json(dbresponse.result[0]);
});

writersController.put("/change_info", authWriter, async (req: Request, res: Response) => {
  const {
    writerId,
    name,
    avatar,
    email,
    linkedin,
    github,
    twitter,
    bio,
    title,
    website,
    newPassword,
    confirmPassword,
    currentPassword
  } = req.body;

  
});

export default writersController;