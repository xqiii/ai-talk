import { useState } from 'react';
import { useChatStore } from '../store/chatStore';
import { chatService } from '../services/chatService';
import { useSettingsStore } from '../store/settingsStore';

export const useChat = () => {
  const {
    addMessage,
    updateMessage,
    config,
    setStreaming,
    isStreaming,
    getCurrentSession,
  } = useChatStore();

  const { apiKeys } = useSettingsStore();
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (content: string) => {
    if (!content.trim() || isStreaming) return;

    setError(null);

    // Add user message
    addMessage({
      role: 'user',
      content,
    });

    setStreaming(true);

    // Get current session after adding user message
    const currentSession = getCurrentSession();
    if (!currentSession) {
      setStreaming(false);
      return;
    }

    // Add empty assistant message for streaming
    addMessage({
      role: 'assistant',
      content: '',
    });

    // Get updated session to find the assistant message we just added
    const updatedSession = getCurrentSession();
    if (!updatedSession) {
      setStreaming(false);
      return;
    }

    // Get the last message (which is the assistant message we just added)
    const assistantMessage = updatedSession.messages[updatedSession.messages.length - 1];
    if (!assistantMessage) {
      setStreaming(false);
      return;
    }

    // Get API key based on provider
    const apiKey =
      config.provider === 'openai'
        ? apiKeys.openai
        : config.provider === 'claude'
        ? apiKeys.claude
        : undefined;

    let fullContent = '';

    // 构建发送给后端的消息列表，包含系统提示词
    const messagesToSend = config.systemPrompt
      ? [
          { id: 'system', role: 'system' as const, content: config.systemPrompt, timestamp: new Date() },
          ...currentSession.messages,
        ]
      : currentSession.messages;

    await chatService.streamChat({
      messages: messagesToSend,
      model: config.model,
      provider: config.provider,
      temperature: config.temperature,
      maxTokens: config.maxTokens,
      apiKey,
      onChunk: (chunk) => {
        fullContent += chunk;
        updateMessage(assistantMessage.id, fullContent);
      },
      onDone: () => {
        setStreaming(false);
      },
      onError: (err) => {
        setError(err);
        setStreaming(false);
      },
    });
  };

  const stopGeneration = () => {
    chatService.stopStream();
    setStreaming(false);
  };

  return {
    sendMessage,
    stopGeneration,
    isStreaming,
    error,
  };
};

