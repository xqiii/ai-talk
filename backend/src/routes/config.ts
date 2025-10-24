import { Router, Request, Response } from 'express';

const router = Router();

// 存储API Keys（内存存储，生产环境应使用数据库并加密）
const apiKeys: Map<string, string> = new Map();

// 保存API Key
router.post('/apikey', (req: Request, res: Response) => {
  try {
    const { provider, apiKey } = req.body;

    if (!provider || !apiKey) {
      res.status(400).json({ error: 'Provider and apiKey are required' });
      return;
    }

    // 在生产环境中应该加密存储
    apiKeys.set(provider, apiKey);

    res.json({ success: true, message: 'API key saved successfully' });
  } catch (error: any) {
    console.error('Error saving API key:', error);
    res.status(500).json({ error: error.message });
  }
});

// 获取API Key状态（不返回实际的key）
router.get('/apikey/:provider', (req: Request, res: Response) => {
  try {
    const { provider } = req.params;
    const hasKey = apiKeys.has(provider);

    res.json({
      provider,
      configured: hasKey,
      // 只返回前几个字符作为提示
      preview: hasKey
        ? `${apiKeys.get(provider)?.substring(0, 10)}...`
        : undefined,
    });
  } catch (error: any) {
    console.error('Error getting API key status:', error);
    res.status(500).json({ error: error.message });
  }
});

// 删除API Key
router.delete('/apikey/:provider', (req: Request, res: Response) => {
  try {
    const { provider } = req.params;
    apiKeys.delete(provider);

    res.json({ success: true, message: 'API key removed successfully' });
  } catch (error: any) {
    console.error('Error removing API key:', error);
    res.status(500).json({ error: error.message });
  }
});

// 用户偏好设置（简单的内存存储）
let userPreferences: any = {
  theme: 'light',
  defaultModel: undefined,
  defaultProvider: 'ollama',
  temperature: 0.7,
  maxTokens: 2048,
};

// 保存用户偏好
router.post('/preferences', (req: Request, res: Response) => {
  try {
    userPreferences = { ...userPreferences, ...req.body };
    res.json({ success: true, preferences: userPreferences });
  } catch (error: any) {
    console.error('Error saving preferences:', error);
    res.status(500).json({ error: error.message });
  }
});

// 获取用户偏好
router.get('/preferences', (_req: Request, res: Response) => {
  try {
    res.json(userPreferences);
  } catch (error: any) {
    console.error('Error getting preferences:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;

