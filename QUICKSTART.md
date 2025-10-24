# 快速开始指南

## 🚀 5分钟快速启动

### 方式一：使用启动脚本（推荐）

1. **安装依赖并启动**

```bash
chmod +x start.sh
./start.sh
```

2. **打开浏览器**

访问 http://localhost:5173

就这么简单！🎉

---

### 方式二：手动启动

1. **安装后端依赖**

```bash
cd backend
npm install
```

2. **安装前端依赖**

```bash
cd ../frontend
npm install
```

3. **启动后端**（新终端）

```bash
cd backend
npm run dev
```

4. **启动前端**（新终端）

```bash
cd frontend
npm run dev
```

5. **打开浏览器**

访问 http://localhost:5173

---

### 方式三：使用Docker

```bash
docker-compose up -d
```

访问 http://localhost

---

## 📝 首次使用

### 使用本地模型（Ollama）

1. **安装Ollama**

```bash
# macOS
brew install ollama

# Linux
curl -fsSL https://ollama.com/install.sh | sh
```

2. **启动Ollama**

```bash
ollama serve
```

3. **拉取模型**

```bash
ollama pull llama2
# 或其他模型
ollama pull mistral
ollama pull codellama
```

4. **在应用中使用**

- 提供商选择：Ollama (本地)
- 模型选择：llama2（或你拉取的其他模型）
- 开始对话！

### 使用远程模型（OpenAI/Claude）

1. **获取API Key**

- OpenAI: https://platform.openai.com/api-keys
- Claude: https://console.anthropic.com/

2. **配置API Key**

- 点击应用右上角的"设置"
- 在"API配置"标签页输入API Key
- 点击"保存"

3. **选择模型**

- 提供商：OpenAI 或 Claude
- 模型：选择可用的模型
- 开始对话！

---

## ⚡ 常用命令

```bash
# 开发模式启动
./start.sh

# 构建生产版本
cd backend && npm run build
cd frontend && npm run build

# 代码检查
cd backend && npm run lint
cd frontend && npm run lint

# 代码格式化
cd backend && npm run format
cd frontend && npm run format

# Docker部署
docker-compose up -d          # 启动
docker-compose logs -f        # 查看日志
docker-compose down           # 停止
```

---

## 🔍 验证安装

### 检查后端

```bash
curl http://localhost:3080/api/health
```

应该返回：
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 检查前端

打开浏览器访问 http://localhost:5173，应该看到应用界面。

### 检查Ollama

```bash
curl http://localhost:11434/api/tags
```

应该返回已安装的模型列表。

---

## 💡 小贴士

1. **温度参数**：控制回答的创造性
   - 0-0.5：精确、确定
   - 0.5-1.0：平衡
   - 1.0-2.0：创造、随机

2. **最大令牌数**：控制回答的长度
   - 256：简短回答
   - 2048：正常回答
   - 4096：详细回答

3. **快捷键**
   - Enter：发送消息
   - Shift+Enter：换行

4. **Markdown支持**
   - 代码高亮
   - 表格
   - 列表
   - 引用

---

## ❓ 遇到问题？

### Ollama连接失败

```bash
# 确保Ollama运行中
ollama serve

# 检查模型列表
ollama list
```

### 端口被占用

修改配置文件中的端口：
- 后端：`backend/.env` 中的 `PORT`
- 前端：`frontend/vite.config.ts` 中的 `port`

### 依赖安装失败

```bash
# 清除缓存重试
rm -rf node_modules package-lock.json
npm install
```

---

## 📚 更多信息

- 完整文档：[README.md](./README.md)
- 开发指南：[DEVELOPMENT.md](./DEVELOPMENT.md)
- 项目计划：[TARGET.md](./TARGET.md)

---

开始享受与AI对话吧！🤖✨

