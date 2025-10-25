/**
 * API密钥配置接口
 * 定义了不同AI服务提供商的API密钥配置
 */
export interface ApiKeyConfig {
  /** AI服务提供商 */
  provider: 'openai' | 'claude' | 'google';
  /** API密钥 */
  apiKey: string;
  /** 自定义API基础URL（可选） */
  baseUrl?: string;
}

/**
 * 应用程序配置接口
 * 定义了应用运行时的基本配置参数
 */
export interface AppConfig {
  /** 服务器端口号 */
  port: number;
  /** 运行环境（development/production） */
  nodeEnv: string;
  /** Ollama服务的基础URL */
  ollamaBaseUrl: string;
  /** CORS允许的源地址 */
  corsOrigin: string;
  /** OpenAI API密钥（可选） */
  openaiApiKey?: string;
  /** Anthropic API密钥（可选） */
  anthropicApiKey?: string;
  /** Google API密钥（可选） */
  googleApiKey?: string;
}

/**
 * 用户偏好设置接口
 * 定义了用户的个性化配置选项
 */
export interface UserPreferences {
  /** 主题模式：浅色或深色 */
  theme: 'light' | 'dark';
  /** 默认使用的模型（可选） */
  defaultModel?: string;
  /** 默认AI服务提供商（可选） */
  defaultProvider?: string;
  /** 默认温度参数（可选） */
  temperature?: number;
  /** 默认最大token数量（可选） */
  maxTokens?: number;
}

