import React, { useEffect, useRef } from 'react';
import { Empty } from 'antd';
import { MessageItem } from './MessageItem';
import { Message } from '../types/chat';

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="text-6xl mb-4">💬</div>
          <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            开始新对话
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            向AI助手发送消息开始对话
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {messages.map((message) => (
        <MessageItem key={message.id} message={message} />
      ))}
      <div ref={bottomRef} className="h-6" />
    </div>
  );
};

