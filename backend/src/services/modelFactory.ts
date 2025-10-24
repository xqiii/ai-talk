import { AIService } from './base/AIService';
import { OllamaService } from './ollama/OllamaService';
import { OpenAIService } from './openai/OpenAIService';
import { ClaudeService } from './claude/ClaudeService';
import { config } from '../config/default';

export class ModelFactory {
  private static instances: Map<string, AIService> = new Map();

  static getService(
    provider: 'ollama' | 'openai' | 'claude',
    apiKey?: string
  ): AIService {
    const key = `${provider}-${apiKey || 'default'}`;

    if (this.instances.has(key)) {
      return this.instances.get(key)!;
    }

    let service: AIService;

    switch (provider) {
      case 'ollama':
        service = new OllamaService();
        break;
      case 'openai':
        const openaiKey = apiKey || config.openaiApiKey;
        if (!openaiKey) {
          throw new Error('OpenAI API key is required');
        }
        service = new OpenAIService(openaiKey);
        break;
      case 'claude':
        const claudeKey = apiKey || config.anthropicApiKey;
        if (!claudeKey) {
          throw new Error('Claude API key is required');
        }
        service = new ClaudeService(claudeKey);
        break;
      default:
        throw new Error(`Unsupported provider: ${provider}`);
    }

    this.instances.set(key, service);
    return service;
  }

  static clearCache() {
    this.instances.clear();
  }
}

