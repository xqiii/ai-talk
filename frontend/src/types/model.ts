/**
 * 模型相关类型定义
 */
import { Provider } from './chat';

/**
 * AI 模型信息接口
 * 描述一个可用的 AI 模型的详细信息
 */
export interface ModelInfo {
  /** 模型唯一标识符 */
  id: string;
  /** 模型显示名称 */
  name: string;
  /** 模型所属的服务提供商 */
  provider: Provider;
  /** 模型描述信息（可选） */
  description?: string;
  /** 模型大小（如 "7B", "13B"，可选） */
  size?: string;
  /** 模型最后修改时间（可选，主要用于本地模型） */
  modifiedAt?: Date;
}

/**
 * API 密钥配置状态接口
 * 用于显示各服务提供商的 API 密钥配置状态
 */
export interface ApiKeyStatus {
  /** 服务提供商名称 */
  provider: string;
  /** 是否已配置 API 密钥 */
  configured: boolean;
  /** API 密钥预览（脱敏显示，如 "sk-***abc"，可选） */
  preview?: string;
}

