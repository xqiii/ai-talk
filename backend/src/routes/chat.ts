import { Router, Request, Response } from 'express';
import { ModelFactory } from '../services/modelFactory';
import { ChatRequest } from '../types/chat';

const router = Router();

// 流式对话接口
router.post('/stream', async (req: Request, res: Response) => {
  try {
    const { messages, model, provider, temperature, maxTokens, apiKey } =
      req.body as ChatRequest & { apiKey?: string };

    if (!messages || !model || !provider) {
      res.status(400).json({
        error: 'Missing required fields: messages, model, or provider',
      });
      return;
    }

    // 设置SSE headers
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');

    const aiService = ModelFactory.getService(provider, apiKey);

    const stream = aiService.createChatStream(messages, model, {
      temperature,
      maxTokens,
    });

    for await (const chunk of stream) {
      res.write(`data: ${JSON.stringify(chunk)}\n\n`);
      
      if (chunk.done) {
        break;
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error: any) {
    console.error('Chat stream error:', error);
    res.write(
      `data: ${JSON.stringify({
        error: error.message || 'Unknown error',
        done: true,
      })}\n\n`
    );
    res.end();
  }
});

// 停止生成（客户端断开连接即可）
router.post('/stop', (_req: Request, res: Response) => {
  res.json({ success: true, message: 'Stream stopped' });
});

export default router;

