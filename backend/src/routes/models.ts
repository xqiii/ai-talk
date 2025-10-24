import { Router, Request, Response } from 'express';
import { ModelFactory } from '../services/modelFactory';
import { OllamaService } from '../services/ollama/OllamaService';
import { ModelInfo } from '../types/model';

const router = Router();

// 获取本地模型列表（Ollama）
router.get('/local', async (_req: Request, res: Response) => {
  try {
    const ollamaService = ModelFactory.getService('ollama') as OllamaService;
    const models = await ollamaService.listModels();

    const formattedModels: ModelInfo[] = models.map((model: any) => ({
      id: model.name,
      name: model.name,
      provider: 'ollama' as const,
      size: model.size ? `${(model.size / 1024 / 1024 / 1024).toFixed(2)} GB` : undefined,
      modifiedAt: model.modified_at ? new Date(model.modified_at) : undefined,
    }));

    res.json(formattedModels);
  } catch (error: any) {
    console.error('Error fetching local models:', error);
    res.status(500).json({ error: error.message });
  }
});

// 获取远程模型列表
router.get('/remote', async (req: Request, res: Response) => {
  try {
    const { provider, apiKey } = req.query;

    if (!provider || typeof provider !== 'string') {
      res.status(400).json({ error: 'Provider is required' });
      return;
    }

    if (provider !== 'openai' && provider !== 'claude') {
      res.status(400).json({ error: 'Invalid provider' });
      return;
    }

    const aiService = ModelFactory.getService(
      provider,
      apiKey as string | undefined
    );
    const models = await aiService.listModels();

    const formattedModels: ModelInfo[] = models.map((model: any) => ({
      id: model.id || model.name,
      name: model.name || model.id,
      provider: provider as any,
      description: model.description,
    }));

    res.json(formattedModels);
  } catch (error: any) {
    console.error('Error fetching remote models:', error);
    res.status(500).json({ error: error.message });
  }
});

// 下载模型（Ollama）
router.post('/pull', async (req: Request, res: Response) => {
  try {
    const { modelName } = req.body;

    if (!modelName) {
      res.status(400).json({ error: 'Model name is required' });
      return;
    }

    const ollamaService = ModelFactory.getService('ollama') as OllamaService;
    await ollamaService.pullModel(modelName);

    res.json({ success: true, message: `Model ${modelName} pulled successfully` });
  } catch (error: any) {
    console.error('Error pulling model:', error);
    res.status(500).json({ error: error.message });
  }
});

// 验证连接
router.post('/validate', async (req: Request, res: Response) => {
  try {
    const { provider, apiKey } = req.body;

    if (!provider) {
      res.status(400).json({ error: 'Provider is required' });
      return;
    }

    const aiService = ModelFactory.getService(provider, apiKey);
    const isValid = await aiService.validateConnection();

    res.json({ valid: isValid });
  } catch (error: any) {
    console.error('Error validating connection:', error);
    res.json({ valid: false, error: error.message });
  }
});

export default router;

