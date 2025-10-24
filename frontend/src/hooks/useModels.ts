import { useCallback } from 'react';
import { useModelStore } from '../store/modelStore';
import { modelService } from '../services/modelService';
import { Provider } from '../types/chat';

export const useModels = () => {
  const { localModels, remoteModels, isLoading, setLocalModels, setRemoteModels, setLoading } = useModelStore();

  const loadLocalModels = useCallback(async () => {
    setLoading(true);
    try {
      const models = await modelService.getLocalModels();
      setLocalModels(models);
    } catch (error) {
      console.error('Failed to load local models:', error);
      setLocalModels([]);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setLocalModels]);

  const loadRemoteModels = useCallback(async (provider: Provider, apiKey?: string) => {
    setLoading(true);
    try {
      const models = await modelService.getRemoteModels(provider, apiKey);
      setRemoteModels(models);
    } catch (error) {
      console.error('Failed to load remote models:', error);
      setRemoteModels([]);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setRemoteModels]);

  return {
    localModels,
    remoteModels,
    isLoading,
    loadLocalModels,
    loadRemoteModels,
  };
};

