#!/bin/bash

echo "======================================"
echo "  AI Talk 开发环境启动脚本"
echo "======================================"
echo ""

# 检查Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未找到Node.js，请先安装Node.js 18+"
    exit 1
fi

echo "✅ Node.js版本: $(node --version)"
echo ""

# 检查后端依赖
if [ ! -d "backend/node_modules" ]; then
    echo "📦 安装后端依赖..."
    cd backend
    npm install
    cd ..
else
    echo "✅ 后端依赖已安装"
fi

# 检查前端依赖
if [ ! -d "frontend/node_modules" ]; then
    echo "📦 安装前端依赖..."
    cd frontend
    npm install
    cd ..
else
    echo "✅ 前端依赖已安装"
fi

echo ""
echo "======================================"
echo "  启动服务..."
echo "======================================"
echo ""
echo "🚀 后端服务将在 http://localhost:3080 启动"
echo "🚀 前端服务将在 http://localhost:5173 启动"
echo ""
echo "提示: 使用 Ctrl+C 停止服务"
echo ""

# 使用trap捕获中断信号
trap 'echo ""; echo "👋 停止服务..."; kill 0' INT

# 启动后端
cd backend
npm run dev &

# 启动前端
cd ../frontend
npm run dev &

# 等待所有后台进程
wait

