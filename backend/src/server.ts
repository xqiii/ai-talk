import express, { Request, Response } from 'express';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import { config } from './config/default';
import { corsMiddleware } from './middleware/cors';
import { logger } from './middleware/logger';
import { errorHandler } from './middleware/errorHandler';
import routes from './routes';

const app = express();

// 安全中间件
app.use(helmet());

// CORS
app.use(corsMiddleware);

// 日志
app.use(logger);

// 请求解析
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// API路由
app.use('/api', routes);

// 根路径
app.get('/', (_req: Request, res: Response) => {
  res.json({
    message: 'AI Talk Backend API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      chat: '/api/chat/*',
      models: '/api/models/*',
      config: '/api/config/*',
    },
  });
});

// 错误处理
app.use(errorHandler);

// 启动服务器
app.listen(config.port, () => {
  console.log(`
╔════════════════════════════════════════╗
║   AI Talk Backend Server               ║
║                                        ║
║   🚀 Server running on port ${config.port}     ║
║   🌍 Environment: ${config.nodeEnv.padEnd(18)} ║
║   🔗 CORS Origin: ${config.corsOrigin.padEnd(18)} ║
║   🤖 Ollama URL: ${config.ollamaBaseUrl.padEnd(19)} ║
╚════════════════════════════════════════╝
  `);
});

// 优雅关闭
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});

