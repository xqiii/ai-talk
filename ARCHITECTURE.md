# 🏗️ AI Talk - 项目架构说明

> 本文档详细说明了 AI Talk 项目的前后端架构、文件结构和核心逻辑。

## 📋 目录

- [整体架构](#整体架构)
- [技术栈](#技术栈)
- [前端架构](#前端架构)
- [后端架构](#后端架构)
- [数据流程](#数据流程)
- [核心功能实现](#核心功能实现)

---

## 🎯 整体架构

```
┌─────────────────────────────────────────────────────────────┐
│                         用户浏览器                           │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         React 前端 (Vite + TypeScript)              │   │
│  │  • UI 组件 (Ant Design)                             │   │
│  │  • 状态管理 (Zustand)                               │   │
│  │  • 本地存储 (localStorage)                          │   │
│  └────────────────┬────────────────────────────────────┘   │
└───────────────────┼────────────────────────────────────────┘
                    │ HTTP/SSE
                    │ (Server-Sent Events)
┌───────────────────▼────────────────────────────────────────┐
│         Node.js 后端 (Express + TypeScript)               │
│  ┌─────────────────────────────────────────────────────┐  │
│  │              API 路由层                              │  │
│  │  • /api/chat - 对话管理                             │  │
│  │  • /api/models - 模型管理                           │  │
│  │  • /api/config - 配置管理                           │  │
│  └────────────────┬────────────────────────────────────┘  │
│  ┌────────────────▼────────────────────────────────────┐  │
│  │           服务层 (Service Layer)                    │  │
│  │  • OllamaService   - 本地模型服务                  │  │
│  │  • OpenAIService   - OpenAI API 服务               │  │
│  │  • ClaudeService   - Anthropic API 服务            │  │
│  └─────────────────────────────────────────────────────┘  │
└───────────────────┬────────────────────────────────────────┘
                    │
      ┌─────────────┼─────────────┐
      │             │             │
      ▼             ▼             ▼
┌──────────┐  ┌──────────┐  ┌──────────┐
│  Ollama  │  │ OpenAI   │  │ Claude   │
│  本地API │  │ 远程API  │  │ 远程API  │
└──────────┘  └──────────┘  └──────────┘
```

---

## 🛠️ 技术栈

### 前端技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 18.3.1 | UI 框架 |
| TypeScript | 5.6.2 | 类型安全 |
| Vite | 5.4.11 | 构建工具 |
| Ant Design | 5.22.2 | UI 组件库 |
| Zustand | 5.0.1 | 状态管理 |
| Tailwind CSS | 3.4.15 | 样式框架 |
| react-markdown | 9.0.1 | Markdown 渲染 |
| nanoid | 5.0.8 | ID 生成 |

### 后端技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| Node.js | 20+ | 运行环境 |
| Express | 4.21.1 | Web 框架 |
| TypeScript | 5.6.3 | 类型安全 |
| Axios | 1.7.7 | HTTP 客户端 |
| OpenAI SDK | 4.72.0 | OpenAI API |
| Anthropic SDK | 0.32.1 | Claude API |
| dotenv | 16.4.5 | 环境变量 |

---

## 🎨 前端架构

### 目录结构

```
frontend/
├── public/                    # 静态资源
│   └── penguin-logo.svg      # 项目 Logo
├── src/
│   ├── components/           # React 组件
│   │   ├── ChatContainer.tsx    # 主聊天容器
│   │   ├── MessageList.tsx      # 消息列表
│   │   ├── MessageItem.tsx      # 单条消息
│   │   ├── InputBox.tsx         # 输入框
│   │   ├── Sidebar.tsx          # 侧边栏
│   │   ├── ModelSelector.tsx    # 模型选择器
│   │   └── Settings.tsx         # 设置面板
│   ├── hooks/                # 自定义 Hooks
│   │   ├── useChat.ts           # 聊天逻辑
│   │   └── useModels.ts         # 模型加载
│   ├── services/             # API 服务
│   │   ├── api.ts               # 基础 API 配置
│   │   ├── chatService.ts       # 聊天服务
│   │   └── modelService.ts      # 模型服务
│   ├── store/                # 状态管理
│   │   ├── chatStore.ts         # 聊天状态
│   │   ├── modelStore.ts        # 模型状态
│   │   └── settingsStore.ts     # 设置状态
│   ├── types/                # 类型定义
│   │   ├── chat.ts              # 聊天类型
│   │   └── model.ts             # 模型类型
│   ├── utils/                # 工具函数
│   │   ├── markdown.ts          # Markdown 处理
│   │   ├── storage.ts           # 本地存储
│   │   └── export.ts            # 数据导出
│   ├── styles/               # 样式文件
│   │   └── index.css            # 全局样式
│   ├── App.tsx               # 根组件
│   └── main.tsx              # 入口文件
├── index.html                # HTML 模板
├── vite.config.ts            # Vite 配置
├── tailwind.config.js        # Tailwind 配置
├── tsconfig.json             # TypeScript 配置
└── package.json              # 依赖配置
```

### 前端核心模块

#### 1. 状态管理 (Zustand Store)

**chatStore.ts** - 聊天状态管理
```typescript
核心状态：
- sessions: Session[]          // 所有会话
- currentSessionId: string     // 当前会话 ID
- config: ChatConfig           // 聊天配置（模型、参数、系统提示）

核心方法：
- createSession()              // 创建新会话
- deleteSession(id)            // 删除会话
- setCurrentSession(id)        // 切换会话
- addMessage(message)          // 添加消息
- updateMessage(id, content)   // 更新消息（流式输出）
- updateConfig(config)         // 更新配置
```

**modelStore.ts** - 模型状态管理
```typescript
核心状态：
- localModels: Model[]         // 本地模型列表
- remoteModels: Model[]        // 远程模型列表

核心方法：
- setLocalModels(models)       // 设置本地模型
- setRemoteModels(models)      // 设置远程模型
```

**settingsStore.ts** - 设置状态管理
```typescript
核心状态：
- apiKeys: Record<string, string>  // API 密钥

核心方法：
- setApiKey(provider, key)     // 设置 API 密钥
```

#### 2. 自定义 Hooks

**useChat.ts** - 聊天核心逻辑
```typescript
功能：
1. 发送消息到后端
2. 处理 SSE 流式响应
3. 实时更新 UI
4. 错误处理

流程：
用户输入 → addMessage (用户消息) 
        → addMessage (空 AI 消息) 
        → chatService.sendMessage (SSE)
        → updateMessage (流式更新)
```

**useModels.ts** - 模型加载逻辑
```typescript
功能：
1. 从后端加载本地模型列表
2. 从后端加载远程模型列表
3. 自动选择第一个可用模型
4. 错误处理
```

#### 3. UI 组件层次

```
App
└── Layout
    ├── Sidebar
    │   ├── Logo
    │   ├── NewChatButton
    │   └── SessionList
    │       └── SessionItem[]
    └── ChatContainer
        ├── Header
        │   ├── ModelSelector
        │   └── Settings
        ├── MessageList
        │   └── MessageItem[]
        │       ├── Avatar
        │       ├── ContentBubble
        │       └── Markdown
        └── InputBox
```

#### 4. 数据持久化

```typescript
localStorage 存储：
- 'ai-talk-sessions'     // 所有会话数据
- 'ai-talk-current-id'   // 当前会话 ID
- 'ai-talk-config'       // 聊天配置
- 'ai-talk-api-keys'     // API 密钥
```

---

## ⚙️ 后端架构

### 目录结构

```
backend/
├── src/
│   ├── config/               # 配置
│   │   └── default.ts           # 默认配置
│   ├── middleware/           # 中间件
│   │   ├── cors.ts              # CORS 配置
│   │   ├── logger.ts            # 日志记录
│   │   └── errorHandler.ts      # 错误处理
│   ├── routes/               # 路由
│   │   ├── index.ts             # 主路由
│   │   ├── chat.ts              # 聊天路由
│   │   ├── models.ts            # 模型路由
│   │   └── config.ts            # 配置路由
│   ├── services/             # 服务层
│   │   ├── base/
│   │   │   └── AIService.ts     # AI 服务基类
│   │   ├── ollama/
│   │   │   └── OllamaService.ts # Ollama 服务
│   │   ├── openai/
│   │   │   └── OpenAIService.ts # OpenAI 服务
│   │   ├── claude/
│   │   │   └── ClaudeService.ts # Claude 服务
│   │   └── modelFactory.ts      # 服务工厂
│   ├── types/                # 类型定义
│   │   ├── chat.ts              # 聊天类型
│   │   ├── model.ts             # 模型类型
│   │   └── config.ts            # 配置类型
│   └── server.ts             # 服务器入口
├── tsconfig.json             # TypeScript 配置
├── nodemon.json              # 热重载配置
└── package.json              # 依赖配置
```

### 后端核心模块

#### 1. 路由层 (Routes)

**chat.ts** - 聊天路由
```typescript
POST /api/chat/stream          // 流式对话
- 接收消息列表和配置
- 使用 SSE 返回流式响应
- 支持停止生成

POST /api/chat                 // 普通对话（备用）
- 返回完整响应

POST /api/chat/stop            // 停止生成
- 终止当前对话流
```

**models.ts** - 模型路由
```typescript
GET /api/models/local          // 获取本地模型列表
- 调用 Ollama API

GET /api/models/remote         // 获取远程模型列表
- 返回预定义的 OpenAI/Claude 模型
```

**config.ts** - 配置路由
```typescript
GET /api/config/preferences    // 获取用户偏好
POST /api/config/preferences   // 保存用户偏好
POST /api/config/api-keys      // 保存 API 密钥
```

#### 2. 服务层 (Services)

**AIService (抽象基类)**
```typescript
抽象方法：
- streamChat(messages, config, onChunk, onComplete)
  // 流式对话
- chat(messages, config)
  // 普通对话
- stop()
  // 停止生成
```

**OllamaService** - 本地模型服务
```typescript
实现：
1. 连接本地 Ollama API (http://localhost:11434)
2. 支持流式和非流式对话
3. 处理 JSON 流响应
4. 支持中断生成

特点：
- 完全离线
- 支持多种开源模型
- 低延迟
```

**OpenAIService** - OpenAI 服务
```typescript
实现：
1. 使用 OpenAI SDK
2. 支持 GPT-3.5/GPT-4 系列
3. 流式输出
4. Token 计费

配置：
- API Key 验证
- 超时设置
- 重试机制
```

**ClaudeService** - Anthropic Claude 服务
```typescript
实现：
1. 使用 Anthropic SDK
2. 支持 Claude 3 系列
3. 流式输出
4. 系统提示支持

配置：
- API Key 验证
- 版本控制
```

**modelFactory.ts** - 服务工厂
```typescript
功能：
根据模型提供商创建对应的服务实例

createAIService(provider, apiKey?) 
  → OllamaService | OpenAIService | ClaudeService
```

#### 3. 中间件层

```typescript
cors.ts         // 跨域配置
logger.ts       // 请求日志
errorHandler.ts // 统一错误处理
```

---

## 🔄 数据流程

### 1. 用户发送消息流程

```
┌─────────────────────────────────────────────────────────────┐
│ 1. 用户在 InputBox 输入消息并点击发送                        │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. useChat.sendMessage() 被调用                             │
│    - addMessage(用户消息) → chatStore                       │
│    - addMessage(空 AI 消息) → chatStore                     │
│    - 获取 assistantMessageId                                │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. chatService.sendMessage() 发送请求                       │
│    POST /api/chat/stream                                    │
│    {                                                        │
│      messages: [...],                                       │
│      config: { model, temperature, ... }                    │
│    }                                                        │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. 后端路由处理 (chat.ts)                                   │
│    - 验证请求                                               │
│    - 提取 messages 和 config                                │
│    - 创建 AI Service                                        │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 5. AI Service 处理                                          │
│    - OllamaService / OpenAIService / ClaudeService          │
│    - 调用对应的 API                                         │
│    - 建立流式连接                                           │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 6. SSE 流式响应                                             │
│    data: {"content": "你"}                                  │
│    data: {"content": "好"}                                  │
│    data: {"content": "！"}                                  │
│    data: [DONE]                                             │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 7. 前端 EventSource 接收                                    │
│    - onChunk: 累积内容                                      │
│    - updateMessage(id, 累积内容) → chatStore               │
│    - UI 实时更新                                            │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 8. 对话完成                                                 │
│    - 保存到 localStorage                                    │
│    - 更新会话时间戳                                         │
└─────────────────────────────────────────────────────────────┘
```

### 2. 模型加载流程

```
┌─────────────────────────────────────────────────────────────┐
│ 1. 页面加载，useModels Hook 初始化                          │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
┌──────────────────┐      ┌──────────────────┐
│ loadLocalModels  │      │ loadRemoteModels │
└────────┬─────────┘      └────────┬─────────┘
         │                         │
         ▼                         ▼
┌──────────────────┐      ┌──────────────────┐
│ GET /api/models/ │      │ GET /api/models/ │
│     local        │      │     remote       │
└────────┬─────────┘      └────────┬─────────┘
         │                         │
         ▼                         ▼
┌──────────────────┐      ┌──────────────────┐
│ Ollama API       │      │ 预定义模型列表   │
│ 返回本地模型     │      │ GPT/Claude       │
└────────┬─────────┘      └────────┬─────────┘
         │                         │
         └────────────┬────────────┘
                      │
                      ▼
         ┌────────────────────────┐
         │ 更新 modelStore        │
         │ - localModels          │
         │ - remoteModels         │
         └────────────┬───────────┘
                      │
                      ▼
         ┌────────────────────────┐
         │ ModelSelector 显示模型 │
         │ 自动选择第一个可用模型 │
         └────────────────────────┘
```

### 3. 配置管理流程

```
┌─────────────────────────────────────────────────────────────┐
│ 用户打开 Settings 面板                                       │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 显示当前配置                                                 │
│ - 模型参数（Temperature, Max Tokens）                       │
│ - 系统提示                                                   │
│ - API 密钥                                                   │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│ 用户修改配置                                                 │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┴────────────┐
        │                         │
        ▼                         ▼
┌──────────────────┐      ┌──────────────────┐
│ 模型参数/系统提示│      │ API 密钥         │
│ → chatStore      │      │ → settingsStore  │
│ → localStorage   │      │ → localStorage   │
└──────────────────┘      └────────┬─────────┘
                                   │
                                   ▼
                          ┌──────────────────┐
                          │ POST /api/config/│
                          │     api-keys     │
                          │ 保存到后端       │
                          └──────────────────┘
```

---

## 🎯 核心功能实现

### 1. 流式对话 (SSE)

**前端实现** (chatService.ts)
```typescript
const eventSource = new EventSource(`/api/chat/stream?${params}`);

eventSource.onmessage = (event) => {
  if (event.data === '[DONE]') {
    eventSource.close();
    onComplete?.();
  } else {
    const data = JSON.parse(event.data);
    onMessage(data.content); // 实时回调
  }
};
```

**后端实现** (chat.ts)
```typescript
res.setHeader('Content-Type', 'text/event-stream');
res.setHeader('Cache-Control', 'no-cache');
res.setHeader('Connection', 'keep-alive');

let fullContent = '';
await aiService.streamChat(
  messages,
  config,
  (chunk) => {
    fullContent += chunk;
    res.write(`data: ${JSON.stringify({ content: chunk })}\n\n`);
  },
  () => {
    res.write('data: [DONE]\n\n');
    res.end();
  }
);
```

### 2. 多模型支持

**服务工厂模式**
```typescript
export const createAIService = (
  provider: ModelProvider,
  apiKey?: string
): AIService => {
  switch (provider) {
    case 'ollama':
      return new OllamaService();
    case 'openai':
      return new OpenAIService(apiKey);
    case 'claude':
      return new ClaudeService(apiKey);
    default:
      throw new Error(`Unsupported provider: ${provider}`);
  }
};
```

### 3. 状态持久化

**自动保存机制**
```typescript
// chatStore.ts
useEffect(() => {
  // 监听状态变化
  const unsubscribe = useChatStore.subscribe((state) => {
    // 保存到 localStorage
    localStorage.setItem('ai-talk-sessions', JSON.stringify(state.sessions));
    localStorage.setItem('ai-talk-current-id', state.currentSessionId);
    localStorage.setItem('ai-talk-config', JSON.stringify(state.config));
  });
  return unsubscribe;
}, []);
```

### 4. 错误处理

**统一错误处理中间件**
```typescript
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  logger.error('Error:', err);
  
  res.status(500).json({
    error: err.message || 'Internal server error',
    timestamp: new Date().toISOString()
  });
};
```

### 5. 系统提示注入

**前端注入** (useChat.ts)
```typescript
const messagesToSend = config.systemPrompt
  ? [
      { role: 'system', content: config.systemPrompt },
      ...currentSession.messages
    ]
  : currentSession.messages;
```

**后端处理** (各 Service)
```typescript
// 将系统消息转换为对应 API 的格式
const systemMessage = messages.find(m => m.role === 'system');
if (systemMessage) {
  // OpenAI: 直接支持 system role
  // Claude: 使用 system 参数
  // Ollama: 作为第一条消息
}
```

---

## 🔐 安全性考虑

### API 密钥管理

1. **前端**：
   - 仅存储在 localStorage
   - 每次请求时发送到后端
   - 不在 Git 中保存

2. **后端**：
   - 使用环境变量 (.env)
   - 不记录到日志
   - 不在响应中返回

### CORS 配置

```typescript
// 开发环境：允许本地访问
// 生产环境：配置允许的域名
```

---

## 🚀 部署架构

### Docker Compose 部署

```
┌────────────────────────────────────────┐
│           Nginx (80)                   │
│  ┌──────────────────────────────────┐ │
│  │  /       → Frontend (静态文件)   │ │
│  │  /api/*  → Backend (反向代理)    │ │
│  └──────────────────────────────────┘ │
└───────────┬────────────────────────────┘
            │
    ┌───────┴────────┐
    │                │
    ▼                ▼
┌─────────┐    ┌──────────┐
│ Frontend│    │ Backend  │
│ (Nginx) │    │ (Node.js)│
│  Port:  │    │ Port:3080│
│  80     │    └──────────┘
└─────────┘
```

### 环境变量配置

**Backend (.env)**
```env
PORT=3080
OLLAMA_BASE_URL=http://host.docker.internal:11434
OPENAI_API_KEY=sk-...
CLAUDE_API_KEY=sk-ant-...
NODE_ENV=production
```

**Frontend (构建时)**
```env
VITE_API_BASE_URL=/api
```

---

## 📊 性能优化

### 前端优化

1. **代码分割**：Vite 自动代码分割
2. **状态优化**：Zustand 细粒度订阅
3. **组件优化**：React.memo、useCallback
4. **懒加载**：路由懒加载

### 后端优化

1. **流式响应**：减少首字延迟
2. **连接复用**：HTTP Keep-Alive
3. **错误重试**：自动重试机制
4. **日志优化**：结构化日志

---

## 🧪 测试建议

### 前端测试

```bash
# 组件测试
npm run test

# E2E 测试
npm run test:e2e
```

### 后端测试

```bash
# 单元测试
npm run test

# API 测试
curl http://localhost:3080/api/health
```

---

## 📚 扩展建议

### 功能扩展

1. **多用户支持**：添加用户认证系统
2. **对话分享**：生成分享链接
3. **语音输入**：集成语音识别
4. **文件上传**：支持图片、文档
5. **插件系统**：支持自定义插件

### 技术优化

1. **数据库**：使用 PostgreSQL/MongoDB 替代 localStorage
2. **缓存**：添加 Redis 缓存
3. **队列**：使用消息队列处理长任务
4. **监控**：添加 APM 性能监控
5. **日志**：集中式日志管理

---

## 📝 总结

AI Talk 采用了现代化的前后端分离架构：

- **前端**：React + TypeScript + Zustand，提供流畅的用户体验
- **后端**：Node.js + Express + TypeScript，提供统一的 AI 服务接口
- **通信**：HTTP + SSE，实现实时流式对话
- **存储**：localStorage（前端）+ 环境变量（后端）
- **部署**：Docker + Docker Compose，一键部署

整体设计遵循：
- ✅ **关注点分离**：前后端职责明确
- ✅ **可扩展性**：易于添加新的 AI 服务
- ✅ **可维护性**：清晰的目录结构和代码组织
- ✅ **用户体验**：流式响应、实时更新
- ✅ **开发体验**：TypeScript 类型安全、热重载

---

*最后更新：2024-10-22*

