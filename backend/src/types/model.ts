export interface ModelInfo {
  id: string;
  name: string;
  provider: 'ollama' | 'openai' | 'claude' | 'google';
  description?: string;
  size?: string;
  modifiedAt?: Date;
}

export interface OllamaModel {
  name: string;
  modified_at: string;
  size: number;
  digest: string;
  details?: {
    format?: string;
    family?: string;
    parameter_size?: string;
  };
}

export interface ModelListResponse {
  local: ModelInfo[];
  remote: ModelInfo[];
}

