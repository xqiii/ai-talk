export interface ApiKeyConfig {
  provider: 'openai' | 'claude' | 'google';
  apiKey: string;
  baseUrl?: string;
}

export interface AppConfig {
  port: number;
  nodeEnv: string;
  ollamaBaseUrl: string;
  corsOrigin: string;
  openaiApiKey?: string;
  anthropicApiKey?: string;
  googleApiKey?: string;
}

export interface UserPreferences {
  theme: 'light' | 'dark';
  defaultModel?: string;
  defaultProvider?: string;
  temperature?: number;
  maxTokens?: number;
}

