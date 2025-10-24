import React, { useState } from 'react';
import {
  Modal,
  Tabs,
  Input,
  Button,
  Space,
  Typography,
  Slider,
  Switch,
  message,
} from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { useChatStore } from '../store/chatStore';
import { useSettingsStore } from '../store/settingsStore';
import { modelService } from '../services/modelService';

const { Text, Title } = Typography;
const { TabPane } = Tabs;

export const Settings: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const { config, setConfig } = useChatStore();
  const { theme, setTheme, apiKeys, setApiKey } = useSettingsStore();

  const [openaiKey, setOpenaiKey] = useState(apiKeys.openai || '');
  const [claudeKey, setClaudeKey] = useState(apiKeys.claude || '');

  const handleSaveApiKey = async (
    provider: 'openai' | 'claude',
    key: string
  ) => {
    try {
      await modelService.saveApiKey(provider, key);
      setApiKey(provider, key);
      message.success('API Key 保存成功');
    } catch (error) {
      message.error('API Key 保存失败');
    }
  };

  return (
    <>
      <Button
        icon={<SettingOutlined />}
        onClick={() => setVisible(true)}
        type="text"
      >
        设置
      </Button>

      <Modal
        title="设置"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
        width={600}
      >
        <Tabs>
          <TabPane tab="API配置" key="api">
            <Space direction="vertical" size="large" className="w-full">
              <div>
                <Title level={5}>OpenAI API Key</Title>
                <Space.Compact style={{ width: '100%' }}>
                  <Input.Password
                    value={openaiKey}
                    onChange={(e) => setOpenaiKey(e.target.value)}
                    placeholder="输入OpenAI API Key"
                  />
                  <Button
                    type="primary"
                    onClick={() => handleSaveApiKey('openai', openaiKey)}
                  >
                    保存
                  </Button>
                </Space.Compact>
              </div>

              <div>
                <Title level={5}>Claude API Key</Title>
                <Space.Compact style={{ width: '100%' }}>
                  <Input.Password
                    value={claudeKey}
                    onChange={(e) => setClaudeKey(e.target.value)}
                    placeholder="输入Claude API Key"
                  />
                  <Button
                    type="primary"
                    onClick={() => handleSaveApiKey('claude', claudeKey)}
                  >
                    保存
                  </Button>
                </Space.Compact>
              </div>
            </Space>
          </TabPane>

          <TabPane tab="模型参数" key="params">
            <Space direction="vertical" size="large" className="w-full">
              <div>
                <Title level={5}>系统提示词</Title>
                <Input.TextArea
                  value={config.systemPrompt}
                  onChange={(e) => setConfig({ systemPrompt: e.target.value })}
                  placeholder="输入系统提示词，例如：你是一个有帮助的AI助手。请用中文回答所有问题。"
                  rows={4}
                />
                <Text type="secondary" className="text-xs mt-1 block">
                  系统提示词用于指导AI的回答风格和语言
                </Text>
              </div>

              <div>
                <Text strong>温度 (Temperature): {config.temperature}</Text>
                <Slider
                  min={0}
                  max={2}
                  step={0.1}
                  value={config.temperature}
                  onChange={(value) => setConfig({ temperature: value })}
                  marks={{
                    0: '精确',
                    1: '平衡',
                    2: '创造',
                  }}
                />
              </div>

              <div>
                <Text strong>
                  最大令牌数 (Max Tokens): {config.maxTokens}
                </Text>
                <Slider
                  min={256}
                  max={4096}
                  step={256}
                  value={config.maxTokens}
                  onChange={(value) => setConfig({ maxTokens: value })}
                  marks={{
                    256: '256',
                    2048: '2048',
                    4096: '4096',
                  }}
                />
              </div>
            </Space>
          </TabPane>

          <TabPane tab="外观" key="appearance">
            <Space direction="vertical" size="large" className="w-full">
              <div className="flex justify-between items-center">
                <Text strong>深色模式</Text>
                <Switch
                  checked={theme === 'dark'}
                  onChange={(checked) => setTheme(checked ? 'dark' : 'light')}
                />
              </div>
            </Space>
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
};

