---
title: "OpenCode 最佳实践手册及实战指南 - MCP、Plugins、Skills 深度解析"
date: 2026-02-28T09:00:00+08:00
categories:
  - AI编程工具
tags:
  - OpenCode
  - AI编程
  - MCP
  - 开源
  - 终端工具
toc: true
toc_label: "目录"
toc_icon: "terminal"
mermaid: true
---

## 一、OpenCode 简介

[OpenCode](https://opencode.ai) 是一款完全开源的 AI 编程代理（Coding Agent），支持终端界面（TUI）、桌面应用和 IDE 插件三种使用方式。与 Claude Code 相比，OpenCode 最大的优势在于**提供商无关性**——你可以自由选择 Anthropic、OpenAI、Google、本地模型等 75+ 家 LLM 提供商，避免被单一厂商绑定。

```mermaid
mindmap
  root((OpenCode))
    接入方式
      终端 TUI
      桌面应用
      IDE 插件
      Web 界面
    核心能力
      多会话管理
      代码读写执行
      工具调用
      上下文压缩
    提供商生态
      Anthropic Claude
      OpenAI GPT
      Google Gemini
      本地模型 Ollama
      OpenCode Zen
    扩展体系
      MCP 协议
      Plugins 插件
      Skills 技能
      Custom Tools
```

### 1.1 核心架构

OpenCode 采用**客户端-服务端**架构，多个前端界面通过统一的 SDK 与后端通信。

```mermaid
graph TB
    subgraph 前端层
        TUI[终端 TUI]
        Desktop[桌面 App<br/>Tauri]
        IDE[VS Code 插件]
        Web[Web 界面]
    end

    subgraph SDK层
        SDK["@opencode-ai/sdk<br/>TypeScript SDK"]
    end

    subgraph 后端核心
        Server[HTTP Server<br/>Hono框架]
        Session[Session 管理]
        Provider[Provider 层]
        Tool[Tool 执行引擎]
        MCP_Core[MCP 客户端]
    end

    subgraph 存储层
        SQLite[(SQLite<br/>会话/消息/权限)]
        AuthJSON[auth.json<br/>认证信息]
        Config[opencode.json<br/>全局配置]
    end

    subgraph LLM提供商
        Anthropic[Anthropic]
        OpenAI[OpenAI]
        Google[Google]
        Local[本地模型]
    end

    TUI --> SDK
    Desktop --> SDK
    IDE --> SDK
    Web --> SDK
    SDK --> Server
    Server --> Session
    Server --> Provider
    Session --> Tool
    Session --> MCP_Core
    Provider --> Anthropic
    Provider --> OpenAI
    Provider --> Google
    Provider --> Local
    Session --> SQLite
    Server --> AuthJSON
    Server --> Config
```

### 1.2 数据持久化位置

| 数据类型 | 存储路径 |
|---------|---------|
| 认证信息 | `~/.local/share/opencode/auth.json` |
| 全局配置 | `~/.config/opencode/opencode.json` |
| 项目数据 | `~/.local/share/opencode/project/<hash>/data.db` |
| 运行日志 | `~/.local/share/opencode/log/` |

---

## 二、安装与初始化

### 2.1 安装方式

```bash
# 官方安装脚本（推荐）
curl -fsSL https://opencode.ai/install | bash

# Homebrew（macOS/Linux，推荐，版本最新）
brew install anomalyco/tap/opencode

# npm 全局安装
npm install -g opencode-ai

# Arch Linux
sudo pacman -S opencode
```

### 2.2 项目初始化最佳实践

```bash
cd /path/to/your/project
opencode
```

进入 TUI 后执行：

```
/init
```

`/init` 命令会让 OpenCode 分析你的项目结构，并自动生成 `AGENTS.md` 文件。

> **最佳实践**：将 `AGENTS.md` 提交到 Git 仓库，让团队所有成员（以及 AI）都能获得一致的项目上下文。

### 2.3 AGENTS.md 最佳实践

一份高质量的 `AGENTS.md` 应包含以下内容：

```markdown
# 项目概述
简述项目用途、技术栈、业务背景

# 目录结构说明
解释关键目录和文件的职责

# 编码规范
- 命名约定
- 代码风格（ESLint/Prettier 规则）
- 注释规范

# 常用命令
- dev: npm run dev
- test: npm test
- build: npm run build

# 核心模块说明
解释关键模块的设计意图和边界

# 禁止事项
明确列出 AI 不应该修改的文件或区域
```

---

## 三、配置体系详解

### 3.1 配置优先级

```mermaid
flowchart TD
    ENV["环境变量<br/>最高优先级"] --> AUTH
    AUTH["auth.json<br/>OAuth/API Token"] --> PROJ
    PROJ["项目级 opencode.json<br/>.opencode/"] --> GLOBAL
    GLOBAL["全局配置<br/>~/.config/opencode/opencode.json"] --> DEFAULT
    DEFAULT["Models.dev 默认值<br/>最低优先级"]

    style ENV fill:#ff6b6b,color:#fff
    style AUTH fill:#ffa94d,color:#fff
    style PROJ fill:#ffd43b,color:#333
    style GLOBAL fill:#69db7c,color:#333
    style DEFAULT fill:#74c0fc,color:#333
```

### 3.2 完整配置结构

```json
{
  "$schema": "https://opencode.ai/config.json",
  "model": "anthropic/claude-sonnet-4-5",
  "small_model": "anthropic/claude-haiku-4-5",
  "provider": {
    "anthropic": {
      "api_key": "${ANTHROPIC_API_KEY}"
    },
    "openai": {
      "api_key": "${OPENAI_API_KEY}"
    }
  },
  "agent": {
    "build": {
      "model": "anthropic/claude-sonnet-4-5",
      "system": "你是一名资深工程师，遵循 SOLID 原则"
    }
  },
  "tools": {
    "bash": { "enabled": true },
    "write": { "enabled": true },
    "read": { "enabled": true }
  },
  "mcp": {
    "filesystem": {
      "type": "local",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/workspace"]
    }
  },
  "tui": {
    "theme": "opencode"
  }
}
```

### 3.3 多环境配置策略

```mermaid
graph LR
    subgraph 开发环境
        DevConfig[".opencode/opencode.json<br/>本地开发配置"]
        DevModel["model: claude-haiku<br/>快速迭代"]
    end

    subgraph 生产/审查
        ProdConfig["~/.config/opencode/<br/>全局配置"]
        ProdModel["model: claude-sonnet<br/>高质量输出"]
    end

    subgraph CI/CD
        EnvVars["环境变量注入<br/>ANTHROPIC_API_KEY"]
        AutoPerm["permissions:<br/>auto_approve: true"]
    end

    DevConfig --> DevModel
    ProdConfig --> ProdModel
    EnvVars --> AutoPerm
```

---

## 四、Agent 模式与工作流

### 4.1 内置 Agent 对比

| Agent | 模式 | 适用场景 |
|-------|------|---------|
| **build** | 完全访问权限 | 实际开发、代码修改 |
| **plan** | 只读模式 | 代码分析、制定方案 |
| **general** | 子 Agent | 复杂搜索、多步骤任务 |

在 TUI 中按 `Tab` 键切换 build 和 plan 模式。

### 4.2 推荐工作流：Plan → Review → Build

```mermaid
sequenceDiagram
    participant Dev as 开发者
    participant Plan as Plan Agent
    participant Build as Build Agent
    participant Git as Git

    Dev->>Plan: 切换到 Plan 模式（Tab）
    Dev->>Plan: 描述需求："实现用户登录功能"
    Plan->>Dev: 输出实现方案和文件变更清单
    Dev->>Dev: 审查方案，提出修改意见
    Dev->>Plan: "将 JWT 有效期改为 7 天"
    Plan->>Dev: 更新方案
    Dev->>Build: 切换到 Build 模式（Tab）
    Dev->>Build: "按方案实现"
    Build->>Build: 执行代码修改
    Build->>Dev: 完成，展示变更摘要
    Dev->>Git: git add . && git commit
    Note over Dev,Git: 如不满意可执行 /undo 回滚
```

### 4.3 自定义 Agent

在配置文件中定义专属 Agent：

```json
{
  "agent": {
    "security-reviewer": {
      "model": "anthropic/claude-opus-4-5",
      "system": "你是一名专注于安全审查的工程师。检查代码中的 SQL 注入、XSS、CSRF 等安全漏洞。发现问题时，给出具体的修复建议和代码示例。",
      "tools": {
        "bash": { "enabled": false },
        "write": { "enabled": false }
      }
    },
    "test-writer": {
      "model": "anthropic/claude-haiku-4-5",
      "system": "你是一名 TDD 专家，专门负责编写单元测试和集成测试。优先使用项目已有的测试框架和风格。"
    }
  }
}
```

---

## 五、MCP（Model Context Protocol）实战

MCP 是 OpenCode 扩展能力的核心协议，允许 AI 连接外部工具和数据源。

### 5.1 MCP 架构原理

```mermaid
graph TB
    subgraph OpenCode核心
        Agent[Agent 执行引擎]
        MCPClient[MCP 客户端]
    end

    subgraph MCP Servers
        FS[文件系统 Server<br/>@modelcontextprotocol/server-filesystem]
        DB[数据库 Server<br/>postgres/mysql MCP]
        GitHub[GitHub Server<br/>@modelcontextprotocol/server-github]
        Browser[浏览器 Server<br/>playwright-mcp]
        Custom[自定义 Server<br/>你的业务逻辑]
    end

    subgraph 外部资源
        Files[本地文件系统]
        Database[(数据库)]
        GitHubAPI[GitHub API]
        WebPage[Web 页面]
        API[业务 API]
    end

    Agent --> MCPClient
    MCPClient -->|stdio/SSE/HTTP| FS
    MCPClient -->|stdio/SSE/HTTP| DB
    MCPClient -->|stdio/SSE/HTTP| GitHub
    MCPClient -->|stdio/SSE/HTTP| Browser
    MCPClient -->|stdio/SSE/HTTP| Custom

    FS --> Files
    DB --> Database
    GitHub --> GitHubAPI
    Browser --> WebPage
    Custom --> API
```

### 5.2 常用 MCP Server 配置

#### 文件系统 MCP

```json
{
  "mcp": {
    "filesystem": {
      "type": "local",
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/Users/yourname/workspace"
      ]
    }
  }
}
```

#### GitHub MCP

```json
{
  "mcp": {
    "github": {
      "type": "local",
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "${GITHUB_TOKEN}"
      }
    }
  }
}
```

#### PostgreSQL 数据库 MCP

```json
{
  "mcp": {
    "postgres": {
      "type": "local",
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-postgres",
        "postgresql://localhost/mydb"
      ]
    }
  }
}
```

#### Playwright 浏览器自动化 MCP

```json
{
  "mcp": {
    "playwright": {
      "type": "local",
      "command": "npx",
      "args": ["-y", "@playwright/mcp"]
    }
  }
}
```

#### 远程 MCP Server（SSE）

```json
{
  "mcp": {
    "remote-service": {
      "type": "sse",
      "url": "https://your-mcp-server.com/sse",
      "headers": {
        "Authorization": "Bearer ${MCP_API_KEY}"
      }
    }
  }
}
```

### 5.3 实战案例：MCP 驱动的全栈开发

**场景**：使用 OpenCode + GitHub MCP + Postgres MCP 完成一个功能开发闭环

```mermaid
sequenceDiagram
    participant Dev as 开发者
    participant OC as OpenCode
    participant GH as GitHub MCP
    participant PG as Postgres MCP
    participant FS as 文件系统

    Dev->>OC: "查看 issue #42，分析数据库结构，实现该功能"
    OC->>GH: get_issue(42)
    GH-->>OC: issue 详情和需求描述
    OC->>PG: list_tables()
    PG-->>OC: 数据库表结构
    OC->>FS: 读取相关代码文件
    FS-->>OC: 现有代码逻辑
    OC->>OC: 分析需求，制定实现方案
    OC->>FS: 写入新功能代码
    OC->>PG: execute_query("ALTER TABLE ...")
    PG-->>OC: 迁移成功
    OC->>GH: create_pull_request(...)
    GH-->>OC: PR 链接
    OC-->>Dev: "功能已实现，PR #58 已创建"
```

### 5.4 构建自定义 MCP Server

以下是一个连接内部 API 的自定义 MCP Server 示例：

```typescript
// custom-mcp-server.ts
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server(
  { name: "company-api-mcp", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

// 注册工具：查询内部用户系统
server.setRequestHandler("tools/list", async () => ({
  tools: [
    {
      name: "get_user_info",
      description: "根据用户 ID 获取内部用户信息",
      inputSchema: {
        type: "object",
        properties: {
          user_id: { type: "string", description: "用户 ID" }
        },
        required: ["user_id"]
      }
    },
    {
      name: "list_user_permissions",
      description: "列出用户的权限列表",
      inputSchema: {
        type: "object",
        properties: {
          user_id: { type: "string" }
        },
        required: ["user_id"]
      }
    }
  ]
}));

server.setRequestHandler("tools/call", async (request) => {
  const { name, arguments: args } = request.params;

  if (name === "get_user_info") {
    const response = await fetch(
      `${process.env.INTERNAL_API_URL}/users/${args.user_id}`,
      { headers: { Authorization: `Bearer ${process.env.API_TOKEN}` } }
    );
    const data = await response.json();
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }

  // ... 其他工具处理
});

const transport = new StdioServerTransport();
await server.connect(transport);
```

注册到 OpenCode：

```json
{
  "mcp": {
    "company-api": {
      "type": "local",
      "command": "npx",
      "args": ["tsx", "./scripts/custom-mcp-server.ts"],
      "env": {
        "INTERNAL_API_URL": "https://api.internal.company.com",
        "API_TOKEN": "${COMPANY_API_TOKEN}"
      }
    }
  }
}
```

---

## 六、Plugins 插件系统实战

### 6.1 插件架构

```mermaid
graph TB
    subgraph OpenCode Core
        EventBus[事件总线]
        HookSystem[Hook 系统]
        PluginLoader[插件加载器]
    end

    subgraph Plugin 接口
        OnSession[onSession Hook<br/>会话生命周期]
        OnMessage[onMessage Hook<br/>消息处理]
        OnTool[onTool Hook<br/>工具调用拦截]
        OnFile[onFile Hook<br/>文件变更监听]
    end

    subgraph 自定义插件示例
        Logger[日志插件<br/>记录所有操作]
        Notifier[通知插件<br/>企业微信/Slack]
        Validator[校验插件<br/>代码规范检查]
        Auditor[审计插件<br/>敏感操作记录]
    end

    PluginLoader --> OnSession
    PluginLoader --> OnMessage
    PluginLoader --> OnTool
    PluginLoader --> OnFile

    OnSession --> Logger
    OnMessage --> Notifier
    OnTool --> Validator
    OnFile --> Auditor
```

### 6.2 创建插件

OpenCode 插件是一个导出 `plugin` 对象的 JavaScript/TypeScript 模块：

```typescript
// .opencode/plugins/code-quality.ts
import type { Plugin } from "opencode-ai/plugin";

export const plugin: Plugin = {
  name: "code-quality-enforcer",
  version: "1.0.0",
  description: "在 AI 修改文件后自动运行 lint 检查",

  hooks: {
    // 文件被 AI 修改后触发
    afterFileWrite: async (ctx) => {
      const { filePath, content } = ctx;

      // 只处理 TypeScript/JavaScript 文件
      if (!/\.(ts|tsx|js|jsx)$/.test(filePath)) return;

      console.log(`[code-quality] 检查文件: ${filePath}`);

      // 运行 ESLint
      const result = await ctx.exec("npx", [
        "eslint",
        "--fix",
        filePath
      ]);

      if (result.exitCode !== 0) {
        ctx.warn(`ESLint 发现问题:\n${result.stderr}`);
      }
    },

    // 每次会话开始时触发
    onSessionStart: async (ctx) => {
      ctx.info("代码质量检查插件已激活");
    }
  }
};
```

### 6.3 实战插件：操作审计

```typescript
// .opencode/plugins/audit-logger.ts
import type { Plugin } from "opencode-ai/plugin";
import fs from "fs/promises";
import path from "path";

interface AuditEntry {
  timestamp: string;
  action: string;
  file?: string;
  tool?: string;
  user: string;
}

export const plugin: Plugin = {
  name: "audit-logger",
  version: "1.0.0",

  hooks: {
    beforeToolCall: async (ctx) => {
      const entry: AuditEntry = {
        timestamp: new Date().toISOString(),
        action: "tool_call",
        tool: ctx.toolName,
        file: ctx.args?.file_path,
        user: process.env.USER || "unknown"
      };

      // 追加到审计日志
      const logPath = path.join(process.cwd(), ".opencode/audit.jsonl");
      await fs.appendFile(logPath, JSON.stringify(entry) + "\n");
    },

    afterFileWrite: async (ctx) => {
      // 敏感文件变更告警
      const sensitivePatterns = [
        /\.env/,
        /config\/secrets/,
        /credentials/
      ];

      if (sensitivePatterns.some(p => p.test(ctx.filePath))) {
        // 发送 Webhook 告警
        await fetch(process.env.ALERT_WEBHOOK_URL!, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: `⚠️ 敏感文件被 AI 修改: ${ctx.filePath}`,
            timestamp: new Date().toISOString()
          })
        });
      }
    }
  }
};
```

注册插件：

```json
{
  "plugins": [
    ".opencode/plugins/code-quality.ts",
    ".opencode/plugins/audit-logger.ts"
  ]
}
```

---

## 七、Skills 技能系统实战

Skills 是 OpenCode 的"可复用上下文包"，让 AI 在执行特定任务时拥有领域专家知识。

### 7.1 Skills 工作原理

```mermaid
flowchart LR
    User["用户请求\n'帮我写一个 API 接口'"] --> Matcher
    Matcher{Skills 匹配器} --> |"匹配到 REST API Skill"| Loader
    Loader[Skill 加载器] --> |"注入上下文"| Context
    Context["增强上下文\n= 原始请求\n+ API 设计规范\n+ 代码模板\n+ 最佳实践"] --> Agent
    Agent[AI Agent] --> |"基于增强上下文"| Output["高质量输出\n符合团队规范"]
```

### 7.2 单一 Skill：REST API 设计规范

创建文件 `.opencode/skills/rest-api/SKILL.md`：

````markdown
# REST API 设计 Skill

## 激活场景
当用户请求创建 API 接口、路由、控制器时使用此 Skill。

## API 设计原则

### URL 规范
- 使用复数名词：`/users`，不用 `/user`
- 嵌套资源：`/users/{id}/orders`
- 版本前缀：`/api/v1/`

### HTTP 方法语义
| 方法 | 用途 | 示例 |
|------|------|------|
| GET | 查询资源 | GET /users |
| POST | 创建资源 | POST /users |
| PUT | 全量更新 | PUT /users/{id} |
| PATCH | 部分更新 | PATCH /users/{id} |
| DELETE | 删除资源 | DELETE /users/{id} |

### 统一响应格式
```typescript
// 成功响应
{
  "success": true,
  "data": { ... },
  "meta": {
    "page": 1,
    "total": 100
  }
}

// 错误响应
{
  "success": false,
  "error": {
    "code": "USER_NOT_FOUND",
    "message": "用户不存在",
    "details": {}
  }
}
```

### Express.js 标准控制器模板
```typescript
import { Request, Response, NextFunction } from "express";
import { asyncHandler } from "@/utils/async-handler";
import { UserService } from "@/services/user.service";
import { createUserSchema } from "@/validators/user.validator";

export const createUser = asyncHandler(
  async (req: Request, res: Response) => {
    const validated = createUserSchema.parse(req.body);
    const user = await UserService.create(validated);
    res.status(201).json({ success: true, data: user });
  }
);
```

## 必须包含
- 输入验证（使用 Zod）
- 错误处理中间件
- OpenAPI 注释
- 单元测试骨架
````

### 7.3 单一 Skill：数据库迁移规范

创建文件 `.opencode/skills/database/SKILL.md`：

````markdown
# 数据库迁移 Skill

## 激活场景
用户需要修改数据库结构、创建迁移文件时使用。

## 迁移文件命名
格式：`{timestamp}_{描述}.sql`
示例：`20260228143000_add_user_phone_column.sql`

## 迁移原则
1. **向前兼容**：新增列必须有默认值或允许 NULL
2. **原子性**：每个迁移文件只做一件事
3. **可回滚**：必须包含 `-- Down Migration` 部分

## 标准迁移模板
```sql
-- Up Migration
-- 描述：添加用户手机号字段
-- 作者：AI（由 OpenCode 生成）
-- 日期：2026-02-28

BEGIN;

ALTER TABLE users
  ADD COLUMN phone VARCHAR(20) DEFAULT NULL,
  ADD COLUMN phone_verified_at TIMESTAMP DEFAULT NULL;

CREATE INDEX idx_users_phone ON users(phone)
  WHERE phone IS NOT NULL;

COMMIT;

-- Down Migration
-- BEGIN;
-- ALTER TABLE users DROP COLUMN phone, DROP COLUMN phone_verified_at;
-- DROP INDEX IF EXISTS idx_users_phone;
-- COMMIT;
```

## 高风险操作检查清单
- [ ] 大表（>100万行）操作需要在维护窗口执行
- [ ] 删除列前确认无代码引用
- [ ] 新增 NOT NULL 列时必须提供默认值
- [ ] 索引创建使用 CREATE INDEX CONCURRENTLY
````

### 7.4 组合 Skills：全栈功能开发

当任务涉及多个领域时，可以组合多个 Skills：

```mermaid
graph TB
    Request["用户请求：\n'为用户模块添加手机号登录功能'"] --> Analyzer

    Analyzer[Skills 分析器] --> S1
    Analyzer --> S2
    Analyzer --> S3
    Analyzer --> S4

    S1["REST API Skill\n接口设计规范"]
    S2["数据库迁移 Skill\n字段变更规范"]
    S3["安全 Skill\n短信验证码处理"]
    S4["测试 Skill\nE2E 测试规范"]

    S1 --> Combined
    S2 --> Combined
    S3 --> Combined
    S4 --> Combined

    Combined["组合上下文\n= API规范 + DB规范\n+ 安全规范 + 测试规范"]

    Combined --> Agent[AI Agent]

    Agent --> Out1["1. 数据库迁移文件\n添加 phone 字段"]
    Agent --> Out2["2. API 接口\nPOST /auth/phone"]
    Agent --> Out3["3. 短信服务集成\n安全的验证码逻辑"]
    Agent --> Out4["4. E2E 测试\n覆盖成功/失败场景"]
```

### 7.5 组合 Skill：企业级代码审查

创建文件 `.opencode/skills/code-review/SKILL.md`：

````markdown
# 企业级代码审查 Skill

## 激活场景
用户请求代码审查、安全检查、性能分析时激活。

## 审查维度

### 1. 安全审查
检查以下安全问题：
- SQL 注入：确保使用参数化查询
- XSS：确保输出转义
- 敏感信息：API Key、密码不得硬编码
- 认证：确保受保护路由有鉴权中间件

### 2. 性能审查
- N+1 查询问题
- 缺少数据库索引
- 大对象在内存中循环处理
- 未使用缓存的热点数据查询

### 3. 代码质量
- 函数单一职责
- 圈复杂度不超过 10
- 重复代码提取（DRY 原则）
- 错误处理覆盖

## 输出格式
```markdown
## 代码审查报告

### 🔴 必须修复（安全/功能问题）
1. **SQL 注入风险**（第 42 行）
   - 问题：直接拼接用户输入到 SQL 语句
   - 修复：使用参数化查询 `db.query('SELECT * FROM users WHERE id = ?', [id])`

### 🟡 建议优化（性能/质量问题）
1. **N+1 查询**（第 78-85 行）
   - 问题：在循环中调用数据库
   - 建议：使用 `include` 预加载关联数据

### 🟢 良好实践（值得保留）
- 统一的错误处理中间件
- 清晰的函数命名
```
````

### 7.6 Skill + MCP 组合实战：智能 PR 审查

将 GitHub MCP 与代码审查 Skill 结合，实现自动化 PR 审查：

```mermaid
sequenceDiagram
    participant Dev as 开发者
    participant OC as OpenCode
    participant Skill as Code Review Skill
    participant GH as GitHub MCP
    participant DB as Postgres MCP

    Dev->>OC: "@github 帮我审查 PR #156"
    OC->>Skill: 加载代码审查 Skill（上下文注入）
    OC->>GH: get_pull_request(156)
    GH-->>OC: PR 变更列表
    OC->>GH: get_file_contents(changed_files)
    GH-->>OC: 变更代码内容
    OC->>DB: 查询相关表结构（验证 SQL 变更）
    DB-->>OC: 表结构信息
    OC->>OC: 基于 Skill 规范进行多维度分析
    OC->>GH: create_review_comment(...安全问题...)
    OC->>GH: create_review_comment(...性能问题...)
    OC->>GH: submit_review("REQUEST_CHANGES")
    OC-->>Dev: "PR 审查完成，发现 2 个安全问题，3 个优化建议"
```

---

## 八、权限管理最佳实践

### 8.1 权限控制架构

```mermaid
flowchart TD
    Request["工具调用请求\n(bash, write, etc.)"] --> Check

    Check{权限检查}

    Check -->|已有允许规则| Allow["✅ 直接执行"]
    Check -->|已有拒绝规则| Deny["❌ 拒绝执行"]
    Check -->|无规则，交互模式| Prompt["💬 询问用户"]
    Check -->|无规则，CI模式| CI{"auto_approve?"}

    Prompt -->|用户允许 + 记住| SaveAllow["保存允许规则\n写入 SQLite"]
    Prompt -->|用户拒绝 + 记住| SaveDeny["保存拒绝规则\n写入 SQLite"]
    Prompt -->|用户允许 + 不记住| Allow

    CI -->|true| Allow
    CI -->|false| Deny

    SaveAllow --> Allow
    SaveDeny --> Deny
```

### 8.2 精细化权限配置

```json
{
  "permissions": {
    "rules": [
      {
        "tool": "bash",
        "pattern": "npm test*",
        "action": "allow"
      },
      {
        "tool": "bash",
        "pattern": "git push*",
        "action": "deny",
        "reason": "禁止 AI 直接推送代码"
      },
      {
        "tool": "write",
        "pattern": "*.env*",
        "action": "deny",
        "reason": "禁止修改环境配置文件"
      },
      {
        "tool": "bash",
        "pattern": "rm -rf*",
        "action": "deny",
        "reason": "禁止危险的删除操作"
      }
    ]
  }
}
```

---

## 九、进阶使用技巧

### 9.1 上下文管理与压缩

OpenCode 内置上下文压缩机制，当对话超过模型上下文窗口时自动压缩历史记录。

**最佳实践**：
- 每个功能开发建立新会话（`/session new`），保持上下文聚焦
- 用 `@文件名` 明确指定要分析的文件，避免 AI 猜测
- 定期使用 `/compact` 手动压缩，保留关键上下文

### 9.2 有效提示词技巧

```markdown
❌ 不好的提示：
"帮我优化代码"

✅ 好的提示：
"请分析 @src/services/user.service.ts 中 getUsersByRole 函数的性能问题。
该函数目前在生产环境中响应时间超过 2 秒，数据库中有约 50 万用户。
请提供具体的优化方案，并解释每个优化点的原理。"
```

**提示词模板**：

```
背景：[项目/功能背景]
目标：[具体想要实现的效果]
约束：[现有限制、不能改变的部分]
参考：@[相关文件] [参考实现]
输出格式：[期望的输出形式]
```

### 9.3 会话管理命令速查

| 命令 | 功能 |
|------|------|
| `/init` | 初始化项目，生成 AGENTS.md |
| `/session new` | 创建新会话 |
| `/session list` | 查看历史会话 |
| `/undo` | 撤销上一次变更 |
| `/redo` | 重做撤销的变更 |
| `/compact` | 压缩会话上下文 |
| `/share` | 生成会话分享链接 |
| `/connect` | 连接 LLM 提供商 |
| `Tab` | 切换 build/plan 模式 |
| `@文件名` | 引用项目文件 |

### 9.4 团队协作工作流

```mermaid
graph LR
    subgraph 个人开发
        A1["/init 初始化"] --> A2["Plan 模式分析需求"]
        A2 --> A3["Build 模式实现功能"]
        A3 --> A4["/share 分享会话给同事审查"]
    end

    subgraph 代码审查
        B1["加载同事的会话链接"] --> B2["了解 AI 实现思路"]
        B2 --> B3["提出改进建议"]
    end

    subgraph CI/CD集成
        C1["PR 触发"] --> C2["自动运行 OpenCode 代码审查"]
        C2 --> C3["结果评论到 PR"]
    end

    A4 --> B1
    A3 --> C1
```

---

## 十、典型场景端到端实战

### 场景：从需求到上线的完整开发流程

```mermaid
flowchart TD
    Start([产品需求]) --> Init

    Init["1. 初始化\nopencode /init"] --> Plan

    Plan["2. 需求分析\nPlan 模式\n理解需求，分析影响范围"] --> DB

    DB["3. 数据库设计\n数据库迁移 Skill + Postgres MCP\n设计表结构，生成迁移文件"] --> API

    API["4. 接口开发\nREST API Skill\n生成标准接口代码"] --> Test

    Test["5. 测试编写\n测试 Skill\n生成单元测试和集成测试"] --> Review

    Review["6. 代码审查\n代码审查 Skill + GitHub MCP\n自动审查，提交 PR 评论"] --> Fix

    Fix{审查通过?} -->|否| API
    Fix -->|是| Deploy

    Deploy["7. 部署验证\nPlaywright MCP\n自动化冒烟测试"] --> Done

    Done([功能上线])

    style Start fill:#4dabf7,color:#fff
    style Done fill:#51cf66,color:#fff
    style Fix fill:#ffd43b,color:#333
```

---

## 十一、常见问题与调试

### 11.1 MCP 连接问题排查

```mermaid
flowchart TD
    Problem["MCP Server 无法连接"] --> Check1

    Check1{检查 command 是否存在} -->|不存在| Fix1["执行 npm install -g\n安装对应包"]
    Check1 -->|存在| Check2

    Check2{检查环境变量是否注入} -->|缺失| Fix2["在 mcp.env 中\n配置环境变量"]
    Check2 -->|正确| Check3

    Check3{查看 OpenCode 日志} --> Log["cat ~/.local/share/opencode/log/latest.log"]
    Log --> Check4

    Check4{日志中的错误类型} -->|权限错误| Fix4["检查 API Key 有效性"]
    Check4 -->|网络超时| Fix5["检查代理设置\nHTTPS_PROXY 环境变量"]
    Check4 -->|协议错误| Fix6["确认 MCP Server 版本\n与 OpenCode 兼容"]
```

### 11.2 常见错误及解决方案

| 错误 | 原因 | 解决方案 |
|------|------|---------|
| `No provider configured` | 未配置 LLM 提供商 | 运行 `/connect` 配置 API Key |
| `Context window exceeded` | 上下文超长 | 使用 `/compact` 或新建会话 |
| `MCP server not found` | MCP 命令不存在 | 安装对应 npm 包 |
| `Permission denied for tool` | 权限规则拒绝 | 检查 `permissions.rules` 配置 |
| `AGENTS.md not found` | 未初始化项目 | 运行 `/init` |

---

## 十二、总结

```mermaid
mindmap
  root((OpenCode\n最佳实践))
    基础配置
      多环境配置分层
      AGENTS.md 精心维护
      权限规则精细化
    工作流
      Plan模式先规划
      Build模式再实现
      /undo 随时回滚
    MCP扩展
      文件系统MCP
      GitHub MCP
      数据库MCP
      自定义业务MCP
    Skills体系
      领域专属Skill
      多Skill组合
      与MCP协同
    Plugins
      代码质量插件
      审计日志插件
      自动化通知
    团队协作
      会话分享
      AGENTS.md入库
      CI集成审查
```

OpenCode 的核心价值在于其**开放的扩展体系**：

- **MCP** 打通外部工具和数据源，让 AI 获得真实的执行能力
- **Plugins** 在工作流的关键节点注入自定义逻辑，保障质量和安全
- **Skills** 将团队的最佳实践编码为可复用的 AI 上下文，保证输出一致性

三者组合使用，可以构建出真正适合团队的"AI 结对编程"体验。

---

## 参考资源

- [OpenCode 官网](https://opencode.ai)
- [OpenCode GitHub 仓库](https://github.com/anomalyco/opencode)
- [OpenCode 官方文档](https://opencode.ai/docs)
- [DeepWiki - OpenCode 架构分析](https://deepwiki.com/anomalyco/opencode)
- [MCP 协议规范](https://modelcontextprotocol.io)
- [OpenCode Discord 社区](https://discord.gg/opencode)
