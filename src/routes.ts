import { Router, Request, Response } from 'express';

import adminController from './controllers/adminController';
import writersController from './controllers/writersController';
import articlesController from './controllers/articlesController';

const router = Router();

router.use('/admin', adminController);
router.use('/writer', writersController);
router.use('/article', articlesController);

router.get('/', (req: Request, res: Response) => res.status(200).send("Api Coffee Space está online."));

export default router;