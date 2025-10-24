import dotenv from 'dotenv';
import { AppConfig } from '../types/config';

dotenv.config();

export const config: AppConfig = {
  port: parseInt(process.env.PORT || '3080', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  ollamaBaseUrl: process.env.OLLAMA_BASE_URL || 'http://localhost:11434',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  openaiApiKey: process.env.OPENAI_API_KEY,
  anthropicApiKey: process.env.ANTHROPIC_API_KEY,
  googleApiKey: process.env.GOOGLE_API_KEY,
};

