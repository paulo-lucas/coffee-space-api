import { Router } from 'express';

import adminController from './controllers/adminController';
import writersController from './controllers/writersController';
import articlesController from './controllers/articlesController';

const router = Router();

router.use('/admin', adminController);
router.use('/writer', writersController);
router.use('/article', articlesController);

export default router;