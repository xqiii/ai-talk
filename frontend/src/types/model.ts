import { Provider } from './chat';

export interface ModelInfo {
  id: string;
  name: string;
  provider: Provider;
  description?: string;
  size?: string;
  modifiedAt?: Date;
}

export interface ApiKeyStatus {
  provider: string;
  configured: boolean;
  preview?: string;
}

