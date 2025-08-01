---
title: "n8n 使用指南 - AI工作流自动化平台"
date: 2025-05-20T05:50:00+08:00
categories:
  - 自动化
tags:
  - 自动化
  - 工具
toc: true
toc_label: "目录"
toc_icon: "sitemap"
---

## n8n 简介

n8n 是一个为技术团队设计的安全工作流自动化平台，它结合了代码的灵活性和无代码的快速性。凭借 400+ 集成、原生 AI 能力和公平代码许可证，n8n 让您在保持对数据和部署完全控制的同时构建强大的自动化工作流。

<svg width="600" height="200" xmlns="http://www.w3.org/2000/svg">
  <style>
    .title { font-family: Arial; font-size: 28px; font-weight: bold; fill: #FF6D5A; }
    .subtitle { font-family: Arial; font-size: 16px; fill: #666; }
    .logo { font-family: Arial; font-size: 48px; font-weight: bold; fill: #FF6D5A; }
    .highlight { fill: #4A90E2; }
    .badge { font-family: Arial; font-size: 12px; fill: #FFFFFF; font-weight: bold; }
  </style>
  <rect width="600" height="200" fill="#F8F9FA" rx="12" ry="12" stroke="#DEE2E6" stroke-width="2"/>
  <text x="300" y="70" text-anchor="middle" class="logo">n<tspan class="highlight">8</tspan>n</text>
  <text x="300" y="110" text-anchor="middle" class="title">安全的工作流自动化平台</text>
  <text x="300" y="140" text-anchor="middle" class="subtitle">技术团队的代码灵活性 + 无代码快速性</text>
  
  <!-- GitHub 星标徽章 -->
  <rect x="180" y="160" width="80" height="25" fill="#28A745" rx="12" ry="12"/>
  <text x="220" y="177" text-anchor="middle" class="badge">97.7k ⭐</text>
  
  <!-- 集成数量徽章 -->
  <rect x="280" y="160" width="80" height="25" fill="#FF6D5A" rx="12" ry="12"/>
  <text x="320" y="177" text-anchor="middle" class="badge">400+ 集成</text>
  
  <!-- Fair Code 徽章 -->
  <rect x="380" y="160" width="80" height="25" fill="#4A90E2" rx="12" ry="12"/>
  <text x="420" y="177" text-anchor="middle" class="badge">Fair Code</text>
</svg>

## 核心功能特性

n8n 提供了独特的功能组合，满足现代技术团队的自动化需求：

### 主要特性

- **🔧 需要时编码**：编写 JavaScript/Python，添加 npm 包，或使用可视化界面
- **🤖 AI 原生平台**：基于 LangChain 构建 AI 代理工作流，使用您自己的数据和模型
- **🛡️ 完全控制**：使用公平代码许可证自托管或使用云服务
- **🏢 企业就绪**：高级权限、SSO 和气隙部署
- **🌟 活跃社区**：400+ 集成和 900+ 即用模板

<svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
  <style>
    .feature-card { fill: #FFFFFF; stroke: #E1E5E9; stroke-width: 2; rx: 8; ry: 8; }
    .feature-icon { font-size: 32px; text-anchor: middle; }
    .feature-title { font-family: Arial; font-size: 14px; font-weight: bold; fill: #2C3E50; text-anchor: middle; }
    .feature-desc { font-family: Arial; font-size: 11px; fill: #7F8C8D; text-anchor: middle; }
    .center-node { fill: #FF6D5A; stroke: #E55A4C; stroke-width: 3; }
    .center-text { font-family: Arial; font-size: 16px; font-weight: bold; fill: white; text-anchor: middle; }
    .connection { stroke: #BDC3C7; stroke-width: 2; stroke-dasharray: 4,4; }
  </style>
  
  <!-- 中央核心 -->
  <circle cx="300" cy="175" r="45" class="center-node"/>
  <text x="300" y="170" class="center-text">n8n</text>
  <text x="300" y="185" class="center-text">核心平台</text>
  
  <!-- 功能卡片 -->
  <!-- 可视化编辑器 -->
  <rect x="80" y="50" width="120" height="80" class="feature-card"/>
  <text x="140" y="75" class="feature-icon">🎨</text>
  <text x="140" y="95" class="feature-title">可视化编辑器</text>
  <text x="140" y="110" class="feature-desc">拖拽式工作流</text>
  <text x="140" y="120" class="feature-desc">无代码构建</text>
  
  <!-- 代码集成 -->
  <rect x="400" y="50" width="120" height="80" class="feature-card"/>
  <text x="460" y="75" class="feature-icon">💻</text>
  <text x="460" y="95" class="feature-title">代码集成</text>
  <text x="460" y="110" class="feature-desc">JavaScript/Python</text>
  <text x="460" y="120" class="feature-desc">NPM 包支持</text>
  
  <!-- AI 能力 -->
  <rect x="80" y="220" width="120" height="80" class="feature-card"/>
  <text x="140" y="245" class="feature-icon">🤖</text>
  <text x="140" y="265" class="feature-title">AI 能力</text>
  <text x="140" y="280" class="feature-desc">LangChain 集成</text>
  <text x="140" y="290" class="feature-desc">智能代理</text>
  
  <!-- 企业功能 -->
  <rect x="400" y="220" width="120" height="80" class="feature-card"/>
  <text x="460" y="245" class="feature-icon">🏢</text>
  <text x="460" y="265" class="feature-title">企业功能</text>
  <text x="460" y="280" class="feature-desc">SSO + 权限</text>
  <text x="460" y="290" class="feature-desc">气隙部署</text>
  
  <!-- 400+ 集成 -->
  <rect x="240" y="50" width="120" height="80" class="feature-card"/>
  <text x="300" y="75" class="feature-icon">🔗</text>
  <text x="300" y="95" class="feature-title">400+ 集成</text>
  <text x="300" y="110" class="feature-desc">主流服务</text>
  <text x="300" y="120" class="feature-desc">API 连接</text>
  
  <!-- 自托管 -->
  <rect x="240" y="220" width="120" height="80" class="feature-card"/>
  <text x="300" y="245" class="feature-icon">🛡️</text>
  <text x="300" y="265" class="feature-title">自托管</text>
  <text x="300" y="280" class="feature-desc">数据掌控</text>
  <text x="300" y="290" class="feature-desc">安全部署</text>
  
  <!-- 连接线 -->
  <path d="M255 175 L200 90" class="connection" />
  <path d="M345 175 L400 90" class="connection" />
  <path d="M300 130 L300 100" class="connection" />
  <path d="M255 175 L200 260" class="connection" />
  <path d="M345 175 L400 260" class="connection" />
  <path d="M300 220 L300 250" class="connection" />
</svg>

## 快速开始

### 方法一：使用 npx（推荐新手）

最快速的体验方式，适合快速试用：

```bash
npx n8n
```

<svg width="600" height="150" xmlns="http://www.w3.org/2000/svg">
  <style>
    .quick-card { fill: #E8F5E8; stroke: #28A745; stroke-width: 2; rx: 8; ry: 8; }
    .quick-title { font-family: Arial; font-size: 16px; font-weight: bold; fill: #155724; }
    .quick-step { font-family: Arial; font-size: 12px; fill: #155724; }
    .quick-code { font-family: monospace; font-size: 14px; fill: #28A745; font-weight: bold; }
  </style>
  
  <rect x="30" y="20" width="540" height="110" class="quick-card"/>
  <text x="50" y="45" class="quick-title">⚡ 快速启动步骤</text>
  <text x="50" y="70" class="quick-step">1. 确保已安装 Node.js (版本 18.10 或更高)</text>
  <text x="50" y="90" class="quick-step">2. 运行命令：</text>
  <text x="70" y="110" class="quick-code">npx n8n</text>
  <text x="50" y="125" class="quick-step">3. 访问 http://localhost:5678 开始使用</text>
</svg>

### 方法二：使用 Docker（推荐生产环境）

适合长期使用和生产部署：

```bash
# 创建数据卷
docker volume create n8n_data

# 运行 n8n 容器
docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n
```

### 方法三：Docker Compose（推荐企业部署）

创建 `docker-compose.yml` 文件：

```yaml
version: '3.8'

services:
  n8n:
    image: docker.n8n.io/n8nio/n8n
    restart: always
    ports:
      - "5678:5678"
    environment:
      - N8N_BASIC_AUTH_ACTIVE=true
      - N8N_BASIC_AUTH_USER=admin
      - N8N_BASIC_AUTH_PASSWORD=your_password
    volumes:
      - n8n_data:/home/node/.n8n

volumes:
  n8n_data:
```

## 工作流基础概念

### 核心组件解析

<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
  <style>
    .concept-box { fill: #F8F9FA; stroke: #DEE2E6; stroke-width: 2; rx: 10; ry: 10; }
    .concept-title { font-family: Arial; font-size: 16px; font-weight: bold; fill: #495057; text-anchor: middle; }
    .concept-desc { font-family: Arial; font-size: 12px; fill: #6C757D; text-anchor: middle; }
    .workflow-arrow { stroke: #FF6D5A; stroke-width: 3; fill: none; marker-end: url(#workflow-arrow); }
    .node-circle { fill: #4A90E2; stroke: #357ABD; stroke-width: 2; }
    .node-text { font-family: Arial; font-size: 12px; fill: white; text-anchor: middle; font-weight: bold; }
  </style>
  
  <defs>
    <marker id="workflow-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#FF6D5A" />
    </marker>
  </defs>
  
  <!-- 标题 -->
  <text x="300" y="30" class="concept-title">n8n 工作流核心概念</text>
  
  <!-- 触发器节点 -->
  <rect x="50" y="70" width="100" height="80" class="concept-box"/>
  <circle cx="100" cy="95" r="15" fill="#28A745"/>
  <text x="100" y="100" class="node-text">触发器</text>
  <text x="100" y="125" class="concept-desc">启动工作流</text>
  <text x="100" y="140" class="concept-desc">定时/事件/手动</text>
  
  <!-- 处理节点 -->
  <rect x="200" y="70" width="100" height="80" class="concept-box"/>
  <circle cx="250" cy="95" r="15" class="node-circle"/>
  <text x="250" y="100" class="node-text">处理</text>
  <text x="250" y="125" class="concept-desc">数据处理</text>
  <text x="250" y="140" class="concept-desc">逻辑运算</text>
  
  <!-- 集成节点 -->
  <rect x="350" y="70" width="100" height="80" class="concept-box"/>
  <circle cx="400" cy="95" r="15" fill="#FFC107"/>
  <text x="400" y="100" class="node-text">集成</text>
  <text x="400" y="125" class="concept-desc">外部服务</text>
  <text x="400" y="140" class="concept-desc">API 调用</text>
  
  <!-- 输出节点 -->
  <rect x="500" y="70" width="80" height="80" class="concept-box"/>
  <circle cx="540" cy="95" r="15" fill="#DC3545"/>
  <text x="540" y="100" class="node-text">输出</text>
  <text x="540" y="125" class="concept-desc">结果处理</text>
  <text x="540" y="140" class="concept-desc">通知/存储</text>
  
  <!-- 连接箭头 -->
  <path d="M150 110 L200 110" class="workflow-arrow" />
  <path d="M300 110 L350 110" class="workflow-arrow" />
  <path d="M450 110 L500 110" class="workflow-arrow" />
  
  <!-- 数据流说明 -->
  <rect x="80" y="200" width="440" height="150" class="concept-box"/>
  <text x="300" y="225" class="concept-title">数据流转机制</text>
  
  <text x="100" y="250" style="font-family: Arial; font-size: 14px; fill: #495057; font-weight: bold;">1. 数据传递</text>
  <text x="110" y="270" style="font-family: Arial; font-size: 12px; fill: #6C757D;">• 节点间通过 JSON 格式传递数据</text>
  <text x="110" y="285" style="font-family: Arial; font-size: 12px; fill: #6C757D;">• 支持批量数据处理</text>
  
  <text x="300" y="250" style="font-family: Arial; font-size: 14px; fill: #495057; font-weight: bold;">2. 错误处理</text>
  <text x="310" y="270" style="font-family: Arial; font-size: 12px; fill: #6C757D;">• 可配置错误重试策略</text>
  <text x="310" y="285" style="font-family: Arial; font-size: 12px; fill: #6C757D;">• 条件分支处理</text>
  
  <text x="100" y="310" style="font-family: Arial; font-size: 14px; fill: #495057; font-weight: bold;">3. 执行模式</text>
  <text x="110" y="330" style="font-family: Arial; font-size: 12px; fill: #6C757D;">• 手动执行：测试和调试</text>
  <text x="110" y="345" style="font-family: Arial; font-size: 12px; fill: #6C757D;">• 自动执行：生产环境运行</text>
  
  <text x="300" y="310" style="font-family: Arial; font-size: 14px; fill: #495057; font-weight: bold;">4. 监控日志</text>
  <text x="310" y="330" style="font-family: Arial; font-size: 12px; fill: #6C757D;">• 执行历史记录</text>
  <text x="310" y="345" style="font-family: Arial; font-size: 12px; fill: #6C757D;">• 性能指标分析</text>
</svg>

## 创建第一个工作流

### 示例：自动化邮件通知工作流

让我们创建一个简单但实用的工作流，演示 n8n 的核心功能：

<svg width="600" height="300" xmlns="http://www.w3.org/2000/svg">
  <style>
    .demo-card { fill: #FFF3CD; stroke: #FFEAA7; stroke-width: 2; rx: 8; ry: 8; }
    .demo-title { font-family: Arial; font-size: 16px; font-weight: bold; fill: #856404; }
    .demo-step { font-family: Arial; font-size: 12px; fill: #856404; }
    .demo-node { fill: #17A2B8; stroke: #138496; stroke-width: 2; rx: 20; ry: 20; }
    .demo-node-text { font-family: Arial; font-size: 11px; fill: white; text-anchor: middle; font-weight: bold; }
    .demo-arrow { stroke: #FF6D5A; stroke-width: 2; fill: none; marker-end: url(#demo-arrow); }
  </style>
  
  <defs>
    <marker id="demo-arrow" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#FF6D5A" />
    </marker>
  </defs>
  
  <!-- 标题区域 -->
  <rect x="30" y="20" width="540" height="40" class="demo-card"/>
  <text x="300" y="45" text-anchor="middle" class="demo-title">💡 示例工作流：自动化邮件通知系统</text>
  
  <!-- 工作流节点 -->
  <rect x="80" y="100" width="80" height="40" class="demo-node"/>
  <text x="120" y="115" class="demo-node-text">定时触发</text>
  <text x="120" y="125" class="demo-node-text">每日 9:00</text>
  
  <rect x="200" y="100" width="80" height="40" class="demo-node"/>
  <text x="240" y="115" class="demo-node-text">HTTP 请求</text>
  <text x="240" y="125" class="demo-node-text">获取数据</text>
  
  <rect x="320" y="100" width="80" height="40" class="demo-node"/>
  <text x="360" y="115" class="demo-node-text">数据处理</text>
  <text x="360" y="125" class="demo-node-text">格式化</text>
  
  <rect x="440" y="100" width="80" height="40" class="demo-node"/>
  <text x="480" y="115" class="demo-node-text">发送邮件</text>
  <text x="480" y="125" class="demo-node-text">Gmail</text>
  
  <!-- 连接箭头 -->
  <path d="M160 120 L200 120" class="demo-arrow" />
  <path d="M280 120 L320 120" class="demo-arrow" />
  <path d="M400 120 L440 120" class="demo-arrow" />
  
  <!-- 配置步骤 -->
  <rect x="50" y="170" width="500" height="110" class="demo-card"/>
  <text x="70" y="195" class="demo-title">🛠️ 配置步骤</text>
  
  <text x="70" y="220" class="demo-step">1. 拖拽"Schedule Trigger"节点，设置为每日 9:00 触发</text>
  <text x="70" y="235" class="demo-step">2. 添加"HTTP Request"节点，配置 API 端点获取数据</text>
  <text x="70" y="250" class="demo-step">3. 使用"Set"节点处理和格式化返回的数据</text>
  <text x="70" y="265" class="demo-step">4. 配置"Gmail"节点发送包含处理结果的邮件</text>
</svg>

### 演示视频指南

**🎥 推荐观看顺序：**

1. **[n8n 入门介绍](https://www.youtube.com/watch?v=1MwSoB0gnM4)** - 官方入门教程
2. **[创建第一个工作流](https://www.youtube.com/watch?v=Ie6Z6FdJwjk)** - 基础操作演示
3. **[高级工作流技巧](https://www.youtube.com/watch?v=BuORBBzFe88)** - 进阶功能详解

## AI 集成与 LangChain

n8n 原生支持 AI 功能，特别是与 LangChain 的深度集成：

### AI 功能特性

<svg width="600" height="320" xmlns="http://www.w3.org/2000/svg">
  <style>
    .ai-card { fill: #E7F3FF; stroke: #4A90E2; stroke-width: 2; rx: 10; ry: 10; }
    .ai-title { font-family: Arial; font-size: 16px; font-weight: bold; fill: #2C5AA0; text-anchor: middle; }
    .ai-feature { font-family: Arial; font-size: 12px; fill: #2C5AA0; }
    .ai-icon { font-size: 24px; }
    .langchain-box { fill: #F0F8FF; stroke: #4169E1; stroke-width: 2; rx: 8; ry: 8; }
  </style>
  
  <!-- AI 功能概览 -->
  <rect x="30" y="20" width="540" height="280" class="ai-card"/>
  <text x="300" y="45" class="ai-title">🤖 n8n AI 与 LangChain 集成能力</text>
  
  <!-- LangChain 集成 -->
  <rect x="60" y="70" width="200" height="100" class="langchain-box"/>
  <text x="80" y="90" style="font-family: Arial; font-size: 14px; font-weight: bold; fill: #4169E1;">🔗 LangChain 集成</text>
  <text x="80" y="110" class="ai-feature">• 文档检索和问答</text>
  <text x="80" y="125" class="ai-feature">• 向量数据库支持</text>
  <text x="80" y="140" class="ai-feature">• 多种 LLM 连接</text>
  <text x="80" y="155" class="ai-feature">• 智能代理构建</text>
  
  <!-- AI 模型支持 -->
  <rect x="280" y="70" width="200" height="100" class="langchain-box"/>
  <text x="300" y="90" style="font-family: Arial; font-size: 14px; font-weight: bold; fill: #4169E1;">🧠 AI 模型支持</text>
  <text x="300" y="110" class="ai-feature">• OpenAI GPT 系列</text>
  <text x="300" y="125" class="ai-feature">• Claude (Anthropic)</text>
  <text x="300" y="140" class="ai-feature">• Google PaLM</text>
  <text x="300" y="155" class="ai-feature">• 本地模型支持</text>
  
  <!-- AI 应用场景 -->
  <rect x="60" y="190" width="200" height="100" class="langchain-box"/>
  <text x="80" y="210" style="font-family: Arial; font-size: 14px; font-weight: bold; fill: #4169E1;">💡 应用场景</text>
  <text x="80" y="230" class="ai-feature">• 智能客服机器人</text>
  <text x="80" y="245" class="ai-feature">• 文档自动分析</text>
  <text x="80" y="260" class="ai-feature">• 内容生成和摘要</text>
  <text x="80" y="275" class="ai-feature">• 数据智能处理</text>
  
  <!-- 数据安全 -->
  <rect x="280" y="190" width="200" height="100" class="langchain-box"/>
  <text x="300" y="210" style="font-family: Arial; font-size: 14px; font-weight: bold; fill: #4169E1;">🔒 数据安全</text>
  <text x="300" y="230" class="ai-feature">• 私有数据训练</text>
  <text x="300" y="245" class="ai-feature">• 本地模型运行</text>
  <text x="300" y="260" class="ai-feature">• 加密数据传输</text>
  <text x="300" y="275" class="ai-feature">• 合规性保证</text>
</svg>

### AI 工作流示例

```javascript
// n8n 中的 AI 代码示例
// JavaScript 代码节点中使用 OpenAI
const openai = this.getNodeParameter('ai');
const userQuery = $json.query;

const response = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [
    {
      role: "system",
      content: "你是一个专业的客服助手"
    },
    {
      role: "user", 
      content: userQuery
    }
  ]
});

return { answer: response.choices[0].message.content };
```

## 热门集成服务

n8n 提供 400+ 集成，覆盖各种主流服务：

<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
  <style>
    .integration-category { fill: #F8F9FA; stroke: #DEE2E6; stroke-width: 2; rx: 8; ry: 8; }
    .category-title { font-family: Arial; font-size: 14px; font-weight: bold; fill: #495057; }
    .service-item { font-family: Arial; font-size: 11px; fill: #6C757D; }
    .category-icon { font-size: 20px; }
  </style>
  
  <!-- 标题 -->
  <text x="300" y="25" text-anchor="middle" style="font-family: Arial; font-size: 18px; font-weight: bold; fill: #2C3E50;">🔗 主要集成服务分类</text>
  
  <!-- 通信协作 -->
  <rect x="30" y="50" width="170" height="140" class="integration-category"/>
  <text x="40" y="70" class="category-icon">💬</text>
  <text x="65" y="75" class="category-title">通信协作</text>
  <text x="40" y="95" class="service-item">• Slack</text>
  <text x="40" y="110" class="service-item">• Microsoft Teams</text>
  <text x="40" y="125" class="service-item">• Discord</text>
  <text x="40" y="140" class="service-item">• Telegram</text>
  <text x="40" y="155" class="service-item">• Zoom</text>
  <text x="40" y="170" class="service-item">• Gmail / Outlook</text>
  
  <!-- 数据存储 -->
  <rect x="220" y="50" width="170" height="140" class="integration-category"/>
  <text x="230" y="70" class="category-icon">💾</text>
  <text x="255" y="75" class="category-title">数据存储</text>
  <text x="230" y="95" class="service-item">• MySQL / PostgreSQL</text>
  <text x="230" y="110" class="service-item">• MongoDB</text>
  <text x="230" y="125" class="service-item">• Redis</text>
  <text x="230" y="140" class="service-item">• Google Sheets</text>
  <text x="230" y="155" class="service-item">• Airtable</text>
  <text x="230" y="170" class="service-item">• AWS S3</text>
  
  <!-- 云服务 -->
  <rect x="410" y="50" width="170" height="140" class="integration-category"/>
  <text x="420" y="70" class="category-icon">☁️</text>
  <text x="445" y="75" class="category-title">云服务</text>
  <text x="420" y="95" class="service-item">• AWS (EC2, Lambda)</text>
  <text x="420" y="110" class="service-item">• Google Cloud</text>
  <text x="420" y="125" class="service-item">• Microsoft Azure</text>
  <text x="420" y="140" class="service-item">• Heroku</text>
  <text x="420" y="155" class="service-item">• DigitalOcean</text>
  <text x="420" y="170" class="service-item">• Vercel</text>
  
  <!-- 开发工具 -->
  <rect x="30" y="210" width="170" height="140" class="integration-category"/>
  <text x="40" y="230" class="category-icon">⚙️</text>
  <text x="65" y="235" class="category-title">开发工具</text>
  <text x="40" y="255" class="service-item">• GitHub / GitLab</text>
  <text x="40" y="270" class="service-item">• Jira</text>
  <text x="40" y="285" class="service-item">• Jenkins</text>
  <text x="40" y="300" class="service-item">• Docker</text>
  <text x="40" y="315" class="service-item">• Kubernetes</text>
  <text x="40" y="330" class="service-item">• Webhook</text>
  
  <!-- 商业应用 -->
  <rect x="220" y="210" width="170" height="140" class="integration-category"/>
  <text x="230" y="230" class="category-icon">💼</text>
  <text x="255" y="235" class="category-title">商业应用</text>
  <text x="230" y="255" class="service-item">• Salesforce</text>
  <text x="230" y="270" class="service-item">• HubSpot</text>
  <text x="230" y="285" class="service-item">• Shopify</text>
  <text x="230" y="300" class="service-item">• Stripe</text>
  <text x="230" y="315" class="service-item">• QuickBooks</text>
  <text x="230" y="330" class="service-item">• Notion</text>
  
  <!-- 社交媒体 -->
  <rect x="410" y="210" width="170" height="140" class="integration-category"/>
  <text x="420" y="230" class="category-icon">📱</text>
  <text x="445" y="235" class="category-title">社交媒体</text>
  <text x="420" y="255" class="service-item">• Twitter / X</text>
  <text x="420" y="270" class="service-item">• Facebook</text>
  <text x="420" y="285" class="service-item">• Instagram</text>
  <text x="420" y="300" class="service-item">• LinkedIn</text>
  <text x="420" y="315" class="service-item">• YouTube</text>
  <text x="420" y="330" class="service-item">• TikTok</text>
</svg>

## 高级功能详解

### 1. 环境变量和凭证管理

n8n 提供安全的凭证管理系统：

```bash
# 设置环境变量
export N8N_BASIC_AUTH_ACTIVE=true
export N8N_BASIC_AUTH_USER=admin
export N8N_BASIC_AUTH_PASSWORD=secure_password

# 数据库配置
export DB_TYPE=postgresdb
export DB_POSTGRESDB_HOST=localhost
export DB_POSTGRESDB_PORT=5432
export DB_POSTGRESDB_DATABASE=n8n
export DB_POSTGRESDB_USER=n8n_user
export DB_POSTGRESDB_PASSWORD=n8n_password
```

### 2. 代码节点高级用法

**JavaScript 代码节点示例：**

```javascript
// 处理复杂数据转换
const inputData = $json;
const processedData = inputData.items.map(item => {
  return {
    id: item.id,
    name: item.full_name.toUpperCase(),
    email: item.contact.email,
    created_at: new Date(item.timestamp).toISOString(),
    tags: item.categories.filter(cat => cat.active).map(cat => cat.name)
  };
});

// 调用外部 API
const axios = require('axios');
const response = await axios.post('https://api.example.com/process', {
  data: processedData,
  metadata: {
    workflow_id: $workflow.id,
    execution_id: $execution.id
  }
});

return { processed: processedData, api_response: response.data };
```

**Python 代码节点示例：**

```python
import pandas as pd
import numpy as np
from datetime import datetime

# 获取输入数据
data = _json['data']

# 使用 pandas 处理数据
df = pd.DataFrame(data)
df['processed_date'] = pd.to_datetime(df['date'])
df['month'] = df['processed_date'].dt.month
df['year'] = df['processed_date'].dt.year

# 数据聚合
summary = df.groupby(['year', 'month']).agg({
    'sales': 'sum',
    'orders': 'count',
    'customers': 'nunique'
}).reset_index()

# 返回结果
return {
    'summary': summary.to_dict('records'),
    'total_sales': df['sales'].sum(),
    'processing_time': datetime.now().isoformat()
}
```

### 3. 错误处理和重试机制

<svg width="600" height="250" xmlns="http://www.w3.org/2000/svg">
  <style>
    .error-card { fill: #FFF5F5; stroke: #FC8181; stroke-width: 2; rx: 8; ry: 8; }
    .error-title { font-family: Arial; font-size: 14px; font-weight: bold; fill: #C53030; }
    .error-text { font-family: Arial; font-size: 12px; fill: #C53030; }
    .success-card { fill: #F0FFF4; stroke: #68D391; stroke-width: 2; rx: 8; ry: 8; }
    .success-text { font-family: Arial; font-size: 12px; fill: #2F855A; }
  </style>
  
  <!-- 错误处理策略 -->
  <rect x="30" y="20" width="540" height="210" class="error-card"/>
  <text x="50" y="45" class="error-title">🛠️ 错误处理和重试策略</text>
  
  <text x="50" y="70" class="error-text">1. 重试配置</text>
  <text x="70" y="90" class="error-text">• 重试次数：1-10 次</text>
  <text x="70" y="105" class="error-text">• 重试间隔：线性或指数退避</text>
  <text x="70" y="120" class="error-text">• 重试条件：HTTP 状态码、错误类型</text>
  
  <text x="300" y="70" class="error-text">2. 错误输出</text>
  <text x="320" y="90" class="error-text">• 错误分支处理</text>
  <text x="320" y="105" class="error-text">• 自定义错误消息</text>
  <text x="320" y="120" class="error-text">• 通知管理员</text>
  
  <text x="50" y="150" class="error-text">3. 条件分支</text>
  <text x="70" y="170" class="error-text">• IF 节点条件判断</text>
  <text x="70" y="185" class="error-text">• Switch 节点多路分支</text>
  <text x="70" y="200" class="error-text">• Error Trigger 错误捕获</text>
  
  <text x="300" y="150" class="error-text">4. 监控告警</text>
  <text x="320" y="170" class="error-text">• 执行失败通知</text>
  <text x="320" y="185" class="error-text">• 性能监控</text>
  <text x="320" y="200" class="error-text">• 日志记录</text>
</svg>

## 部署和生产环境配置

### 生产环境推荐配置

<svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
  <style>
    .deploy-card { fill: #E6FFFA; stroke: #319795; stroke-width: 2; rx: 10; ry: 10; }
    .deploy-title { font-family: Arial; font-size: 16px; font-weight: bold; fill: #2C7A7B; text-anchor: middle; }
    .deploy-section { font-family: Arial; font-size: 14px; font-weight: bold; fill: #2C7A7B; }
    .deploy-item { font-family: Arial; font-size: 12px; fill: #2C7A7B; }
  </style>
  
  <rect x="30" y="20" width="540" height="310" class="deploy-card"/>
  <text x="300" y="45" class="deploy-title">🚀 生产环境部署最佳实践</text>
  
  <!-- 基础设施 -->
  <text x="50" y="75" class="deploy-section">📋 基础设施要求</text>
  <text x="70" y="95" class="deploy-item">• CPU: 2+ 核心（推荐 4 核心）</text>
  <text x="70" y="110" class="deploy-item">• 内存: 4GB+（推荐 8GB）</text>
  <text x="70" y="125" class="deploy-item">• 存储: 20GB+（SSD 推荐）</text>
  <text x="70" y="140" class="deploy-item">• 网络: 稳定的互联网连接</text>
  
  <!-- 数据库配置 -->
  <text x="320" y="75" class="deploy-section">🗄️ 数据库配置</text>
  <text x="340" y="95" class="deploy-item">• PostgreSQL（推荐）</text>
  <text x="340" y="110" class="deploy-item">• MySQL 5.7+</text>
  <text x="340" y="125" class="deploy-item">• SQLite（开发环境）</text>
  <text x="340" y="140" class="deploy-item">• 定期备份策略</text>
  
  <!-- 安全配置 -->
  <text x="50" y="170" class="deploy-section">🔒 安全配置</text>
  <text x="70" y="190" class="deploy-item">• HTTPS/SSL 证书</text>
  <text x="70" y="205" class="deploy-item">• 基本认证或 OAuth</text>
  <text x="70" y="220" class="deploy-item">• 防火墙规则</text>
  <text x="70" y="235" class="deploy-item">• 定期安全更新</text>
  
  <!-- 监控运维 -->
  <text x="320" y="170" class="deploy-section">📊 监控运维</text>
  <text x="340" y="190" class="deploy-item">• 日志聚合和分析</text>
  <text x="340" y="205" class="deploy-item">• 性能指标监控</text>
  <text x="340" y="220" class="deploy-item">• 健康检查端点</text>
  <text x="340" y="235" class="deploy-item">• 自动化备份</text>
  
  <!-- 扩展性 -->
  <text x="50" y="265" class="deploy-section">📈 扩展性考虑</text>
  <text x="70" y="285" class="deploy-item">• 负载均衡配置</text>
  <text x="70" y="300" class="deploy-item">• 队列系统（Redis/Bull）</text>
  <text x="70" y="315" class="deploy-item">• 多实例部署</text>
  
  <text x="320" y="265" class="deploy-section">🔄 持续集成</text>
  <text x="340" y="285" class="deploy-item">• Docker 镜像管理</text>
  <text x="340" y="300" class="deploy-item">• 自动化部署</text>
  <text x="340" y="315" class="deploy-item">• 版本回滚策略</text>
</svg>

### Kubernetes 部署示例

```yaml
# n8n-deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: n8n
  labels:
    app: n8n
spec:
  replicas: 2
  selector:
    matchLabels:
      app: n8n
  template:
    metadata:
      labels:
        app: n8n
    spec:
      containers:
      - name: n8n
        image: docker.n8n.io/n8nio/n8n:latest
        ports:
        - containerPort: 5678
        env:
        - name: N8N_BASIC_AUTH_ACTIVE
          value: "true"
        - name: N8N_BASIC_AUTH_USER
          valueFrom:
            secretKeyRef:
              name: n8n-secret
              key: username
        - name: N8N_BASIC_AUTH_PASSWORD
          valueFrom:
            secretKeyRef:
              name: n8n-secret
              key: password
        - name: DB_TYPE
          value: "postgresdb"
        - name: DB_POSTGRESDB_HOST
          value: "postgres-service"
        volumeMounts:
        - name: n8n-data
          mountPath: /home/node/.n8n
      volumes:
      - name: n8n-data
        persistentVolumeClaim:
          claimName: n8n-pvc
---
apiVersion: v1
kind: Service
metadata:
  name: n8n-service
spec:
  selector:
    app: n8n
  ports:
  - port: 80
    targetPort: 5678
  type: LoadBalancer
```

## 社区资源和扩展

### 官方资源

<svg width="600" height="280" xmlns="http://www.w3.org/2000/svg">
  <style>
    .resource-card { fill: #F7FAFC; stroke: #E2E8F0; stroke-width: 2; rx: 8; ry: 8; }
    .resource-title { font-family: Arial; font-size: 14px; font-weight: bold; fill: #2D3748; }
    .resource-item { font-family: Arial; font-size: 12px; fill: #4A5568; }
    .resource-icon { font-size: 16px; }
  </style>
  
  <!-- 文档和学习 -->
  <rect x="30" y="20" width="170" height="120" class="resource-card"/>
  <text x="40" y="40" class="resource-icon">📚</text>
  <text x="60" y="45" class="resource-title">文档和学习</text>
  <text x="40" y="65" class="resource-item">• 官方文档</text>
  <text x="40" y="80" class="resource-item">• 视频教程</text>
  <text x="40" y="95" class="resource-item">• 最佳实践指南</text>
  <text x="40" y="110" class="resource-item">• API 参考</text>
  <text x="40" y="125" class="resource-item">• 故障排除指南</text>
  
  <!-- 社区支持 -->
  <rect x="220" y="20" width="170" height="120" class="resource-card"/>
  <text x="230" y="40" class="resource-icon">👥</text>
  <text x="250" y="45" class="resource-title">社区支持</text>
  <text x="230" y="65" class="resource-item">• 社区论坛</text>
  <text x="230" y="80" class="resource-item">• Discord 聊天</text>
  <text x="230" y="95" class="resource-item">• GitHub 讨论</text>
  <text x="230" y="110" class="resource-item">• 用户案例分享</text>
  <text x="230" y="125" class="resource-item">• 定期在线活动</text>
  
  <!-- 开发生态 -->
  <rect x="410" y="20" width="170" height="120" class="resource-card"/>
  <text x="420" y="40" class="resource-icon">🔧</text>
  <text x="440" y="45" class="resource-title">开发生态</text>
  <text x="420" y="65" class="resource-item">• 自定义节点开发</text>
  <text x="420" y="80" class="resource-item">• 社区节点库</text>
  <text x="420" y="95" class="resource-item">• 插件开发工具</text>
  <text x="420" y="110" class="resource-item">• 贡献指南</text>
  <text x="420" y="125" class="resource-item">• 开发者 API</text>
  
  <!-- 模板和示例 -->
  <rect x="30" y="160" width="170" height="100" class="resource-card"/>
  <text x="40" y="180" class="resource-icon">💡</text>
  <text x="60" y="185" class="resource-title">模板和示例</text>
  <text x="40" y="205" class="resource-item">• 900+ 工作流模板</text>
  <text x="40" y="220" class="resource-item">• 行业解决方案</text>
  <text x="40" y="235" class="resource-item">• 集成示例</text>
  <text x="40" y="250" class="resource-item">• 代码片段库</text>
  
  <!-- 商业支持 -->
  <rect x="220" y="160" width="170" height="100" class="resource-card"/>
  <text x="230" y="180" class="resource-icon">🏢</text>
  <text x="250" y="185" class="resource-title">商业支持</text>
  <text x="230" y="205" class="resource-item">• 企业级支持</text>
  <text x="230" y="220" class="resource-item">• 专业咨询服务</text>
  <text x="230" y="235" class="resource-item">• 定制开发</text>
  <text x="230" y="250" class="resource-item">• 培训服务</text>
  
  <!-- 第三方工具 -->
  <rect x="410" y="160" width="170" height="100" class="resource-card"/>
  <text x="420" y="180" class="resource-icon">🛠️</text>
  <text x="440" y="185" class="resource-title">第三方工具</text>
  <text x="420" y="205" class="resource-item">• 监控工具集成</text>
  <text x="420" y="220" class="resource-item">• CI/CD 插件</text>
  <text x="420" y="235" class="resource-item">• 测试框架</text>
  <text x="420" y="250" class="resource-item">• 性能分析工具</text>
</svg>

### 创建自定义节点

```typescript
// 自定义节点示例
import { IExecuteFunctions } from 'n8n-core';
import {
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
} from 'n8n-workflow';

export class CustomApiNode implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Custom API',
        name: 'customApi',
        group: ['input'],
        version: 1,
        description: 'Custom API integration node',
        defaults: {
            name: 'Custom API',
        },
        inputs: ['main'],
        outputs: ['main'],
        properties: [
            {
                displayName: 'API Endpoint',
                name: 'endpoint',
                type: 'string',
                default: '',
                required: true,
                description: 'The API endpoint to call',
            },
            {
                displayName: 'Method',
                name: 'method',
                type: 'options',
                options: [
                    { name: 'GET', value: 'GET' },
                    { name: 'POST', value: 'POST' },
                    { name: 'PUT', value: 'PUT' },
                    { name: 'DELETE', value: 'DELETE' },
                ],
                default: 'GET',
            },
        ],
    };

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];

        for (let i = 0; i < items.length; i++) {
            const endpoint = this.getNodeParameter('endpoint', i) as string;
            const method = this.getNodeParameter('method', i) as string;

            // 实现 API 调用逻辑
            const response = await this.helpers.request({
                method,
                url: endpoint,
                json: true,
            });

            returnData.push({
                json: response,
            });
        }

        return [returnData];
    }
}
```

## 常见问题解决

<svg width="600" height="320" xmlns="http://www.w3.org/2000/svg">
  <style>
    .qa-card { fill: #FDF2F8; stroke: #F687B3; stroke-width: 2; rx: 8; ry: 8; }
    .qa-title { font-family: Arial; font-size: 14px; font-weight: bold; fill: #B83280; }
    .qa-question { font-family: Arial; font-size: 12px; fill: #B83280; font-weight: bold; }
    .qa-answer { font-family: Arial; font-size: 11px; fill: #B83280; }
  </style>
  
  <rect x="30" y="20" width="540" height="280" class="qa-card"/>
  <text x="300" y="45" text-anchor="middle" class="qa-title">❓ 常见问题解答</text>
  
  <!-- 问题1 -->
  <text x="50" y="70" class="qa-question">Q1: n8n 可以免费使用吗？</text>
  <text x="70" y="85" class="qa-answer">A: 是的，n8n 采用 Fair Code 许可证，可以免费自托管使用。</text>
  <text x="70" y="97" class="qa-answer">   云版本提供免费试用，企业功能需要付费。</text>
  
  <!-- 问题2 -->
  <text x="50" y="120" class="qa-question">Q2: 如何备份 n8n 工作流？</text>
  <text x="70" y="135" class="qa-answer">A: 可以通过以下方式备份：</text>
  <text x="90" y="147" class="qa-answer">• 导出工作流 JSON 文件</text>
  <text x="90" y="159" class="qa-answer">• 备份数据库</text>
  <text x="90" y="171" class="qa-answer">• 使用 n8n CLI 工具</text>
  
  <!-- 问题3 -->
  <text x="50" y="195" class="qa-question">Q3: 工作流执行失败怎么办？</text>
  <text x="70" y="210" class="qa-answer">A: 故障排除步骤：</text>
  <text x="90" y="222" class="qa-answer">• 检查执行日志</text>
  <text x="90" y="234" class="qa-answer">• 验证节点配置</text>
  <text x="90" y="246" class="qa-answer">• 测试单个节点</text>
  <text x="90" y="258" class="qa-answer">• 检查网络连接</text>
  
  <!-- 问题4 -->
  <text x="300" y="120" class="qa-question">Q4: 如何提高工作流性能？</text>
  <text x="320" y="135" class="qa-answer">A: 性能优化建议：</text>
  <text x="340" y="147" class="qa-answer">• 减少不必要的数据传递</text>
  <text x="340" y="159" class="qa-answer">• 使用批处理模式</text>
  <text x="340" y="171" class="qa-answer">• 优化数据库查询</text>
  <text x="340" y="183" class="qa-answer">• 配置资源限制</text>
  
  <!-- 问题5 -->
  <text x="300" y="210" class="qa-question">Q5: 如何保护敏感数据？</text>
  <text x="320" y="225" class="qa-answer">A: 安全措施：</text>
  <text x="340" y="237" class="qa-answer">• 使用环境变量</text>
  <text x="340" y="249" class="qa-answer">• 启用 HTTPS</text>
  <text x="340" y="261" class="qa-answer">• 配置访问控制</text>
  <text x="340" y="273" class="qa-answer">• 定期更新系统</text>
</svg>

## 总结

n8n 作为一个现代化的工作流自动化平台，具有以下显著优势：

- **🎯 技术友好**：完美结合可视化操作和代码编写的灵活性
- **🤖 AI 原生**：深度集成 LangChain，支持智能代理和 AI 工作流
- **🔒 数据安全**：Fair Code 许可证，支持完全自托管部署
- **🌐 丰富集成**：400+ 预构建集成，覆盖主流服务和 API
- **👥 活跃社区**：97.7k GitHub 星标，强大的社区支持和生态
- **🏢 企业就绪**：支持 SSO、权限控制、气隙部署等企业级功能

通过本指南，您应该能够成功部署和使用 n8n 来构建强大的自动化工作流。无论是简单的数据同步，还是复杂的 AI 驱动的业务流程，n8n 都能提供灵活而强大的解决方案。

## 相关资源链接

- **[官方网站](https://n8n.io)** - n8n 官方主页
- **[GitHub 仓库](https://github.com/n8n-io/n8n)** - 源代码和最新更新
- **[官方文档](https://docs.n8n.io)** - 完整的使用文档
- **[社区论坛](https://community.n8n.io)** - 获取帮助和分享经验
- **[工作流模板](https://n8n.io/workflows)** - 900+ 即用模板库
- **[AI 和 LangChain 指南](https://docs.n8n.io/advanced-ai/)** - AI 集成详细指南
- **[YouTube 频道](https://www.youtube.com/c/n8n-io)** - 官方视频教程
- **[Discord 社区](https://discord.gg/n8n-community)** - 实时交流和支持

**🎥 推荐观看：**
- [n8n 完整教程系列](https://www.youtube.com/playlist?list=PLveKu6gS2nIBSNWO6cbtE2YrB3p4N2r0o)
- [AI 工作流构建指南](https://www.youtube.com/watch?v=r9Z7BySG3JU)
- [企业级部署最佳实践](https://www.youtube.com/watch?v=F2VV7W_Xqgs) 