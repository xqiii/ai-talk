import { create } from 'zustand';
import { ModelInfo } from '../types/model';

interface ModelState {
  localModels: ModelInfo[];
  remoteModels: ModelInfo[];
  isLoading: boolean;
  setLocalModels: (models: ModelInfo[]) => void;
  setRemoteModels: (models: ModelInfo[]) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useModelStore = create<ModelState>((set) => ({
  localModels: [],
  remoteModels: [],
  isLoading: false,
  setLocalModels: (models) => set({ localModels: models }),
  setRemoteModels: (models) => set({ remoteModels: models }),
  setLoading: (isLoading) => set({ isLoading }),
}));

