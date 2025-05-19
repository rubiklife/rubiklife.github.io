---
title: "Context7 使用指南 - 为AI编码助手提供最新文档"
date: 2025-05-01T10:00:00+08:00
categories:
  - 工具
tags:
  - Context7
  - MCP
  - AI编程
  - 文档工具
toc: true
toc_label: "目录"
toc_icon: "code"
---

## Context7 简介

Context7是一个为大型语言模型(LLM)和AI编码助手提供最新代码文档的工具。它解决了传统AI编码助手依赖过时训练数据的问题，确保你获得最新、最准确的库文档信息。

<svg width="600" height="200" xmlns="http://www.w3.org/2000/svg">
  <style>
    .title { font-family: Arial; font-size: 24px; font-weight: bold; fill: #333; }
    .subtitle { font-family: Arial; font-size: 16px; fill: #666; }
    .logo { font-family: monospace; font-size: 48px; font-weight: bold; fill: #4a86e8; }
    .highlight { fill: #ff6d00; }
  </style>
  <rect width="600" height="200" fill="#f9f9f9" rx="10" ry="10" stroke="#ddd" stroke-width="2"/>
  <text x="300" y="70" text-anchor="middle" class="logo">Context<tspan class="highlight">7</tspan></text>
  <text x="300" y="110" text-anchor="middle" class="title">最新代码文档服务</text>
  <text x="300" y="140" text-anchor="middle" class="subtitle">为AI编码助手提供实时、准确的API文档</text>
</svg>

## 为什么使用Context7？

使用AI编码助手时，你可能会遇到这些问题：

- ❌ 代码示例基于过时的训练数据
- ❌ AI生成不存在的API或幻觉
- ❌ 对旧版本包的泛泛而谈

Context7解决了这些问题，它能：

- ✅ 提供最新的API文档和代码示例
- ✅ 确保所有推荐的API实际存在
- ✅ 提供特定版本的文档

<svg width="600" height="300" xmlns="http://www.w3.org/2000/svg">
  <style>
    .box { fill: #f5f5f5; stroke: #ddd; stroke-width: 2; rx: 8; ry: 8; }
    .title { font-family: Arial; font-size: 18px; font-weight: bold; fill: #333; }
    .content { font-family: Arial; font-size: 14px; fill: #555; }
    .checkmark { fill: #4caf50; font-weight: bold; font-size: 22px; }
    .xmark { fill: #f44336; font-weight: bold; font-size: 22px; }
  </style>
  
  <!-- 左侧：没有Context7 -->
  <rect x="20" y="20" width="260" height="260" class="box"/>
  <text x="150" y="50" text-anchor="middle" class="title">不使用Context7</text>
  
  <text x="40" y="90" class="xmark">❌</text>
  <text x="70" y="90" class="content">过时的API文档</text>
  
  <text x="40" y="130" class="xmark">❌</text>
  <text x="70" y="130" class="content">错误的代码示例</text>
  
  <text x="40" y="170" class="xmark">❌</text>
  <text x="70" y="170" class="content">不存在的API</text>
  
  <text x="40" y="210" class="xmark">❌</text>
  <text x="70" y="210" class="content">版本不匹配</text>
  
  <text x="40" y="250" class="xmark">❌</text>
  <text x="70" y="250" class="content">泛泛而谈</text>
  
  <!-- 右侧：使用Context7 -->
  <rect x="320" y="20" width="260" height="260" class="box"/>
  <text x="450" y="50" text-anchor="middle" class="title">使用Context7</text>
  
  <text x="340" y="90" class="checkmark">✅</text>
  <text x="370" y="90" class="content">最新的API文档</text>
  
  <text x="340" y="130" class="checkmark">✅</text>
  <text x="370" y="130" class="content">准确的代码示例</text>
  
  <text x="340" y="170" class="checkmark">✅</text>
  <text x="370" y="170" class="content">实际存在的API</text>
  
  <text x="340" y="210" class="checkmark">✅</text>
  <text x="370" y="210" class="content">版本特定文档</text>
  
  <text x="340" y="250" class="checkmark">✅</text>
  <text x="370" y="250" class="content">具体实用建议</text>
</svg>

## Context7工作原理

Context7是一个MCP（Model Context Protocol）服务器，它能与支持MCP协议的AI编码助手集成，提供实时的代码库文档。使用时，AI助手会通过Context7查询最新的API文档，确保其建议和代码生成基于最新信息。

<svg width="600" height="300" xmlns="http://www.w3.org/2000/svg">
  <style>
    .box { fill: white; stroke: #ddd; stroke-width: 2; rx: 10; ry: 10; }
    .arrow { stroke: #666; stroke-width: 2; fill: none; marker-end: url(#arrowhead); }
    .label { font-family: Arial; font-size: 12px; fill: #555; }
    .title { font-family: Arial; font-size: 14px; font-weight: bold; fill: #333; text-anchor: middle; }
  </style>
  
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#666" />
    </marker>
  </defs>
  
  <!-- 编码助手 -->
  <rect x="50" y="100" width="120" height="80" class="box"/>
  <text x="110" y="145" class="title">AI编码助手</text>
  
  <!-- Context7 -->
  <rect x="250" y="100" width="120" height="80" class="box"/>
  <text x="310" y="145" class="title">Context7</text>
  
  <!-- 文档库 -->
  <rect x="450" y="100" width="120" height="80" class="box"/>
  <text x="510" y="145" class="title">最新文档库</text>
  
  <!-- 箭头和标签 -->
  <path d="M170 130 L250 130" class="arrow" />
  <text x="210" y="120" class="label">查询库文档</text>
  
  <path d="M370 130 L450 130" class="arrow" />
  <text x="410" y="120" class="label">获取最新文档</text>
  
  <path d="M450 150 L370 150" class="arrow" />
  <text x="410" y="170" class="label">返回文档内容</text>
  
  <path d="M250 150 L170 150" class="arrow" />
  <text x="210" y="170" class="label">提供准确回答</text>
  
  <!-- 用户 -->
  <path d="M80 50 C90 30, 120 30, 130 50" stroke="#333" stroke-width="2" fill="none"/>
  <circle cx="105" cy="25" r="15" fill="#333"/>
  <rect x="85" y="50" width="40" height="30" rx="5" ry="5" fill="#333"/>
  <text x="105" y="75" font-family="Arial" font-size="12" text-anchor="middle" fill="white">用户</text>
  
  <!-- 用户与AI助手交互 -->
  <path d="M105 80 L105 100" class="arrow" />
  <text x="120" y="90" class="label">提问</text>
</svg>

## 支持的平台

Context7可以集成到多种支持MCP协议的AI编码助手和编辑器中：

- VS Code
- Cursor
- Zed
- Claude Code
- Claude Desktop
- BoltAI
- Cline
- Windsurf
- 其他支持MCP的平台

<svg width="600" height="250" xmlns="http://www.w3.org/2000/svg">
  <style>
    .platform { fill: #f5f5f5; stroke: #ddd; stroke-width: 1.5; rx: 8; ry: 8; }
    .platform-name { font-family: Arial; font-size: 14px; font-weight: bold; fill: #333; text-anchor: middle; }
    .platform-logo { font-size: 24px; text-anchor: middle; }
  </style>
  
  <!-- 第一行平台 -->
  <rect x="30" y="20" width="100" height="80" class="platform"/>
  <text x="80" y="50" class="platform-logo">💻</text>
  <text x="80" y="80" class="platform-name">VS Code</text>
  
  <rect x="160" y="20" width="100" height="80" class="platform"/>
  <text x="210" y="50" class="platform-logo">🖱️</text>
  <text x="210" y="80" class="platform-name">Cursor</text>
  
  <rect x="290" y="20" width="100" height="80" class="platform"/>
  <text x="340" y="50" class="platform-logo">📝</text>
  <text x="340" y="80" class="platform-name">Zed</text>
  
  <rect x="420" y="20" width="100" height="80" class="platform"/>
  <text x="470" y="50" class="platform-logo">🤖</text>
  <text x="470" y="80" class="platform-name">Claude Code</text>
  
  <!-- 第二行平台 -->
  <rect x="30" y="120" width="100" height="80" class="platform"/>
  <text x="80" y="150" class="platform-logo">🖥️</text>
  <text x="80" y="180" class="platform-name">Claude Desktop</text>
  
  <rect x="160" y="120" width="100" height="80" class="platform"/>
  <text x="210" y="150" class="platform-logo">⚡</text>
  <text x="210" y="180" class="platform-name">BoltAI</text>
  
  <rect x="290" y="120" width="100" height="80" class="platform"/>
  <text x="340" y="150" class="platform-logo">📊</text>
  <text x="340" y="180" class="platform-name">Cline</text>
  
  <rect x="420" y="120" width="100" height="80" class="platform"/>
  <text x="470" y="150" class="platform-logo">🏄</text>
  <text x="470" y="180" class="platform-name">Windsurf</text>
</svg>

## 安装指南

下面介绍在各种平台上安装Context7的方法。所有平台都使用相似的配置原理，主要区别在于配置文件的位置和格式。

### VS Code安装

1. 打开VS Code
2. 添加以下内容到你的VS Code MCP配置文件中：

```json
{
  "servers": {
    "Context7": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    }
  }
}
```

### Cursor安装

添加以下内容到你的Cursor MCP配置文件中：

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    }
  }
}
```

### Claude Desktop安装

添加以下内容到你的Claude Desktop配置文件中：

```json
{
  "mcpServers": {
    "Context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    }
  }
}
```

### Windows特殊配置

在Windows上，配置稍有不同：

```json
{
  "mcpServers": {
    "github.com/upstash/context7-mcp": {
      "command": "cmd",
      "args": [
        "/c",
        "npx",
        "-y",
        "@upstash/context7-mcp@latest"
      ],
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

<svg width="600" height="260" xmlns="http://www.w3.org/2000/svg">
  <style>
    .step { fill: #f9f9f9; stroke: #ddd; stroke-width: 2; rx: 10; ry: 10; }
    .step-number { font-family: Arial; font-size: 24px; font-weight: bold; fill: #4a86e8; }
    .step-title { font-family: Arial; font-size: 16px; font-weight: bold; fill: #333; }
    .step-desc { font-family: Arial; font-size: 12px; fill: #666; }
    .arrow { stroke: #999; stroke-width: 2; stroke-dasharray: 5,3; fill: none; }
  </style>
  
  <!-- 第一步 -->
  <rect x="50" y="20" width="500" height="60" class="step"/>
  <text x="80" y="55" class="step-number">1</text>
  <text x="110" y="45" class="step-title">安装Node.js和NPM</text>
  <text x="110" y="65" class="step-desc">确保电脑上安装了Node.js和NPM环境</text>
  
  <!-- 第二步 -->
  <rect x="50" y="100" width="500" height="60" class="step"/>
  <text x="80" y="135" class="step-number">2</text>
  <text x="110" y="125" class="step-title">找到编辑器的MCP配置文件</text>
  <text x="110" y="145" class="step-desc">每个编辑器的配置文件位置不同，参考各平台文档</text>
  
  <!-- 第三步 -->
  <rect x="50" y="180" width="500" height="60" class="step"/>
  <text x="80" y="215" class="step-number">3</text>
  <text x="110" y="205" class="step-title">添加Context7配置</text>
  <text x="110" y="225" class="step-desc">将Context7的配置添加到MCP配置文件中</text>
  
  <!-- 连接箭头 -->
  <path d="M300 80 L300 100" class="arrow" />
  <path d="M300 160 L300 180" class="arrow" />
</svg>

## 使用方法

安装完成后，您可以通过以下方式使用Context7：

1. 在使用AI助手时，需要使用特定的工具函数查询文档
2. Context7提供两个主要工具：
   - `resolve-library-id`: 将一般的库名解析为Context7兼容的库ID
   - `get-library-docs`: 使用Context7兼容的库ID获取文档

例如，在Cursor或VS Code中，当你询问关于React的问题时，AI助手会自动调用Context7获取最新的React文档，然后基于这些最新文档回答你的问题。

<svg width="600" height="280" xmlns="http://www.w3.org/2000/svg">
  <style>
    .box { fill: #f5f5f5; stroke: #ddd; stroke-width: 2; rx: 10; ry: 10; }
    .code { font-family: monospace; font-size: 12px; fill: #333; }
    .comment { font-family: monospace; font-size: 12px; fill: #090; }
    .string { font-family: monospace; font-size: 12px; fill: #c00; }
    .function { font-family: monospace; font-size: 12px; fill: #00c; }
    .title { font-family: Arial; font-size: 14px; font-weight: bold; fill: #333; }
  </style>
  
  <!-- 示例1：解析库ID -->
  <rect x="20" y="20" width="560" height="100" class="box"/>
  <text x="40" y="40" class="title">示例1：解析库ID</text>
  <text x="40" y="60" class="function">resolve-library-id</text>
  <text x="155" y="60" class="code">(</text>
  <text x="40" y="80" class="code">  libraryName: </text>
  <text x="120" y="80" class="string">"react"</text>
  <text x="40" y="100" class="code">)</text>
  
  <!-- 示例2：获取文档 -->
  <rect x="20" y="140" width="560" height="120" class="box"/>
  <text x="40" y="160" class="title">示例2：获取文档</text>
  <text x="40" y="180" class="function">get-library-docs</text>
  <text x="155" y="180" class="code">(</text>
  <text x="40" y="200" class="code">  context7CompatibleLibraryID: </text>
  <text x="220" y="200" class="string">"facebook/react"</text>
  <text x="40" y="220" class="code">  topic: </text>
  <text x="85" y="220" class="string">"hooks"</text>
  <text x="40" y="240" class="code">  tokens: </text>
  <text x="85" y="240" class="code">15000</text>
  <text x="40" y="260" class="code">)</text>
</svg>

## 环境变量配置

你可以通过环境变量自定义Context7的行为：

- `DEFAULT_MINIMUM_TOKENS`：设置文档检索的最小令牌数（默认值：10000）

示例配置：

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upstash/context7-mcp@latest"],
      "env": {
        "DEFAULT_MINIMUM_TOKENS": "15000"
      }
    }
  }
}
```

## 常见问题解决

### 模块未找到错误

如果遇到`ERR_MODULE_NOT_FOUND`错误，尝试使用`bunx`替代`npx`：

```json
{
  "mcpServers": {
    "context7": {
      "command": "bunx",
      "args": ["-y", "@upstash/context7-mcp@latest"]
    }
  }
}
```

### ESM解析问题

如果遇到类似`Error: Cannot find module 'uriTemplate.js'`的错误，尝试使用`--experimental-vm-modules`标志：

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": [
        "-y",
        "--node-options=--experimental-vm-modules",
        "@upstash/context7-mcp@latest"
      ]
    }
  }
}
```

<svg width="600" height="200" xmlns="http://www.w3.org/2000/svg">
  <style>
    .error-box { fill: #fff9f9; stroke: #ffdddd; stroke-width: 2; rx: 10; ry: 10; }
    .solution-box { fill: #f9fff9; stroke: #ddffdd; stroke-width: 2; rx: 10; ry: 10; }
    .error-title { font-family: Arial; font-size: 16px; font-weight: bold; fill: #c00; }
    .solution-title { font-family: Arial; font-size: 16px; font-weight: bold; fill: #0c0; }
    .code { font-family: monospace; font-size: 12px; fill: #333; }
  </style>
  
  <!-- 错误1 -->
  <rect x="20" y="20" width="270" height="70" class="error-box"/>
  <text x="40" y="40" class="error-title">错误：模块未找到</text>
  <text x="40" y="60" class="code">ERR_MODULE_NOT_FOUND</text>
  
  <!-- 解决方案1 -->
  <rect x="310" y="20" width="270" height="70" class="solution-box"/>
  <text x="330" y="40" class="solution-title">解决方案</text>
  <text x="330" y="60" class="code">使用bunx替代npx</text>
  
  <!-- 错误2 -->
  <rect x="20" y="110" width="270" height="70" class="error-box"/>
  <text x="40" y="130" class="error-title">错误：ESM解析问题</text>
  <text x="40" y="150" class="code">Cannot find module 'uriTemplate.js'</text>
  
  <!-- 解决方案2 -->
  <rect x="310" y="110" width="270" height="70" class="solution-box"/>
  <text x="330" y="130" class="solution-title">解决方案</text>
  <text x="330" y="150" class="code">添加--experimental-vm-modules</text>
</svg>

## 效果对比

使用Context7前后的代码质量对比：

### 不使用Context7

```javascript
// AI生成的代码，基于过时文档
import React from 'react';

function MyComponent() {
  // 错误：componentWillMount在新版React中已废弃
  componentWillMount() {
    console.log('This is deprecated');
  }
  
  // 错误：不正确的hooks用法
  const [count, setCount] = useState(0);
  if(count > 0) {
    const [name, setName] = useState('');
  }
  
  return <div>Hello World</div>;
}
```

### 使用Context7

```javascript
// AI生成的代码，基于最新文档
import React, { useState, useEffect } from 'react';

function MyComponent() {
  // 正确：使用useEffect替代废弃的生命周期方法
  useEffect(() => {
    console.log('Component mounted');
  }, []);
  
  // 正确：hooks在顶层使用
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Name: {name}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

## 总结

Context7是一个强大的MCP服务器，能够为AI编码助手提供最新的代码库文档。通过使用Context7，你可以：

1. 获得基于最新文档的代码建议
2. 避免使用已废弃或不存在的API
3. 确保编写的代码与你使用的库版本兼容
4. 提高AI编码助手的精确度和实用性

无论你是使用VS Code、Cursor还是其他支持MCP的平台，Context7都能显著提升你的编码体验，让AI助手成为更可靠的编程伙伴。

## 参考资源

- [Context7 GitHub仓库](https://github.com/upstash/context7)
- [Context7官方网站](https://context7.com)
- [MCP协议文档](https://modelcontextprotocol.github.io/) 