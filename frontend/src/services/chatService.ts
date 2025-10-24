import { Message, Provider } from '../types/chat';

export interface StreamOptions {
  messages: Message[];
  model: string;
  provider: Provider;
  temperature?: number;
  maxTokens?: number;
  apiKey?: string;
  onChunk: (content: string) => void;
  onDone: () => void;
  onError: (error: string) => void;
}

export class ChatService {
  private controller: AbortController | null = null;

  async streamChat(options: StreamOptions): Promise<void> {
    const { messages, model, provider, temperature, maxTokens, apiKey, onChunk, onDone, onError } = options;

    this.controller = new AbortController();

    try {
      const response = await fetch('/api/chat/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages.map(msg => ({
            role: msg.role,
            content: msg.content,
          })),
          model,
          provider,
          temperature,
          maxTokens,
          apiKey,
        }),
        signal: this.controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('Response body is null');
      }

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          onDone();
          break;
        }

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);

            if (data === '[DONE]') {
              onDone();
              return;
            }

            try {
              const parsed = JSON.parse(data);

              if (parsed.error) {
                onError(parsed.error);
                return;
              }

              if (parsed.content) {
                onChunk(parsed.content);
              }

              if (parsed.done) {
                onDone();
                return;
              }
            } catch (e) {
              // Ignore parsing errors for incomplete chunks
            }
          }
        }
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('Stream aborted');
      } else {
        onError(error.message || 'Unknown error');
      }
    }
  }

  stopStream(): void {
    if (this.controller) {
      this.controller.abort();
      this.controller = null;
    }
  }
}

export const chatService = new ChatService();

