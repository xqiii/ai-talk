import { api } from './api';
import { ModelInfo, ApiKeyStatus } from '../types/model';
import { Provider } from '../types/chat';

export class ModelService {
  async getLocalModels(): Promise<ModelInfo[]> {
    try {
      const response = await api.get('/api/models/local');
      return response.data;
    } catch (error) {
      console.error('Error fetching local models:', error);
      return [];
    }
  }

  async getRemoteModels(provider: Provider, apiKey?: string): Promise<ModelInfo[]> {
    try {
      const response = await api.get('/api/models/remote', {
        params: { provider, apiKey },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching remote models:', error);
      return [];
    }
  }

  async pullModel(modelName: string): Promise<void> {
    await api.post('/api/models/pull', { modelName });
  }

  async validateConnection(provider: Provider, apiKey?: string): Promise<boolean> {
    try {
      const response = await api.post('/api/models/validate', { provider, apiKey });
      return response.data.valid;
    } catch (error) {
      console.error('Error validating connection:', error);
      return false;
    }
  }

  async saveApiKey(provider: string, apiKey: string): Promise<void> {
    await api.post('/api/config/apikey', { provider, apiKey });
  }

  async getApiKeyStatus(provider: string): Promise<ApiKeyStatus> {
    const response = await api.get(`/api/config/apikey/${provider}`);
    return response.data;
  }

  async removeApiKey(provider: string): Promise<void> {
    await api.delete(`/api/config/apikey/${provider}`);
  }
}

export const modelService = new ModelService();

