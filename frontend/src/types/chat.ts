export interface Message {
  id: string;
  role: 'system' | 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isStreaming?: boolean;
}

export interface Session {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export type Provider = 'ollama' | 'openai' | 'claude';

export interface ChatConfig {
  model: string;
  provider: Provider;
  temperature?: number;
  maxTokens?: number;
  apiKey?: string;
  systemPrompt?: string;
}

