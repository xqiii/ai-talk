/**
 * 聊天消息接口
 * 表示对话中的单条消息
 */
export interface Message {
  /** 消息唯一标识符 */
  id: string;
  /** 消息角色：系统消息、用户消息或助手回复 */
  role: 'system' | 'user' | 'assistant';
  /** 消息内容文本 */
  content: string;
  /** 消息创建时间戳 */
  timestamp: Date;
  /** 是否正在流式传输中（用于显示打字动画） */
  isStreaming?: boolean;
}

/**
 * 聊天会话接口
 * 表示一个完整的对话会话，包含多条消息
 */
export interface Session {
  /** 会话唯一标识符 */
  id: string;
  /** 会话标题（通常根据第一条消息自动生成） */
  title: string;
  /** 会话中的所有消息列表 */
  messages: Message[];
  /** 会话创建时间 */
  createdAt: Date;
  /** 会话最后更新时间 */
  updatedAt: Date;
}

/**
 * AI 服务提供商类型
 * - ollama: 本地 Ollama 服务
 * - openai: OpenAI API
 * - claude: Anthropic Claude API
 */
export type Provider = 'ollama' | 'openai' | 'claude';

/**
 * 聊天配置接口
 * 定义聊天请求的参数配置
 */
export interface ChatConfig {
  /** 使用的模型名称 */
  model: string;
  /** AI 服务提供商 */
  provider: Provider;
  /** 温度参数，控制输出的随机性 (0.0-2.0)，值越高越随机 */
  temperature?: number;
  /** 最大生成 token 数量限制 */
  maxTokens?: number;
  /** API 密钥（用于远程服务认证） */
  apiKey?: string;
  /** 系统提示词，用于设定 AI 的行为和角色 */
  systemPrompt?: string;
}

