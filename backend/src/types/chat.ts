export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface ChatRequest {
  messages: Message[];
  model: string;
  provider: 'ollama' | 'openai' | 'claude';
  temperature?: number;
  maxTokens?: number;
  stream?: boolean;
}

export interface ChatResponse {
  content: string;
  done: boolean;
  model?: string;
  totalTokens?: number;
}

export interface StreamChunk {
  content: string;
  done: boolean;
}

export interface Session {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

