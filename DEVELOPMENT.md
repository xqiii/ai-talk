# 开发指南

本文档提供AI Talk项目的详细开发指南。

## 开发环境设置

### 必需软件

1. **Node.js** 18+ 
   - 下载：https://nodejs.org/
   - 推荐使用nvm管理Node版本

2. **Git**
   - 版本控制工具

3. **Ollama**（可选，用于本地模型）
   - macOS: `brew install ollama`
   - Linux: `curl -fsSL https://ollama.com/install.sh | sh`
   - Windows: 访问 https://ollama.com/download

### 推荐工具

- **VS Code** - 推荐的IDE
- **Postman** - API测试工具
- **Docker Desktop** - 容器化部署

## 项目初始化

### 1. 克隆仓库

```bash
git clone <repository-url>
cd ai-talk
```

### 2. 安装依赖

使用提供的启动脚本（推荐）：

```bash
chmod +x start.sh
./start.sh
```

或手动安装：

```bash
# 后端
cd backend
npm install

# 前端
cd ../frontend
npm install
```

### 3. 环境配置

#### 后端环境变量

复制 `backend/.env.example` 到 `backend/.env`：

```bash
cd backend
cp .env.example .env
```

编辑 `.env` 文件：

```env
PORT=3080
NODE_ENV=development
OLLAMA_BASE_URL=http://localhost:11434
CORS_ORIGIN=http://localhost:5173

# 可选：配置API Keys
# OPENAI_API_KEY=your_openai_key
# ANTHROPIC_API_KEY=your_anthropic_key
```

#### 前端环境变量

复制 `frontend/.env.example` 到 `frontend/.env`：

```bash
cd frontend
cp .env.example .env
```

## 开发工作流

### 启动开发服务器

#### 方式1: 使用启动脚本（推荐）

```bash
./start.sh
```

#### 方式2: 手动启动

在两个终端窗口中：

```bash
# 终端1 - 后端
cd backend
npm run dev

# 终端2 - 前端
cd frontend
npm run dev
```

### 代码规范

项目使用ESLint和Prettier进行代码规范：

```bash
# 后端
cd backend
npm run lint        # 检查代码
npm run format      # 格式化代码

# 前端
cd frontend
npm run lint        # 检查代码
npm run format      # 格式化代码
```

### 构建项目

```bash
# 后端
cd backend
npm run build

# 前端
cd frontend
npm run build
```

## 目录结构详解

### 后端结构

```
backend/
├── src/
│   ├── config/              # 配置文件
│   │   └── default.ts       # 默认配置
│   ├── middleware/          # Express中间件
│   │   ├── cors.ts         # CORS配置
│   │   ├── errorHandler.ts # 错误处理
│   │   └── logger.ts       # 日志中间件
│   ├── routes/             # API路由
│   │   ├── index.ts        # 路由入口
│   │   ├── chat.ts         # 对话路由
│   │   ├── models.ts       # 模型管理路由
│   │   └── config.ts       # 配置管理路由
│   ├── services/           # 业务逻辑层
│   │   ├── base/
│   │   │   └── AIService.ts      # AI服务基类
│   │   ├── ollama/
│   │   │   └── OllamaService.ts  # Ollama服务实现
│   │   ├── openai/
│   │   │   └── OpenAIService.ts  # OpenAI服务实现
│   │   ├── claude/
│   │   │   └── ClaudeService.ts  # Claude服务实现
│   │   └── modelFactory.ts       # 服务工厂
│   ├── types/              # TypeScript类型定义
│   │   ├── chat.ts         # 对话相关类型
│   │   ├── model.ts        # 模型相关类型
│   │   └── config.ts       # 配置相关类型
│   └── server.ts           # 服务器入口
├── package.json
├── tsconfig.json
└── Dockerfile
```

### 前端结构

```
frontend/
├── src/
│   ├── components/         # React组件
│   │   ├── ChatContainer.tsx    # 聊天容器
│   │   ├── MessageList.tsx      # 消息列表
│   │   ├── MessageItem.tsx      # 消息项
│   │   ├── InputBox.tsx         # 输入框
│   │   ├── Sidebar.tsx          # 侧边栏
│   │   ├── ModelSelector.tsx    # 模型选择器
│   │   └── Settings.tsx         # 设置面板
│   ├── hooks/              # 自定义Hooks
│   │   ├── useChat.ts      # 对话Hook
│   │   └── useModels.ts    # 模型Hook
│   ├── services/           # API服务层
│   │   ├── api.ts          # API基础配置
│   │   ├── chatService.ts  # 对话服务
│   │   └── modelService.ts # 模型服务
│   ├── store/              # 状态管理（Zustand）
│   │   ├── chatStore.ts    # 对话状态
│   │   ├── modelStore.ts   # 模型状态
│   │   └── settingsStore.ts# 设置状态
│   ├── types/              # TypeScript类型
│   │   ├── chat.ts         # 对话类型
│   │   └── model.ts        # 模型类型
│   ├── utils/              # 工具函数
│   │   ├── markdown.ts     # Markdown工具
│   │   └── storage.ts      # 存储工具
│   ├── styles/             # 样式文件
│   │   └── index.css       # 全局样式
│   ├── App.tsx             # 主应用组件
│   └── main.tsx            # 应用入口
├── public/
├── index.html
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── Dockerfile
```

## 核心功能开发

### 1. 添加新的AI提供商

1. 在 `backend/src/services/` 创建新目录
2. 实现继承自 `AIService` 的服务类
3. 在 `modelFactory.ts` 中注册新提供商
4. 更新类型定义

示例：

```typescript
// backend/src/services/newprovider/NewProviderService.ts
import { AIService } from '../base/AIService';
import { Message, StreamChunk } from '../../types/chat';

export class NewProviderService extends AIService {
  async listModels() {
    // 实现模型列表获取
  }

  async *createChatStream(
    messages: Message[],
    model: string,
    options?: any
  ): AsyncGenerator<StreamChunk, void, unknown> {
    // 实现流式对话
  }

  async validateConnection(): Promise<boolean> {
    // 实现连接验证
  }
}
```

### 2. 添加新的前端组件

1. 在 `frontend/src/components/` 创建组件文件
2. 使用TypeScript和React Hooks
3. 遵循现有的代码风格
4. 使用Ant Design组件

示例：

```typescript
// frontend/src/components/NewComponent.tsx
import React from 'react';
import { Button } from 'antd';

interface NewComponentProps {
  title: string;
}

export const NewComponent: React.FC<NewComponentProps> = ({ title }) => {
  return (
    <div className="p-4">
      <h2>{title}</h2>
      <Button type="primary">点击我</Button>
    </div>
  );
};
```

### 3. 添加新的API端点

1. 在 `backend/src/routes/` 中添加路由
2. 实现业务逻辑
3. 更新类型定义
4. 添加错误处理

示例：

```typescript
// backend/src/routes/newroute.ts
import { Router, Request, Response } from 'express';

const router = Router();

router.get('/example', async (req: Request, res: Response) => {
  try {
    // 业务逻辑
    res.json({ success: true });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
```

## 测试

### 后端测试

```bash
cd backend

# 运行测试（需要先添加测试）
npm test

# 测试特定文件
npm test -- services/ollama
```

### 前端测试

```bash
cd frontend

# 运行测试
npm test

# 测试覆盖率
npm run test:coverage
```

### API测试

使用Postman或curl测试API：

```bash
# 健康检查
curl http://localhost:3080/api/health

# 获取本地模型
curl http://localhost:3080/api/models/local

# 流式对话
curl -N -X POST http://localhost:3080/api/chat/stream \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [{"role": "user", "content": "Hello"}],
    "model": "llama2",
    "provider": "ollama"
  }'
```

## 调试技巧

### 后端调试

1. 使用 `console.log` 或 `morgan` 日志
2. 使用VS Code调试器：

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Backend",
      "runtimeExecutable": "npm",
      "runtimeArgs": ["run", "dev"],
      "cwd": "${workspaceFolder}/backend",
      "console": "integratedTerminal"
    }
  ]
}
```

### 前端调试

1. 使用浏览器开发者工具
2. 使用React DevTools扩展
3. 使用Zustand DevTools

## 常见问题

### 1. Ollama连接失败

确保Ollama服务正在运行：

```bash
# 启动Ollama
ollama serve

# 测试连接
curl http://localhost:11434/api/tags
```

### 2. CORS错误

检查后端 `.env` 文件中的 `CORS_ORIGIN` 配置是否正确。

### 3. 前端无法连接后端

检查Vite代理配置 `frontend/vite.config.ts`。

### 4. 模型列表为空

确保：
- Ollama服务运行中
- 已拉取至少一个模型：`ollama pull llama2`
- API Key配置正确（远程模型）

## 部署

### 开发环境

使用 `./start.sh` 脚本

### 生产环境

使用Docker Compose：

```bash
# 构建并启动
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止
docker-compose down
```

## 贡献指南

1. Fork仓库
2. 创建功能分支：`git checkout -b feature/AmazingFeature`
3. 提交更改：`git commit -m 'Add some AmazingFeature'`
4. 推送到分支：`git push origin feature/AmazingFeature`
5. 提交Pull Request

### 代码审查清单

- [ ] 代码符合项目风格
- [ ] 通过所有测试
- [ ] 添加必要的注释
- [ ] 更新相关文档
- [ ] 无console.log调试代码

## 资源链接

- [React文档](https://react.dev/)
- [Express文档](https://expressjs.com/)
- [TypeScript文档](https://www.typescriptlang.org/)
- [Ant Design文档](https://ant.design/)
- [Ollama文档](https://github.com/ollama/ollama)
- [OpenAI API文档](https://platform.openai.com/docs)
- [Anthropic API文档](https://docs.anthropic.com/)

## 获取帮助

- 提交Issue
- 查看文档
- 联系维护者

---

祝开发愉快！🚀

