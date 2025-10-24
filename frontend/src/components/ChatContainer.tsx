import React from 'react';
import { Alert } from 'antd';
import { MessageList } from './MessageList';
import { InputBox } from './InputBox';
import { ModelSelector } from './ModelSelector';
import { Settings } from './Settings';
import { useChatStore } from '../store/chatStore';
import { useChat } from '../hooks/useChat';

export const ChatContainer: React.FC = () => {
  const { getCurrentSession, config } = useChatStore();
  const { sendMessage, stopGeneration, isStreaming, error } = useChat();

  const currentSession = getCurrentSession();
  const hasModel = Boolean(config.model);

  return (
    <div className="flex flex-col h-full bg-white dark:bg-[#212121]">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4 bg-white dark:bg-[#171717] flex justify-between items-center backdrop-blur-sm">
        <ModelSelector />
        <Settings />
      </div>

      {/* Error Alert */}
      {error && (
        <div className="mx-auto max-w-3xl w-full px-4 pt-4">
          <Alert
            message="错误"
            description={error}
            type="error"
            closable
            showIcon
          />
        </div>
      )}

      {/* No Model Warning */}
      {!hasModel && (
        <div className="mx-auto max-w-3xl w-full px-4 pt-4">
          <Alert
            message="请先选择模型"
            description="请在上方选择一个AI模型后开始对话"
            type="warning"
            showIcon
          />
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <MessageList messages={currentSession?.messages || []} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#171717]">
        <div className="max-w-3xl mx-auto">
          <InputBox
            onSend={sendMessage}
            onStop={stopGeneration}
            isStreaming={isStreaming}
            disabled={!hasModel}
          />
        </div>
      </div>
    </div>
  );
};

