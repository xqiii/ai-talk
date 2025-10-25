/**
 * 模型状态管理 Store
 * 使用 Zustand 管理本地和远程 AI 模型的状态
 */
import { create } from 'zustand';
import { ModelInfo } from '../types/model';

/**
 * 模型状态接口定义
 */
interface ModelState {
  /** 本地可用的模型列表（如 Ollama 模型） */
  localModels: ModelInfo[];
  /** 远程 API 模型列表（如 OpenAI、Claude 等） */
  remoteModels: ModelInfo[];
  /** 模型加载状态标识 */
  isLoading: boolean;
  /** 设置本地模型列表 */
  setLocalModels: (models: ModelInfo[]) => void;
  /** 设置远程模型列表 */
  setRemoteModels: (models: ModelInfo[]) => void;
  /** 设置加载状态 */
  setLoading: (isLoading: boolean) => void;
}

/**
 * 模型状态管理 Hook
 * 提供全局的模型列表状态和更新方法
 */
export const useModelStore = create<ModelState>((set) => ({
  localModels: [],
  remoteModels: [],
  isLoading: false,
  setLocalModels: (models) => set({ localModels: models }),
  setRemoteModels: (models) => set({ remoteModels: models }),
  setLoading: (isLoading) => set({ isLoading }),
}));

