import { Session } from '../types/chat';

/**
 * 导出会话为JSON文件
 */
export const exportSession = (session: Session) => {
  const dataStr = JSON.stringify(session, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `ai-talk-${session.title}-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * 导出所有会话
 */
export const exportAllSessions = (sessions: Session[]) => {
  const dataStr = JSON.stringify(sessions, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `ai-talk-all-sessions-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

/**
 * 导入会话
 */
export const importSessions = (file: File): Promise<Session[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const sessions = JSON.parse(e.target?.result as string);
        resolve(Array.isArray(sessions) ? sessions : [sessions]);
      } catch (error) {
        reject(new Error('无效的JSON文件'));
      }
    };
    reader.onerror = () => reject(new Error('文件读取失败'));
    reader.readAsText(file);
  });
};

/**
 * 导出为Markdown格式
 */
export const exportSessionAsMarkdown = (session: Session) => {
  let markdown = `# ${session.title}\n\n`;
  markdown += `创建时间: ${new Date(session.createdAt).toLocaleString('zh-CN')}\n\n`;
  markdown += `---\n\n`;

  session.messages.forEach((message) => {
    const role = message.role === 'user' ? '👤 用户' : '🤖 AI助手';
    markdown += `## ${role}\n\n`;
    markdown += `${message.content}\n\n`;
    markdown += `---\n\n`;
  });

  const dataBlob = new Blob([markdown], { type: 'text/markdown' });
  const url = URL.createObjectURL(dataBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `ai-talk-${session.title}-${new Date().toISOString().slice(0, 10)}.md`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

