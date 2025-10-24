import ollama from 'ollama';
import { AIService } from '../base/AIService';
import { Message, StreamChunk } from '../../types/chat';
import { config } from '../../config/default';

export class OllamaService extends AIService {
  private baseUrl: string;

  constructor() {
    super();
    this.baseUrl = config.ollamaBaseUrl;
    // Configure ollama client
    process.env.OLLAMA_HOST = this.baseUrl;
  }

  async listModels() {
    try {
      const response = await ollama.list();
      return response.models || [];
    } catch (error) {
      console.error('Error listing Ollama models:', error);
      return [];
    }
  }

  async *createChatStream(
    messages: Message[],
    model: string,
    options?: {
      temperature?: number;
      maxTokens?: number;
    }
  ): AsyncGenerator<StreamChunk, void, unknown> {
    try {
      const stream = await ollama.chat({
        model,
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        stream: true,
        options: {
          temperature: options?.temperature,
          num_predict: options?.maxTokens,
        },
      });

      for await (const chunk of stream) {
        yield {
          content: chunk.message.content,
          done: chunk.done,
        };
      }
    } catch (error: any) {
      console.error('Error in Ollama chat stream:', error);
      throw new Error(
        `Ollama chat error: ${error.message || 'Unknown error'}`
      );
    }
  }

  async validateConnection(): Promise<boolean> {
    try {
      await ollama.list();
      return true;
    } catch (error) {
      console.error('Ollama connection failed:', error);
      return false;
    }
  }

  async pullModel(modelName: string): Promise<void> {
    try {
      const stream = await ollama.pull({
        model: modelName,
        stream: true,
      });

      for await (const chunk of stream) {
        console.log('Pull progress:', chunk);
      }
    } catch (error: any) {
      throw new Error(`Failed to pull model: ${error.message}`);
    }
  }
}

