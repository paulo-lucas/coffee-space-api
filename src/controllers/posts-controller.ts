import { Request, Response, Router } from 'express';
import dbquery from '../db/query-handler';

const articlesRouter = Router();

articlesRouter.get('/:id', async (req: Request, res: Response) => {
  const { id } = req.params;

  const selectQuery = `
  select * from v_posts_with_tags
  where
    ${Number(id)
      ? `post_id = ${id}`
      : `upper(post_title) = upper('${id.replace(/-/g, ' ')}')`
    }`;

  const updateViewsQuery = `update posts set post_views = post_views + 1`;

  const dbResponse = await dbquery(selectQuery);

  if (dbResponse.err || !dbResponse.result.length)
    return res.status(404).json({ error: 'Post does not exist' });

  res.status(200).json(dbResponse.result[0]);

  dbquery(updateViewsQuery);
});

articlesRouter.post('/', async (req: Request, res: Response) => {
  const pagingRef = 5;

  const { tag, page } = req.query;
  const { search } = req.body;

  if (page && !Number(page))
    return res.status(400).send({ Message: "Parameter 'page' is not a valid number" });


  const query = `
  select * from v_posts_with_tags
  where 
    1 = 1
    ${tag
      ? `and tag_ids like '%${tag}%'`
      : ''
    }
    ${search
      ? `and (post_title like '%${search}%' or post_content like '%${search}%')`
      : ''
    }
    ${page && Number(page) > 1
      ? `limit ${pagingRef * (Number(page) - 1)}, ${pagingRef}`
      : `limit ${pagingRef}`
    }
  `;

  const dbResponse = await dbquery(query);

  res.status(200).json(dbResponse.result);
});

export default articlesRouter;