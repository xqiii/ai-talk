import React from 'react';
import { Button, List, Typography, Popconfirm } from 'antd';
import {
  PlusOutlined,
  DeleteOutlined,
  MessageOutlined,
} from '@ant-design/icons';
import { useChatStore } from '../store/chatStore';
import { formatDate } from '../utils/markdown';

const { Text } = Typography;

export const Sidebar: React.FC = () => {
  const {
    sessions,
    currentSessionId,
    createSession,
    deleteSession,
    setCurrentSession,
  } = useChatStore();

  return (
    <div className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#171717] flex flex-col h-full">
      {/* Logo */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex items-center gap-3">
        <img 
          src="/penguin-logo.svg" 
          alt="AI Talk Logo" 
          className="w-10 h-10"
        />
        <div>
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">AI Talk</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-normal">智能对话助手</p>
        </div>
      </div>

      <div className="p-3 border-b border-gray-200 dark:border-gray-800">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={createSession}
          block
          className="h-10 rounded-lg font-medium shadow-sm hover:shadow transition-shadow"
        >
          新建对话
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-2">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`group relative mb-1 rounded-lg cursor-pointer transition-all ${
              currentSessionId === session.id
                ? 'bg-gray-100 dark:bg-gray-800'
                : 'hover:bg-gray-50 dark:hover:bg-gray-800/50'
            }`}
            onClick={() => setCurrentSession(session.id)}
          >
            <div className="flex items-center gap-3 p-3">
              <MessageOutlined className={`text-base flex-shrink-0 ${
                currentSessionId === session.id
                  ? 'text-[#7851A9] dark:text-[#9d7ec7]'
                  : 'text-gray-400 dark:text-gray-500'
              }`} />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-normal text-gray-900 dark:text-gray-100 truncate">
                  {session.title}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-light">
                  {formatDate(new Date(session.updatedAt))}
                </div>
              </div>
              <Popconfirm
                title="确定删除此对话？"
                onConfirm={(e) => {
                  e?.stopPropagation();
                  deleteSession(session.id);
                }}
                okText="删除"
                cancelText="取消"
              >
                <Button
                  type="text"
                  size="small"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={(e) => e.stopPropagation()}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </Popconfirm>
            </div>
          </div>
        ))}
        {sessions.length === 0 && (
          <div className="text-center py-12 text-gray-400 dark:text-gray-600 text-sm">
            暂无对话
          </div>
        )}
      </div>
    </div>
  );
};

