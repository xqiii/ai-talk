import { Message, StreamChunk } from '../../types/chat';

export abstract class AIService {
  abstract listModels(): Promise<any[]>;
  abstract createChatStream(
    messages: Message[],
    model: string,
    options?: {
      temperature?: number;
      maxTokens?: number;
    }
  ): AsyncGenerator<StreamChunk, void, unknown>;
  abstract validateConnection(): Promise<boolean>;
}

