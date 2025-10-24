import React, { useEffect, useRef } from 'react';
import { ConfigProvider, theme } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import { Sidebar } from './components/Sidebar';
import { ChatContainer } from './components/ChatContainer';
import { useChatStore } from './store/chatStore';
import { useSettingsStore } from './store/settingsStore';

const App: React.FC = () => {
  const { sessions, createSession } = useChatStore();
  const { theme: appTheme } = useSettingsStore();
  const initialized = useRef(false);

  // Create initial session if none exists
  useEffect(() => {
    if (!initialized.current && sessions.length === 0) {
      createSession();
      initialized.current = true;
    }
  }, [sessions.length, createSession]);

  // Apply dark mode to document
  useEffect(() => {
    if (appTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [appTheme]);

  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        algorithm:
          appTheme === 'dark' ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#7851A9',
          borderRadius: 8,
          fontSize: 14,
        },
      }}
    >
      <div className="flex h-screen bg-gray-50 dark:bg-[#212121] antialiased">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0">
          <ChatContainer />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default App;

