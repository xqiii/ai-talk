import React, { useState } from 'react';
import { Button } from 'antd';
import { CopyOutlined, CheckOutlined } from '@ant-design/icons';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';
import { Message } from '../types/chat';
import { copyToClipboard } from '../utils/markdown';

interface MessageItemProps {
  message: Message;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  const [copied, setCopied] = useState(false);
  const isDark = document.documentElement.classList.contains('dark');

  const handleCopy = async () => {
    const success = await copyToClipboard(message.content);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isUser = message.role === 'user';

  return (
    <div className="py-2">
      <div className={`max-w-4xl mx-auto px-4 flex gap-2 ${isUser ? 'flex-row-reverse justify-start' : 'flex-row justify-start'}`}>
        {/* Avatar */}
        <div className="flex-shrink-0 w-9 h-9">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-normal shadow-sm ${
            isUser 
              ? 'bg-[#7851A9] text-white' 
              : 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
          }`}>
            {isUser ? '你' : 'AI'}
          </div>
        </div>

        {/* Content Bubble */}
        <div className={`group flex flex-col max-w-[65%] ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`rounded-2xl px-4 py-3 shadow-sm ${
            isUser 
              ? 'bg-[#7851A9] text-white rounded-tr-sm' 
              : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-700 rounded-tl-sm'
          }`}>
            <div className={`prose max-w-none prose-sm ${
              isUser 
                ? 'prose-invert' 
                : 'dark:prose-invert'
            }`}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <div className="my-3">
                        <SyntaxHighlighter
                          style={isDark ? vscDarkPlus : oneLight}
                          language={match[1]}
                          PreTag="div"
                          customStyle={{
                            margin: 0,
                            borderRadius: '0.5rem',
                            fontSize: '0.875rem',
                          }}
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      </div>
                    ) : (
                      <code 
                        className={`px-1.5 py-0.5 rounded text-sm font-mono ${
                          isUser 
                            ? 'bg-white/20' 
                            : 'bg-gray-100 dark:bg-gray-800'
                        }`}
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                  p({ children }) {
                    return <p className="mb-3 last:mb-0 leading-7">{children}</p>;
                  },
                  ul({ children }) {
                    return <ul className="mb-3 ml-6 list-disc space-y-1">{children}</ul>;
                  },
                  ol({ children }) {
                    return <ol className="mb-3 ml-6 list-decimal space-y-1">{children}</ol>;
                  },
                  li({ children }) {
                    return <li className="leading-7">{children}</li>;
                  },
                  h1({ children }) {
                    return <h1 className="text-xl font-bold mb-3 mt-4">{children}</h1>;
                  },
                  h2({ children }) {
                    return <h2 className="text-lg font-bold mb-2 mt-3">{children}</h2>;
                  },
                  h3({ children }) {
                    return <h3 className="text-base font-bold mb-2 mt-3">{children}</h3>;
                  },
                  blockquote({ children }) {
                    return (
                      <blockquote className={`border-l-4 pl-4 italic my-3 ${
                        isUser 
                          ? 'border-white/50' 
                          : 'border-purple-500'
                      }`}>
                        {children}
                      </blockquote>
                    );
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          </div>
          
          {/* Copy Button */}
          <Button
            type="text"
            size="small"
            icon={copied ? <CheckOutlined /> : <CopyOutlined />}
            onClick={handleCopy}
            className={`opacity-0 group-hover:opacity-100 transition-opacity mt-1 ${
              isUser ? 'text-gray-400' : 'text-gray-400'
            }`}
          />
        </div>
      </div>
    </div>
  );
};

