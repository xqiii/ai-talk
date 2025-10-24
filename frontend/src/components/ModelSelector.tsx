import React, { useEffect } from 'react';
import { Select, Space, Typography, Spin } from 'antd';
import { useChatStore } from '../store/chatStore';
import { useModels } from '../hooks/useModels';
import { Provider } from '../types/chat';

const { Text } = Typography;

export const ModelSelector: React.FC = () => {
  const { config, setConfig } = useChatStore();
  const { localModels, remoteModels, isLoading, loadLocalModels, loadRemoteModels } =
    useModels();

  // 加载模型列表
  useEffect(() => {
    const loadModels = async () => {
      if (config.provider === 'ollama') {
        await loadLocalModels();
      } else {
        await loadRemoteModels(config.provider);
      }
    };
    loadModels();
  }, [config.provider, loadLocalModels, loadRemoteModels]);

  // 自动选择第一个可用模型
  useEffect(() => {
    const models = config.provider === 'ollama' ? localModels : remoteModels;
    if (models.length > 0 && !config.model) {
      setConfig({ model: models[0].id });
    }
  }, [localModels, remoteModels, config.provider, config.model, setConfig]);

  const handleProviderChange = (provider: Provider) => {
    setConfig({ provider, model: '' });
  };

  const handleModelChange = (model: string) => {
    setConfig({ model });
  };

  const models =
    config.provider === 'ollama' ? localModels : remoteModels;

  return (
    <Space direction="vertical" size="small" className="w-full">
      <Space>
        <Text strong className="dark:text-gray-200">
          提供商:
        </Text>
        <Select
          value={config.provider}
          onChange={handleProviderChange}
          style={{ width: 150 }}
          options={[
            { label: 'Ollama (本地)', value: 'ollama' },
            { label: 'OpenAI', value: 'openai' },
            { label: 'Claude', value: 'claude' },
          ]}
        />
      </Space>

      <Space>
        <Text strong className="dark:text-gray-200">
          模型:
        </Text>
        <Select
          value={config.model}
          onChange={handleModelChange}
          style={{ width: 250 }}
          placeholder={isLoading ? '加载中...' : '选择模型'}
          loading={isLoading}
          notFoundContent={isLoading ? <Spin size="small" /> : '暂无可用模型'}
          options={models.map((m) => ({
            label: m.name,
            value: m.id,
          }))}
          showSearch
          filterOption={(input, option) =>
            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
          }
        />
      </Space>
    </Space>
  );
};

