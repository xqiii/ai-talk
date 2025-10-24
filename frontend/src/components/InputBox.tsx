import React, { useState, KeyboardEvent } from 'react';
import { Button, Input } from 'antd';
import { SendOutlined, StopOutlined } from '@ant-design/icons';

const { TextArea } = Input;

interface InputBoxProps {
  onSend: (message: string) => void;
  onStop: () => void;
  isStreaming: boolean;
  disabled?: boolean;
}

export const InputBox: React.FC<InputBoxProps> = ({
  onSend,
  onStop,
  isStreaming,
  disabled,
}) => {
  const [value, setValue] = useState('');

  const handleSend = () => {
    if (value.trim() && !isStreaming) {
      onSend(value);
      setValue('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-4">
      <div className="relative flex items-end gap-3 bg-white dark:bg-gray-800 rounded-2xl px-5 py-4 shadow-md border border-gray-100 dark:border-gray-700 focus-within:border-[#7851A9] focus-within:shadow-lg dark:focus-within:border-[#9d7ec7] transition-all">
        <TextArea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="输入消息..."
          autoSize={{ minRows: 1, maxRows: 6 }}
          disabled={disabled || isStreaming}
          className="flex-1 bg-transparent border-0 focus:shadow-none resize-none text-base"
          style={{ 
            padding: '4px 0',
            minHeight: '28px',
            lineHeight: '1.5',
          }}
        />
        {isStreaming ? (
          <Button
            type="text"
            danger
            icon={<StopOutlined className="text-xl" />}
            onClick={onStop}
            className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-xl hover:bg-red-100 dark:hover:bg-red-900/30"
          />
        ) : (
          <Button
            type="text"
            icon={<SendOutlined className="text-xl text-[#7851A9]" />}
            onClick={handleSend}
            disabled={!value.trim() || disabled}
            className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-xl hover:bg-purple-100 dark:hover:bg-purple-900/30 disabled:opacity-30 disabled:hover:bg-transparent"
          />
        )}
      </div>
    </div>
  );
};

