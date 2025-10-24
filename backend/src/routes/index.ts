import { Router, Request, Response } from 'express';
import chatRoutes from './chat';
import modelsRoutes from './models';
import configRoutes from './config';

const router = Router();

router.use('/chat', chatRoutes);
router.use('/models', modelsRoutes);
router.use('/config', configRoutes);

// 健康检查
router.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

export default router;

