import { Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import dbquery from '../db/queryHandler';

const adminController = Router();

adminController.post("/writer/new", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "Missing information " });

  const selectQuery = `SELECT * FROM writers WHERE writer_name = '${name}' OR writer_email = '${email}'`;

  const selectDBResponse = await dbquery(selectQuery);

  if (selectDBResponse.result.length)
    return res.status(400).json({ error: "User already exists" });

  const encodedPassword = await bcrypt.hash(password, 10);

  const insertQuery = `INSERT INTO writers (writer_name, writer_email, writer_password) VALUES ('${name}', '${email}', '${encodedPassword}');`

  const insertDBResponse = await dbquery(insertQuery);

  if (insertDBResponse.err)
    return res.status(400).json({ error: "Could not create user" });

  res.status(201).json(insertDBResponse.result);
});

adminController.put("/writer/:writerId", (req: Request, res: Response) => {

});

adminController.delete("/writer/:writerId", (req: Request, res: Response) => {

});

export default adminController;