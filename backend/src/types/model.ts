/**
 * 模型信息接口
 * 定义了AI模型的基本信息结构
 */
export interface ModelInfo {
  /** 模型唯一标识 */
  id: string;
  /** 模型名称 */
  name: string;
  /** AI服务提供商 */
  provider: 'ollama' | 'openai' | 'claude' | 'google';
  /** 模型描述（可选） */
  description?: string;
  /** 模型大小（可选） */
  size?: string;
  /** 最后修改时间（可选） */
  modifiedAt?: Date;
}

/**
 * Ollama模型接口
 * 定义了Ollama服务返回的模型信息结构
 */
export interface OllamaModel {
  /** 模型名称 */
  name: string;
  /** 修改时间（ISO字符串格式） */
  modified_at: string;
  /** 模型大小（字节数） */
  size: number;
  /** 模型摘要哈希 */
  digest: string;
  /** 模型详细信息（可选） */
  details?: {
    /** 模型格式（可选） */
    format?: string;
    /** 模型系列（可选） */
    family?: string;
    /** 参数大小（可选） */
    parameter_size?: string;
  };
}

/**
 * 模型列表响应接口
 * 定义了获取模型列表时的响应结构
 */
export interface ModelListResponse {
  /** 本地模型列表 */
  local: ModelInfo[];
  /** 远程模型列表 */
  remote: ModelInfo[];
}

