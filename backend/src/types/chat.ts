/**
 * 聊天消息接口
 * 定义了聊天系统中消息的基本结构
 */
export interface Message {
  /** 消息角色：系统、用户或助手 */
  role: 'system' | 'user' | 'assistant';
  /** 消息内容 */
  content: string;
}

/**
 * 聊天请求接口
 * 定义了发送给AI服务的请求参数
 */
export interface ChatRequest {
  /** 消息列表 */
  messages: Message[];
  /** 使用的模型名称 */
  model: string;
  /** AI服务提供商 */
  provider: 'ollama' | 'openai' | 'claude';
  /** 温度参数，控制回复的随机性 (0-1) */
  temperature?: number;
  /** 最大生成token数量 */
  maxTokens?: number;
  /** 是否启用流式响应 */
  stream?: boolean;
}

/**
 * 聊天响应接口
 * 定义了AI服务返回的响应结构
 */
export interface ChatResponse {
  /** 回复内容 */
  content: string;
  /** 是否完成生成 */
  done: boolean;
  /** 使用的模型名称 */
  model?: string;
  /** 总token数量 */
  totalTokens?: number;
}

/**
 * 流式响应块接口
 * 用于处理流式响应的数据块
 */
export interface StreamChunk {
  /** 内容片段 */
  content: string;
  /** 是否完成 */
  done: boolean;
}

/**
 * 聊天会话接口
 * 定义了聊天会话的完整信息
 */
export interface Session {
  /** 会话唯一标识 */
  id: string;
  /** 会话标题 */
  title: string;
  /** 会话中的消息列表 */
  messages: Message[];
  /** 创建时间 */
  createdAt: Date;
  /** 最后更新时间 */
  updatedAt: Date;
}

