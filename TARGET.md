# AI对话应用开发计划

## 项目概述
开发一个支持多模型的AI对话应用，用户可以选择本地部署的大模型或远程API模型进行流式对话交互。

## 技术栈

### 前端
- **框架**: React 18+
- **构建工具**: Vite
- **状态管理**: React Context / Zustand
- **UI组件库**: Ant Design / Material-UI / shadcn/ui
- **HTTP客户端**: Axios / Fetch API
- **样式方案**: Tailwind CSS / CSS Modules
- **TypeScript**: 类型安全

### 后端
- **运行时**: Node.js 18+
- **框架**: Express.js / Koa
- **语言**: TypeScript
- **流式处理**: Server-Sent Events (SSE) / WebSocket
- **API客户端**: 
  - Ollama SDK (本地模型)
  - OpenAI SDK (远程模型)
  - Anthropic SDK (Claude)
  - 其他模型SDK

## 功能需求

### 1. 模型管理
- [x] 支持本地模型（通过Ollama）
  - 模型列表获取
  - 模型下载管理
  - 模型切换
- [x] 支持远程模型
  - OpenAI (GPT-3.5/GPT-4)
  - Anthropic (Claude)
  - Google (Gemini)
  - 其他兼容OpenAI API的模型
- [x] API Key管理
  - 安全存储
  - 多个API Key支持
  - Key验证

### 2. 对话功能
- [x] 流式对话
  - 实时响应显示
  - 打字机效果
  - 可中断生成
- [x] 对话历史
  - 会话管理
  - 历史记录保存
  - 导出对话
- [x] 消息管理
  - 编辑消息
  - 删除消息
  - 复制消息
  - 重新生成

### 3. 用户界面
- [x] 响应式设计
- [x] 深色/浅色主题
- [x] 代码高亮显示
- [x] Markdown渲染
- [x] 文件上传（图片、文档）
- [x] 设置面板

### 4. 高级功能
- [ ] 系统提示词（System Prompt）自定义
- [ ] 温度、Top-p等参数调整
- [ ] 多会话管理
- [ ] 会话分享
- [ ] 本地数据持久化

## 架构设计

### 系统架构
```
┌─────────────┐         ┌─────────────┐         ┌─────────────┐
│   React     │◄───────►│  Node.js    │◄───────►│   Ollama    │
│   Frontend  │   HTTP  │   Backend   │  HTTP   │   (Local)   │
│             │   SSE   │             │         │             │
└─────────────┘         └─────────────┘         └─────────────┘
                               │
                               │ HTTPS
                               ▼
                        ┌─────────────┐
                        │  Remote AI  │
                        │   APIs      │
                        │ (OpenAI等)  │
                        └─────────────┘
```

### 前端架构
```
src/
├── components/          # 组件
│   ├── Chat/           # 对话组件
│   ├── ModelSelector/  # 模型选择器
│   ├── Settings/       # 设置面板
│   └── Message/        # 消息组件
├── hooks/              # 自定义Hooks
├── services/           # API服务
├── store/              # 状态管理
├── types/              # TypeScript类型
├── utils/              # 工具函数
└── App.tsx             # 主应用
```

### 后端架构
```
src/
├── routes/             # 路由
│   ├── chat.ts        # 对话路由
│   ├── models.ts      # 模型管理
│   └── config.ts      # 配置管理
├── services/           # 业务逻辑
│   ├── ollama.ts      # Ollama服务
│   ├── openai.ts      # OpenAI服务
│   └── claude.ts      # Claude服务
├── middleware/         # 中间件
├── types/              # TypeScript类型
├── utils/              # 工具函数
└── server.ts           # 服务器入口
```

## 开发阶段

### 第一阶段：项目搭建（1-2天）
1. **前端初始化**
   - 使用Vite创建React + TypeScript项目
   - 配置Tailwind CSS
   - 安装UI组件库
   - 配置ESLint、Prettier

2. **后端初始化**
   - 创建Node.js + TypeScript项目
   - 配置Express
   - 设置CORS
   - 配置环境变量

3. **开发环境**
   - 配置前后端联调
   - 设置代理
   - 热重载配置

### 第二阶段：核心功能开发（3-5天）
1. **后端API开发**
   - 实现Ollama接口集成
   - 实现远程API集成（OpenAI等）
   - 实现流式响应（SSE）
   - 模型列表API
   - 配置管理API

2. **前端核心组件**
   - 对话界面
   - 消息列表
   - 输入框组件
   - 流式渲染
   - 模型选择器

### 第三阶段：功能完善（2-3天）
1. **会话管理**
   - 多会话支持
   - 会话持久化
   - 会话导入导出

2. **设置功能**
   - API Key管理
   - 模型参数配置
   - 主题切换
   - 偏好设置

3. **UI优化**
   - Markdown渲染
   - 代码高亮
   - 响应式适配
   - 动画效果

### 第四阶段：测试与优化（1-2天）
1. **功能测试**
   - 各模型连接测试
   - 流式对话测试
   - 异常处理测试

2. **性能优化**
   - 组件性能优化
   - 请求优化
   - 缓存策略

3. **部署准备**
   - Docker配置
   - 环境变量文档
   - 部署脚本

## 详细目录结构

### 前端项目结构
```
frontend/
├── public/
│   └── favicon.ico
├── src/
│   ├── assets/             # 静态资源
│   ├── components/         # 组件
│   │   ├── Chat/
│   │   │   ├── ChatContainer.tsx
│   │   │   ├── MessageList.tsx
│   │   │   ├── MessageItem.tsx
│   │   │   └── InputBox.tsx
│   │   ├── ModelSelector/
│   │   │   ├── ModelSelector.tsx
│   │   │   ├── LocalModels.tsx
│   │   │   └── RemoteModels.tsx
│   │   ├── Settings/
│   │   │   ├── SettingsPanel.tsx
│   │   │   ├── ApiKeyConfig.tsx
│   │   │   └── ModelParams.tsx
│   │   ├── Sidebar/
│   │   │   ├── Sidebar.tsx
│   │   │   └── SessionList.tsx
│   │   └── common/
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       └── Loading.tsx
│   ├── hooks/              # 自定义Hooks
│   │   ├── useChat.ts
│   │   ├── useModels.ts
│   │   ├── useStream.ts
│   │   └── useLocalStorage.ts
│   ├── services/           # API服务
│   │   ├── api.ts
│   │   ├── chatService.ts
│   │   └── modelService.ts
│   ├── store/              # 状态管理
│   │   ├── chatStore.ts
│   │   ├── modelStore.ts
│   │   └── settingsStore.ts
│   ├── types/              # TypeScript类型
│   │   ├── chat.ts
│   │   ├── model.ts
│   │   └── api.ts
│   ├── utils/              # 工具函数
│   │   ├── markdown.ts
│   │   ├── storage.ts
│   │   └── format.ts
│   ├── styles/             # 样式文件
│   │   └── global.css
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

### 后端项目结构
```
backend/
├── src/
│   ├── routes/             # 路由
│   │   ├── index.ts
│   │   ├── chat.ts
│   │   ├── models.ts
│   │   └── config.ts
│   ├── services/           # 业务逻辑
│   │   ├── base/
│   │   │   └── AIService.ts
│   │   ├── ollama/
│   │   │   └── OllamaService.ts
│   │   ├── openai/
│   │   │   └── OpenAIService.ts
│   │   ├── claude/
│   │   │   └── ClaudeService.ts
│   │   └── modelFactory.ts
│   ├── middleware/         # 中间件
│   │   ├── errorHandler.ts
│   │   ├── logger.ts
│   │   └── cors.ts
│   ├── types/              # TypeScript类型
│   │   ├── chat.ts
│   │   ├── model.ts
│   │   └── config.ts
│   ├── utils/              # 工具函数
│   │   ├── stream.ts
│   │   ├── config.ts
│   │   └── validator.ts
│   ├── config/             # 配置
│   │   └── default.ts
│   └── server.ts           # 服务器入口
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── package.json
├── tsconfig.json
└── nodemon.json
```

## 关键技术点

### 1. 流式对话实现

#### 后端（SSE实现）
```typescript
// Express路由示例
router.post('/chat/stream', async (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const { messages, model, provider } = req.body;
  
  try {
    const aiService = modelFactory.getService(provider);
    const stream = await aiService.createChatStream(messages, model);
    
    for await (const chunk of stream) {
      res.write(`data: ${JSON.stringify(chunk)}\n\n`);
    }
    
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    res.write(`data: ${JSON.stringify({ error: error.message })}\n\n`);
    res.end();
  }
});
```

#### 前端（SSE接收）
```typescript
// React Hook示例
const useStreamChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  const sendMessage = async (content: string) => {
    setIsStreaming(true);
    
    const eventSource = new EventSource('/api/chat/stream', {
      method: 'POST',
      body: JSON.stringify({ messages: [...messages, { role: 'user', content }] })
    });

    let currentMessage = '';
    
    eventSource.onmessage = (event) => {
      if (event.data === '[DONE]') {
        eventSource.close();
        setIsStreaming(false);
        return;
      }
      
      const chunk = JSON.parse(event.data);
      currentMessage += chunk.content;
      
      setMessages(prev => [
        ...prev.slice(0, -1),
        { role: 'assistant', content: currentMessage }
      ]);
    };
  };

  return { messages, sendMessage, isStreaming };
};
```

### 2. Ollama集成
```typescript
// Ollama服务
import ollama from 'ollama';

class OllamaService {
  async listModels() {
    return await ollama.list();
  }

  async *createChatStream(messages: Message[], model: string) {
    const stream = await ollama.chat({
      model,
      messages,
      stream: true,
    });

    for await (const chunk of stream) {
      yield {
        content: chunk.message.content,
        done: chunk.done,
      };
    }
  }
}
```

### 3. 远程API集成
```typescript
// OpenAI服务
import OpenAI from 'openai';

class OpenAIService {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async *createChatStream(messages: Message[], model: string) {
    const stream = await this.client.chat.completions.create({
      model,
      messages,
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || '';
      yield { content, done: chunk.choices[0]?.finish_reason !== null };
    }
  }
}
```

## API接口设计

### 对话相关
- `POST /api/chat/stream` - 流式对话
- `POST /api/chat/stop` - 停止生成
- `GET /api/chat/history` - 获取历史记录
- `DELETE /api/chat/session/:id` - 删除会话

### 模型相关
- `GET /api/models/local` - 获取本地模型列表
- `GET /api/models/remote` - 获取远程模型列表
- `POST /api/models/pull` - 下载模型（Ollama）
- `GET /api/models/info/:name` - 获取模型信息

### 配置相关
- `POST /api/config/apikey` - 保存API Key
- `GET /api/config/apikey/:provider` - 获取API Key状态
- `POST /api/config/preferences` - 保存用户偏好
- `GET /api/config/preferences` - 获取用户偏好

## 环境变量配置

### 后端 `.env`
```env
# 服务器配置
PORT=3080
NODE_ENV=development

# Ollama配置
OLLAMA_BASE_URL=http://localhost:11434

# API Keys（可选，也可通过UI配置）
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
GOOGLE_API_KEY=your_google_key

# 数据库（如需要）
DATABASE_URL=sqlite://./data.db

# 安全
JWT_SECRET=your_jwt_secret
ENCRYPTION_KEY=your_encryption_key
```

### 前端 `.env`
```env
VITE_API_BASE_URL=http://localhost:3080
VITE_APP_NAME=AI Talk
```

## 依赖包清单

### 前端
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "axios": "^1.6.0",
    "zustand": "^4.4.0",
    "react-markdown": "^9.0.0",
    "react-syntax-highlighter": "^15.5.0",
    "antd": "^5.12.0",
    "@ant-design/icons": "^5.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "typescript": "^5.3.0",
    "vite": "^5.0.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

### 后端
```json
{
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "dotenv": "^16.3.0",
    "ollama": "^0.5.0",
    "openai": "^4.24.0",
    "@anthropic-ai/sdk": "^0.10.0",
    "helmet": "^7.1.0",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "@types/express": "^4.17.0",
    "@types/cors": "^2.8.0",
    "@types/node": "^20.10.0",
    "typescript": "^5.3.0",
    "ts-node": "^10.9.0",
    "nodemon": "^3.0.0",
    "@typescript-eslint/eslint-plugin": "^6.15.0",
    "@typescript-eslint/parser": "^6.15.0"
  }
}
```

## 部署方案

### 开发环境
```bash
# 后端
cd backend
npm install
npm run dev

# 前端
cd frontend
npm install
npm run dev
```

### 生产环境（Docker）
```dockerfile
# 使用Docker Compose部署
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "80:80"
    environment:
      - VITE_API_BASE_URL=http://backend:3080

  backend:
    build: ./backend
    ports:
      - "3080:3080"
    environment:
      - OLLAMA_BASE_URL=http://ollama:11434
    volumes:
      - ./data:/app/data

  ollama:
    image: ollama/ollama
    ports:
      - "11434:11434"
    volumes:
      - ollama:/root/.ollama

volumes:
  ollama:
```

## 注意事项

1. **安全性**
   - API Key必须加密存储
   - 实现请求频率限制
   - 添加输入验证和清洗

2. **性能**
   - 实现消息缓存
   - 优化大量历史消息的渲染
   - 考虑消息分页

3. **用户体验**
   - 添加加载状态
   - 错误提示友好
   - 支持离线使用（PWA）

4. **扩展性**
   - 设计易于添加新模型的架构
   - 支持插件系统
   - 支持自定义主题

## 后续优化方向

1. **功能增强**
   - 语音输入/输出
   - 图片生成集成
   - 知识库集成（RAG）
   - 多模态支持

2. **协作功能**
   - 多用户支持
   - 会话分享
   - 团队工作空间

3. **移动端**
   - React Native应用
   - 响应式PWA

4. **高级特性**
   - 工具调用（Function Calling）
   - 代理模式（Agents）
   - 工作流编排

---

**开发周期预估**: 7-12天
**技术难度**: 中等
**优先级**: 高

**下一步行动**: 
1. 初始化前后端项目
2. 配置开发环境
3. 实现基础对话功能
4. 集成Ollama
5. 添加远程API支持

