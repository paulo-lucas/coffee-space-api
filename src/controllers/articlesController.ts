import { Request, Response, Router } from 'express';
import dbquery from '../db/queryHandler';
import { authWriter } from '../middlewares/authentication';

const articlesRouter = Router();

articlesRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const selectQuery = Number(id)
    ? `SELECT * FROM v_article_writer_tags WHERE id_article = ${id}`
    : `SELECT * FROM v_article_writer_tags WHERE UPPER(article_title) = UPPER('${id.replace(/-/g, ' ')}')`;

  const updateQuery = `UPDATE articles SET article_views = article_views + 1`;

  const dbresponse = await dbquery(selectQuery);

  if (dbresponse.err || !dbresponse.result.length)
    return res.status(404).json({ error: "Article does not exist" });

  res.status(200).json(dbresponse.result);

  dbquery(updateQuery);
});

articlesRouter.post('/new', authWriter, async (req: Request, res: Response) => {
  const { title, content, banner, writerId } = req.body;
  
  if (!writerId || !title || !content)
    return res.status(400).json({ error: "Missing information " });

  const insertQuery = `INSERT INTO articles (id_writer, article_title, article_content, article_banner) VALUES (${writerId}, "${title}", "${content}", "${banner}")`;

  const dbresponse = await dbquery(insertQuery);

  if (dbresponse.err)
    return res.status(400).json({ error: "Could not create article" });

  res.status(201).json(dbresponse.result);
});

articlesRouter.put('/:articleId', authWriter, async (req: Request, res: Response) => {
  const { articleId } = req.params;
  const { title, content, banner, writerId } = req.body;

  if (!writerId || !articleId || !title || !content)
    return res.status(400).json({ error: "Missing information " });

  const selectQuery = `SELECT * FROM articles WHERE id_article = ${articleId} AND id_writer = ${writerId}`;

  const updateQuery = `UPDATE articles SET article_title = '${title}', article_content = '${content}', article_banner = ${banner} WHERE id_article = ${articleId} AND id_writer = ${writerId}`;

  const verifyDBResponse = await dbquery(selectQuery);

  if (verifyDBResponse.err)
    return res.status(406).json({ error: "Wrong id" });

  if (!verifyDBResponse.result.length)
    return res.status(401).json({ error: "Do not have permission to update this article" });

  const updateDBResponse = await dbquery(updateQuery);

  if (updateDBResponse.err)
    return res.status(400).json({ error: "Error on update" });

  res.status(200).json(updateDBResponse.result);
});

articlesRouter.delete('/:articleId', authWriter, async (req: Request, res: Response) => {
  const { articleId } = req.params;
  const { writerId } = req.body;
  
  if (!articleId || !writerId)
    return res.status(400).json({ error: "Missing information" });

  const selectQuery = `SELECT * FROM articles WHERE id_article = ${articleId} AND id_writer = ${writerId}`;

  const deleteQuery = `DELETE FROM articles  WHERE id_article = ${articleId} AND id_writer = ${writerId}`;

  const verifyDBResponse = await dbquery(selectQuery);

  if (verifyDBResponse.err)
    return res.status(406).json({ error: "Wrong id" });

  if (!verifyDBResponse.result.length)
    return res.status(401).json({ error: "Do not have permission to delete this article" });

  const deleteDBResponse = await dbquery(deleteQuery);

  if (deleteDBResponse.err)
    return res.status(400).json({ error: "Error on delete" });

  res.status(200).json(deleteDBResponse.result);
});

export default articlesRouter;