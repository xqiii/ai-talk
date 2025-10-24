import Anthropic from '@anthropic-ai/sdk';
import { AIService } from '../base/AIService';
import { Message, StreamChunk } from '../../types/chat';

export class ClaudeService extends AIService {
  private client: Anthropic;

  constructor(apiKey: string) {
    super();
    this.client = new Anthropic({
      apiKey,
    });
  }

  async listModels() {
    // Anthropic doesn't have a models list API, return predefined models
    return [
      { id: 'claude-3-opus-20240229', name: 'Claude 3 Opus' },
      { id: 'claude-3-sonnet-20240229', name: 'Claude 3 Sonnet' },
      { id: 'claude-3-haiku-20240307', name: 'Claude 3 Haiku' },
      { id: 'claude-3-5-sonnet-20241022', name: 'Claude 3.5 Sonnet' },
    ];
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
      // Separate system message from other messages
      const systemMessage = messages.find((msg) => msg.role === 'system');
      const chatMessages = messages.filter((msg) => msg.role !== 'system');

      const stream = await (this.client as any).messages.stream({
        model,
        max_tokens: options?.maxTokens || 4096,
        temperature: options?.temperature,
        system: systemMessage?.content,
        messages: chatMessages.map((msg) => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })),
      });

      for await (const chunk of stream) {
        if (
          chunk.type === 'content_block_delta' &&
          chunk.delta.type === 'text_delta'
        ) {
          yield {
            content: chunk.delta.text,
            done: false,
          };
        } else if (chunk.type === 'message_stop') {
          yield {
            content: '',
            done: true,
          };
        }
      }
    } catch (error: any) {
      console.error('Error in Claude chat stream:', error);
      throw new Error(
        `Claude chat error: ${error.message || 'Unknown error'}`
      );
    }
  }

  async validateConnection(): Promise<boolean> {
    try {
      // Try to create a minimal request to validate the API key
      await (this.client as any).messages.create({
        model: 'claude-3-haiku-20240307',
        max_tokens: 1,
        messages: [{ role: 'user', content: 'Hi' }],
      });
      return true;
    } catch (error) {
      console.error('Claude connection failed:', error);
      return false;
    }
  }
}

