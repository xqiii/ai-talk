import OpenAI from 'openai';
import { AIService } from '../base/AIService';
import { Message, StreamChunk } from '../../types/chat';

export class OpenAIService extends AIService {
  private client: OpenAI;

  constructor(apiKey: string) {
    super();
    this.client = new OpenAI({
      apiKey: apiKey,
    });
  }

  async listModels() {
    try {
      const models = await this.client.models.list();
      return models.data
        .filter((model) => model.id.startsWith('gpt'))
        .map((model) => ({
          id: model.id,
          name: model.id,
          created: model.created,
        }));
    } catch (error) {
      console.error('Error listing OpenAI models:', error);
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
      const stream = await this.client.chat.completions.create({
        model,
        messages: messages.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        stream: true,
        temperature: options?.temperature,
        max_tokens: options?.maxTokens,
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || '';
        const done = chunk.choices[0]?.finish_reason !== null;

        if (content || done) {
          yield {
            content,
            done,
          };
        }
      }
    } catch (error: any) {
      console.error('Error in OpenAI chat stream:', error);
      throw new Error(
        `OpenAI chat error: ${error.message || 'Unknown error'}`
      );
    }
  }

  async validateConnection(): Promise<boolean> {
    try {
      await this.client.models.list();
      return true;
    } catch (error) {
      console.error('OpenAI connection failed:', error);
      return false;
    }
  }
}

