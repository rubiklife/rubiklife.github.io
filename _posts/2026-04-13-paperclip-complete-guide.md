---
title: "Paperclip 完全使用指南：从入门配置到 AI 公司实战"
date: 2026-04-13 16:00:00 +0800
categories:
  - AI工具
tags:
  - Paperclip
  - Agent 编排
  - 自动化
toc: true
mermaid: true
---

> **Paperclip** 是一款开源 AI Agent 编排平台（MIT 协议），已在 GitHub 获得超过 **52.8k Stars**。它不是聊天机器人、不是 Agent 框架，而是一个能让你用 AI Agent 组成"零人力公司"的操控中台——拥有组织架构图、目标对齐、预算管理、治理机制与全链路审计。本文从零开始，带你完成环境搭建，并通过三个实战案例逐步掌握进阶用法。

---

## 一、Paperclip 是什么？

Paperclip 的核心理念：**如果 OpenClaw 是"员工"，Paperclip 就是"公司"。**

它是一个 Node.js 服务 + React UI 的组合，专门用于编排一支由 AI Agent 组成的团队来运营业务。你只需"招募" Agent、分配目标，就能从统一 Dashboard 追踪工作进展与成本。

### 1.1 它解决了什么问题？

| 没有 Paperclip 时 | 有 Paperclip 时 |
|---|---|
| 同时开 20 个 Claude Code 标签页，完全搞不清楚谁在干什么 | 任务以工单形式组织，会话有线程，重启后不丢失 |
| 需要手动到处收集上下文，再提醒 Agent "你在做什么" | 上下文从公司目标自动流向项目与任务，Agent 始终知道为何而做 |
| Agent 跑飞了，花了几百美元 Token 配额才发现 | 每个 Agent 有月度预算上限，超限自动停止 |
| 周期性任务（客服/报告）靠手动触发 | 心跳机制（Heartbeat）按计划自动执行 |
| Agent 配置分散在一堆文件夹里 | 组织架构图 + 工单系统 + 治理机制，开箱即用 |

### 1.2 核心概念

```mermaid
graph TD
    A[Board 董事会\n人类运营者] -->|批准/拒绝| B[Company 公司]
    B --> C[Project 项目]
    C --> D[Goal 目标]
    D --> E[Issue 工单/任务]
    E --> F[Run 执行记录]
    F -->|执行| G[Agent 智能体]
    G -->|适配器| H1[Claude Code]
    G -->|适配器| H2[OpenClaw]
    G -->|适配器| H3[Codex]
    G -->|适配器| H4[Cursor]
    G -->|适配器| H5[自定义 HTTP]
```

| 概念 | 说明 |
|------|------|
| **Company** | 多租户隔离单元，一个 Paperclip 实例可运行多家"公司" |
| **Board** | 人类运营者，拥有最高治理权（审批、暂停、终止 Agent） |
| **Agent** | 可接收心跳的 AI 实体，可以是 Claude Code、OpenClaw、HTTP 接口等 |
| **Issue** | 工单/任务，每条对话均有追踪，所有决策可审计 |
| **Heartbeat** | 心跳机制，Agent 定时唤醒、检查任务、主动行动 |
| **Run** | 单次执行记录，包含完整 Tool Call 追踪 |
| **Skill** | 运行时注入 Agent 的能力扩展，无需重新训练 |
| **Routine** | 定时/事件驱动的周期性任务 |

---

## 二、环境要求与快速安装

### 2.1 系统要求

| 依赖 | 最低版本 | 说明 |
|------|---------|------|
| Node.js | 20+ | 推荐 LTS 版本 |
| pnpm | 9.15+ | 包管理器 |
| PostgreSQL | 可选 | 默认使用内置 embedded Postgres |

### 2.2 一键启动（推荐）

Paperclip 提供了 `onboard` 命令，自动完成所有初始化：

```bash
# 最简单的方式——本地可信模式（127.0.0.1，无需登录）
npx paperclipai onboard --yes

# 局域网访问模式（适合从手机/其他设备访问）
npx paperclipai onboard --yes --bind lan

# Tailscale 内网穿透模式（适合远程访问）
npx paperclipai onboard --yes --bind tailnet
```

> 首次运行会自动下载依赖、初始化内置 PostgreSQL 数据库，无需额外配置。

启动成功后，访问 `http://localhost:3100` 即可打开 Web UI。

### 2.3 源码安装（适合开发者）

```bash
git clone https://github.com/paperclipai/paperclip.git
cd paperclip
pnpm install
pnpm dev        # 同时启动 API Server + UI，支持热更新
```

常用开发命令：

```bash
pnpm dev          # 完整开发模式（API + UI，watch 模式）
pnpm dev:once     # 完整开发模式（无 watch）
pnpm dev:server   # 仅启动 Server
pnpm build        # 构建全部
pnpm typecheck    # 类型检查
pnpm test:run     # 运行测试
pnpm db:generate  # 生成 DB 迁移
pnpm db:migrate   # 执行迁移
```

### 2.4 两种部署模式

```mermaid
graph LR
    A[部署模式] --> B[local_trusted\n本地可信模式]
    A --> C[authenticated\n认证模式]

    B --> B1["绑定 127.0.0.1\n无需登录\n合成 Board 用户\n适合单人本地开发"]
    C --> C1["绑定 0.0.0.0 或自定义\nbetter-auth 会话认证\n支持多用户 + SSO\n适合生产部署"]
```

---

## 三、初始配置：创建第一家 AI 公司

启动后，Onboarding Wizard 会引导你完成基础配置。

### 3.1 创建公司

1. 打开 `http://localhost:3100`
2. 点击 **"Create Company"**
3. 填写公司名称、描述、目标（Mission）

**示例公司配置：**

```
公司名称：RubikDev AI
使命：构建面向独立开发者的 AI SaaS 工具套件，目标 MRR $10,000
```

### 3.2 配置第一个 Agent

Paperclip 的核心优势是"Bring Your Own Agent"——只要能接收心跳，就能被招募。

**内置支持的适配器类型：**

```mermaid
graph TD
    A[适配器类型] --> B[本地 CLI 适配器]
    A --> C[网关适配器]
    A --> D[HTTP 适配器]

    B --> B1[claude_local\nClaude Code]
    B --> B2[codex_local\nOpenAI Codex]
    B --> B3[cursor\nCursor IDE]
    B --> B4[gemini_local\nGemini CLI]
    B --> B5[opencode_local\nOpenCode]
    B --> B6[pi_local\nPi AI]

    C --> C1[openclaw_gateway\nOpenClaw 远程]
    D --> D1[自定义 HTTP\nWebhook]
```

**在 UI 中添加 Claude Code Agent：**

1. 进入公司 → **Agents** → **+ Add Agent**
2. 选择适配器：`claude_local`
3. 填写角色（Role）与职位（Title）：
   - Title: `CTO`
   - Role: `负责技术架构设计与核心功能开发`
4. 设置月度预算（Budget）：`$50`
5. 设置心跳间隔（Heartbeat）：`每 30 分钟`

### 3.3 设置项目与目标

**目标层级：**

```
Company（公司）
  └── Project（项目）
        └── Goal（目标）
              └── Issue（工单）
```

1. 进入公司 → **Projects** → **+ New Project**
2. 创建项目：`AI 笔记应用`
3. 添加目标（Goal）：`实现用户登录与 Markdown 编辑功能`
4. 在目标下创建 Issue：`实现 JWT 认证接口`

---

## 四、心跳机制（Heartbeat）深度解析

心跳是 Paperclip 最核心的机制——它让 Agent 能够自主运转，无需人工干预。

### 4.1 心跳工作流

```mermaid
sequenceDiagram
    participant S as HeartbeatService
    participant A as Agent
    participant I as Issue 系统
    participant B as Board（你）

    loop 每个心跳周期
        S->>A: 唤醒信号（wakeup）
        A->>I: 检查已分配任务
        A->>A: 执行工作（调用工具、写代码等）
        A->>I: 更新任务状态
        A->>B: 如需审批，发送审批请求
        B-->>A: 批准/拒绝
        A->>S: 上报执行结果（Run Record）
    end
```

### 4.2 触发方式

| 触发方式 | 说明 |
|---------|------|
| **定时心跳** | 按设定间隔（如每 30 分钟）自动唤醒 Agent |
| **Issue 分配** | 有新工单分配给 Agent 时立即触发 |
| **@提及** | 在工单中 @某个 Agent 触发唤醒 |
| **手动唤醒** | 在 UI 中点击"Wakeup"按钮立即触发 |

### 4.3 原子执行保障

Paperclip 的任务检出（Task Checkout）与预算强制执行是原子操作：
- **防止重复工作**：两个 Agent 不会同时处理同一个 Issue
- **防止超支**：预算限制在执行层强制执行，不依赖 Agent 自觉

---

## 五、实战案例一：用 Claude Code 自动开发功能

**场景：** 你有一个 React 项目，想让 Agent 自动实现"用户注册"功能。

### 步骤一：创建工单

在 Paperclip UI 中创建 Issue：

```markdown
**标题：** 实现用户注册 API

**描述：**
需要实现一个 POST /api/register 接口，要求：
1. 接受 email 和 password 字段
2. 密码使用 bcrypt 加密存储
3. 返回 JWT Token
4. 重复邮箱返回 409 错误

**验收标准：**
- [ ] API 可正常注册
- [ ] 密码已加密
- [ ] 单元测试覆盖主要分支

**关联目标：** 用户认证系统 v1.0
```

### 步骤二：分配给 CTO Agent

1. 在 Issue 右侧 **Assignee** 选择 `CTO (claude_local)`
2. Agent 在下次心跳时自动接收任务并开始工作

### 步骤三：监控执行过程

在 **Run Transcript** 面板中可以看到 Agent 的完整执行记录：

```
[10:32:01] Agent CTO 开始处理 Issue #42
[10:32:03] 工具调用: read_file("src/routes/auth.ts")
[10:32:05] 工具调用: write_file("src/routes/auth.ts", ...)
[10:32:08] 工具调用: run_tests("src/routes/auth.test.ts")
[10:32:45] 测试通过 (3/3)
[10:32:46] 更新 Issue #42 状态 → 完成
[10:32:46] 花费 Token: $0.23 | 月度累计: $12.50
```

### 步骤四：审阅与合并

Agent 完成后，你会在 **Inbox** 收到通知，查看变更后点击批准。

---

## 六、实战案例二：多 Agent 协作流水线

**场景：** 搭建"产品经理 + 工程师 + 测试工程师"三角协作，自动完成需求→开发→测试全流程。

### 6.1 组织架构设计

```mermaid
graph TD
    Board[Board\n你/人类] --> PM[产品经理 Agent\ngemini_local]
    Board --> CTO[CTO Agent\nclaude_local]
    PM --> Dev1[前端工程师 Agent\nclaude_local]
    PM --> Dev2[后端工程师 Agent\ncodex_local]
    CTO --> QA[测试工程师 Agent\nclaude_local]
```

### 6.2 各 Agent 配置

**产品经理（PM）Agent：**
```
适配器: gemini_local
职位: Product Manager
职责: 将用户需求拆解为技术工单，分配给工程师，跟踪进度
心跳间隔: 每 1 小时
预算: $20/月
```

**后端工程师 Agent：**
```
适配器: codex_local
职位: Backend Engineer
职责: 实现 API 接口与数据库操作
心跳间隔: 每 30 分钟
预算: $80/月
```

**测试工程师 Agent：**
```
适配器: claude_local
职位: QA Engineer
职责: 编写并运行测试，发现 Bug 后创建 Issue
心跳间隔: 每 2 小时（在工程师工作后触发）
预算: $30/月
```

### 6.3 目标驱动的任务流转

创建顶层目标后，Paperclip 的**目标感知执行**机制会自动向每个 Agent 传递完整的目标谱系：

```
公司使命 → 项目目标 → Sprint 目标 → 具体工单
```

这样每个 Agent 在执行时都清楚"为什么要做这件事"，产出更准确。

---

## 七、实战案例三：定时周期任务（Routines）

**场景：** 每天早上自动生成"昨日进展摘要"并发送报告。

### 7.1 创建 Routine

1. 进入公司 → **Routines** → **+ New Routine**
2. 配置如下：

```yaml
名称: 每日进展报告
触发器: cron（每天 09:00）
分配 Agent: PM Agent
任务描述: |
  检查过去 24 小时内所有已完成和进行中的 Issue，
  生成结构化日报，包括：
  - 完成功能列表
  - 遇到的阻碍
  - 今日计划
  - 预算消耗情况
  将报告发送到 Inbox
```

### 7.2 Routine 与 Heartbeat 的区别

| | Heartbeat | Routine |
|---|---|---|
| **触发方式** | 时间间隔/事件 | Cron 表达式 |
| **目的** | Agent 日常工作循环 | 特定周期性任务 |
| **典型用途** | 处理工单、响应提及 | 报告、清理、批量操作 |

---

## 八、Skills 系统：运行时增强 Agent 能力

Skills 是 Paperclip 独特的**运行时技能注入**机制——不需要重新训练模型，就能让 Agent 学会新的工作流程。

### 8.1 内置 Skills 目录

项目根目录的 `.agents/skills/` 和 `.claude/skills/` 目录存放可被注入的技能文件。

### 8.2 创建自定义 Skill

创建文件 `.agents/skills/code-review.md`：

````markdown
# 代码审查 Skill

## 触发条件
当 Issue 标题包含 `[Review]` 时激活此 Skill。

## 工作流程
1. 读取 PR 关联的代码变更
2. 检查以下维度：
   - 安全漏洞（SQL 注入、XSS 等）
   - 性能问题（N+1 查询、大循环）
   - 代码规范（命名、注释、测试覆盖率）
3. 以标准格式输出审查报告
4. 如发现严重问题，自动创建 Bug Issue

## 输出格式
```
## 代码审查报告
**PR:** #<编号>
**审查人:** <Agent 名称>
**结论:** APPROVE / REQUEST_CHANGES

### 安全（Score: x/10）
...

### 性能（Score: x/10）
...
```
````

### 8.3 在 Agent 中启用 Skill

在 Agent 配置中关联 Skill：

```json
{
  "agent": "Backend Engineer",
  "skills": ["code-review", "database-migration-safety"]
}
```

---

## 九、预算管理与成本控制

这是 Paperclip 相比其他编排工具最实用的特性之一。

### 9.1 预算配置

每个 Agent 可设置：
- **月度预算上限**（如 $50/月）
- **单次运行上限**（如单次最多消耗 $2）
- **预算告警阈值**（如使用 80% 时通知）

### 9.2 预算强制执行机制

```mermaid
graph TD
    A[Agent 准备执行] --> B{检查预算余额}
    B -->|充足| C[原子锁定本次预算]
    C --> D[执行任务]
    D --> E[更新实际消耗]
    B -->|不足| F[停止执行]
    F --> G[通知 Board 预算超限]
    G --> H{Board 决策}
    H -->|追加预算| B
    H -->|暂停 Agent| I[Agent 休眠]
```

### 9.3 成本可视化

Costs & Usage 面板提供：
- 按 Agent、按项目的费用明细
- Token 消耗趋势图
- 与预算对比的实时仪表盘

---

## 十、多公司管理

一个 Paperclip 实例可以运行多家独立"公司"，数据完全隔离。

### 10.1 适用场景

- 你同时运营多个独立 SaaS 产品
- 你是 AI 外包服务商，每个客户是一家"公司"
- 你用独立公司区分不同业务线（开发/运营/市场）

### 10.2 公司间隔离保证

```mermaid
graph LR
    Deployment[Paperclip 实例] --> C1[Company A\n完全隔离的数据库]
    Deployment --> C2[Company B\n完全隔离的数据库]
    Deployment --> C3[Company C\n完全隔离的数据库]

    C1 --> A1[Agent 团队 A]
    C2 --> A2[Agent 团队 B]
    C3 --> A3[Agent 团队 C]
```

每个实体（Agent、Issue、Run、Budget）都以 `companyId` 为作用域，路由层和服务层双重强制隔离。

---

## 十一、插件系统（Plugin System）

Paperclip 拥有一套完整的插件架构，可以扩展知识库、自定义追踪、接入消息队列等。

### 11.1 插件能做什么

- 添加知识库（RAG）
- 自定义执行追踪
- 接入外部队列（Kafka、Redis）
- 自定义 UI 面板（Plugin UI Slots）
- 实现 Webhook 触发器

### 11.2 寻找社区插件

访问 [awesome-paperclip](https://github.com/paperclipai/awesome-paperclip) 获取社区维护的插件列表。

---

## 十二、生产部署

### 12.1 Docker 部署

```bash
# 使用官方 Dockerfile
docker build -t paperclip .
docker run -p 3100:3100 \
  -e PAPERCLIP_MODE=authenticated \
  -e DATABASE_URL=postgresql://... \
  paperclip
```

### 12.2 认证模式配置

在 `config.json` 中配置：

```json
{
  "mode": "authenticated",
  "bind": "0.0.0.0",
  "port": 3100,
  "database": {
    "url": "postgresql://user:pass@host:5432/paperclip"
  },
  "auth": {
    "secret": "your-secret-key",
    "providers": ["email", "github"]
  },
  "telemetry": {
    "enabled": false
  }
}
```

### 12.3 外部 PostgreSQL 配置

生产环境推荐使用独立 PostgreSQL：

```bash
# 环境变量方式
export DATABASE_URL=postgresql://user:pass@host:5432/paperclip
export PAPERCLIP_MODE=authenticated
npx paperclipai start
```

### 12.4 Tailscale 移动访问方案

对于个人用户或小团队，推荐通过 Tailscale 实现安全远程访问：

```bash
# 安装 Tailscale 后
npx paperclipai onboard --yes --bind tailnet
# 然后通过 Tailscale IP 从手机访问 Dashboard
```

### 12.5 公司数据导入导出

```bash
# 导出公司（自动脱敏 Secrets）
paperclipai companies export --company-id <id> --output company.zip

# 导入到新实例
paperclipai companies import --file company.zip
```

---

## 十三、CLI 完整参考

### 13.1 设置与配置命令

```bash
paperclipai onboard [--yes] [--bind <preset>]   # 初始化向导
paperclipai configure                            # 编辑配置
paperclipai configure --show                     # 查看当前配置
```

### 13.2 Server 命令

```bash
paperclipai start                  # 启动服务
paperclipai start --port 3200      # 指定端口
paperclipai stop                   # 停止服务
paperclipai status                 # 查看运行状态
paperclipai logs                   # 查看日志
```

### 13.3 Worktree 命令（多实例并行）

```bash
paperclipai worktree create <name>   # 创建新 worktree 实例
paperclipai worktree list            # 列出所有实例
paperclipai worktree switch <name>   # 切换到指定实例
paperclipai worktree remove <name>   # 删除实例
```

> Worktree 允许你在同一个 Git 仓库中为不同分支运行独立的 Paperclip 实例，非常适合同时测试多个功能分支。

### 13.4 Client 命令

```bash
paperclipai issue create --title "..." --body "..."  # 创建工单
paperclipai issue list                               # 列出工单
paperclipai agent wakeup <agent-id>                  # 手动唤醒 Agent
paperclipai companies export                         # 导出公司
paperclipai companies import --file <file>           # 导入公司
```

---

## 十四、关闭遥测

Paperclip 默认开启匿名使用遥测（不收集个人信息、Issue 内容、提示词或文件路径）：

```bash
# 方式 1：环境变量
export PAPERCLIP_TELEMETRY_DISABLED=1

# 方式 2：标准 DNT 约定
export DO_NOT_TRACK=1

# 方式 3：配置文件
# 在 config.json 中设置 telemetry.enabled: false
```

---

## 十五、与同类工具的对比

| | Paperclip | LangChain | CrewAI | Asana + Agent |
|---|---|---|---|---|
| **定位** | AI 公司编排 | Agent 开发框架 | 多 Agent 框架 | 任务管理 + Agent |
| **组织架构** | ✅ 内置 | ❌ | 部分 | ❌ |
| **预算管理** | ✅ 内置 | ❌ | ❌ | ❌ |
| **审计追踪** | ✅ 全量 | 部分 | 部分 | ❌ |
| **多公司** | ✅ 内置 | ❌ | ❌ | 付费 |
| **自托管** | ✅ 免费 | ✅ | ✅ | 有限 |
| **Agent 无关** | ✅ 任意 Agent | 框架绑定 | 框架绑定 | 部分 |
| **移动端** | ✅ | ❌ | ❌ | ✅ |

---

## 十六、常见问题

**Q：我只有一个 Agent，需要 Paperclip 吗？**  
A：可能不需要。Paperclip 面向多 Agent 协作场景。单个 Agent 直接用就好，有 20 个以上并发时才真正体现价值。

**Q：Agent 一直运行吗？**  
A：默认是按心跳调度 + 事件触发（工单分配、@提及）。也可以接入 OpenClaw 等支持持续运行的 Agent。

**Q：如何接入自定义 Agent？**  
A：实现一个能接收 HTTP POST（心跳信号）的接口，返回执行结果即可。最小契约只需要"可被调用"。

**Q：数据安全吗？**  
A：完全自托管，数据不离开你的服务器。遥测也不包含业务数据。

**Q：Clipmart 是什么？**  
A：即将上线的功能，支持一键下载并运行预构建的"公司模板"，包含完整的组织结构、Agent 配置和 Skills。

---

## 总结

Paperclip 提供了一个全新的视角：**把 AI Agent 当员工管，把 AI 协作当公司运营**。

它真正解决了多 Agent 协作中最棘手的几个问题：
- **原子任务调度**——防止重复工作
- **目标感知上下文**——Agent 始终知道"为什么"
- **预算硬限制**——告别 Token 失控
- **全链路可审计**——每一个决策都有记录

如果你正在用多个 AI Agent 并行工作，不妨试试把它们都纳入 Paperclip 管理——你会发现"运营 AI 公司"比"盯着多个 terminal"轻松得多。

---

**参考资源：**
- [GitHub 仓库](https://github.com/paperclipai/paperclip)
- [DeepWiki 技术文档](https://deepwiki.com/paperclipai/paperclip)
- [Discord 社区](https://discord.gg/paperclip)
- [awesome-paperclip 插件生态](https://github.com/paperclipai/awesome-paperclip)
