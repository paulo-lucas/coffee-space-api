import { Router, Request, Response } from 'express';

import routeTrack from './middlewares/route-track';

import adminController from './controllers/admin-controller';
import postsController from './controllers/posts-controller';

const router = Router();

router.use(routeTrack);
router.use('/admin', adminController);
router.use('/posts', postsController);

router.get('/', (req: Request, res: Response) => res.status(200).send('Api Coffee Space está online.'));

export default router;