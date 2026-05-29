---
title: "OpenFang 完全使用指南：从入门配置到实战进阶"
date: 2026-05-29 10:00:00 +0800
categories:
  - AI工具
tags:
  - AI
  - Agent
toc: true
toc_label: "目录"
toc_icon: "robot"
mermaid: true
excerpt: "OpenFang 是由 RightNow AI 开源的 Rust Agent 操作系统，单二进制部署，内置 7 个自主 Hands、30 个 Agent 模板、40 个渠道适配器与 16 层安全体系。本文从安装配置、Agent 与 Hands 实战，到渠道接入、工作流编排与生产部署，逐步深入。"
---

> **OpenFang** 是 [RightNow AI](https://rightnowai.co) 开源的 **Agent Operating System（Agent 操作系统）**，GitHub 上已获得 **17.7k+ Stars**（[RightNow-AI/openfang](https://github.com/RightNow-AI/openfang)）。与传统「等用户输入才响应」的聊天机器人框架不同，OpenFang 提供完整的自主 Agent 编排层：定时任务、跨渠道记忆、WASM 沙箱、MCP/A2A 协议，以及 7 个开箱即用的 **Hands（自主能力包）**——它们会在后台持续工作，把结果推送到 Dashboard 或 Telegram。
>
> 官方文档：[openfang.sh](https://www.openfang.sh/) · [DeepWiki 架构索引](https://deepwiki.com/RightNow-AI/openfang) · [Getting Started](https://github.com/RightNow-AI/openfang/blob/main/docs/getting-started.md)

---

## 核心概念：OpenFang 是什么？

OpenFang 的定位不是「又一个 Python Agent 框架」，而是一套用 Rust 从零构建的 **Agent OS**：

| 维度 | 传统 Agent 框架 | OpenFang |
|------|----------------|----------|
| 运行模式 | 等用户发消息 | **Hands 定时自主运行** |
| 部署形态 | Python 环境 + 多依赖 | **单二进制 ~32MB** |
| 渠道支持 | 通常 0~3 个 | **40 个内置适配器** |
| 工具沙箱 | Docker 或无 | **WASM 双计量沙箱** |
| 记忆 | 文件或外部 DB | **SQLite + 向量嵌入 + 跨渠道 canonical session** |
| 安全层 | 1~3 层 | **16 层独立安全子系统** |

整个系统编译为 **一个 ~32MB 二进制**，包含内核、API 服务器、Web Dashboard 和 7 个 Hands，冷启动约 **180ms**，空闲内存约 **40MB**（数据来源：[官方 Benchmark](https://www.openfang.sh/)）。

> **版本说明**：当前最新 release 为 **v0.6.9**（2026 年 5 月）。项目处于 pre-1.0 阶段，小版本间可能有 breaking changes；生产环境建议 pin 到特定 commit。

---

## 系统架构概览

OpenFang 采用 **14-crate Cargo workspace** 模块化设计，内核 `OpenFangKernel` 作为中央调度器，协调 Agent 注册、调度、资源管理与子系统通信。

```mermaid
graph TB
    subgraph UI["用户界面层"]
        CLI["CLI / TUI"]
        WEB["Web Dashboard<br/>:4200"]
        DESK["Tauri 2.0 桌面端"]
    end

    subgraph API["API 层 openfang-api"]
        REST["140+ REST 端点"]
        WS["WebSocket / SSE"]
        OAI["OpenAI 兼容 API<br/>/v1/chat/completions"]
    end

    subgraph KERNEL["内核 openfang-kernel"]
        SCHED["调度器 / 工作流引擎"]
        RBAC["RBAC / 能力门控"]
        METER["计量 / 预算追踪"]
    end

    subgraph RUNTIME["运行时 openfang-runtime"]
        LOOP["Agent Loop"]
        TOOLS["53 内置工具 + MCP"]
        WASM["WASM 沙箱"]
        LLM["3 驱动 × 27 Provider"]
    end

    subgraph DATA["数据层"]
        MEM["openfang-memory<br/>SQLite + 向量"]
        HANDS["openfang-hands<br/>7 自主 Hands"]
        SKILLS["openfang-skills<br/>60 技能 + FangHub"]
    end

    subgraph CHANNELS["渠道层 openfang-channels"]
        TG["Telegram"]
        DC["Discord"]
        SL["Slack"]
        WA["WhatsApp"]
        MORE["+ 36 平台..."]
    end

    CLI & WEB & DESK --> API
    API --> KERNEL
    KERNEL --> RUNTIME
    KERNEL --> DATA
    KERNEL --> CHANNELS
    RUNTIME --> MEM
    HANDS --> RUNTIME
```

**14 个核心 Crate 职责速查：**

| Crate | 职责 |
|-------|------|
| `openfang-kernel` | 中央编排：工作流、调度、RBAC、预算 |
| `openfang-runtime` | Agent 循环、LLM 驱动、工具、WASM 沙箱、MCP/A2A |
| `openfang-api` | Axum HTTP 服务器、WebSocket、Dashboard |
| `openfang-memory` | SQLite 持久化、向量嵌入、会话压缩 |
| `openfang-channels` | 40 消息渠道适配器 |
| `openfang-hands` | 7 个自主 Hands 生命周期管理 |
| `openfang-skills` | SKILL.md 解析、FangHub 市场 |
| `openfang-cli` | CLI、守护进程管理、TUI |
| `openfang-desktop` | Tauri 2.0 原生桌面应用 |

---

## 第一章：安装与初始化

### 1.1 系统要求

- **操作系统**：macOS / Linux / Windows
- **Windows 用户**：推荐 PowerShell 安装脚本，或使用 Desktop `.msi` 安装包
- **可选**：Rust 1.75+（源码编译）、Node.js 18+（WhatsApp Web Gateway）、Docker

### 1.2 五种安装方式

**方式一：Shell 安装（macOS / Linux，推荐）**

```bash
curl -fsSL https://openfang.sh/install | sh
```

二进制安装到 `~/.openfang/bin/`，并加入 PATH。

**方式二：PowerShell 安装（Windows）**

```powershell
irm https://openfang.sh/install.ps1 | iex
```

脚本会下载最新 CLI、校验 SHA256，并写入用户 PATH。

**方式三：Desktop 安装包**

从 [GitHub Releases](https://github.com/RightNow-AI/openfang/releases/latest) 下载：

| 平台 | 格式 |
|------|------|
| Windows | `.msi` |
| macOS | `.dmg` |
| Linux | `.AppImage` / `.deb` |

桌面版包含系统托盘、自动更新、OS 通知，功能与 CLI 版等价。

**方式四：Cargo 安装**

```bash
cargo install --git https://github.com/RightNow-AI/openfang openfang-cli
```

**方式五：Docker**

```bash
docker pull ghcr.io/RightNow-AI/openfang:latest

docker run -d \
  --name openfang \
  -p 4200:4200 \
  -e ANTHROPIC_API_KEY=$ANTHROPIC_API_KEY \
  -v openfang-data:/data \
  ghcr.io/RightNow-AI/openfang:latest
```

> Docker 容器内配置文件路径为 `/data/config.toml`（镜像设置 `OPENFANG_HOME=/data`）。若需访问宿主机 Ollama，添加 `--add-host=host.docker.internal:host-gateway`。

### 1.3 初始化

```bash
openfang init      # 创建 ~/.openfang/ 目录和默认 config.toml
openfang doctor    # 诊断：配置、API Key、工具链
openfang --version # 验证安装
```

`openfang init` 会创建：

```
~/.openfang/
├── config.toml    # 主配置
├── data/          # SQLite 数据库与运行时数据
└── agents/        # 自定义 Agent manifest（可选）
```

### 1.4 启动守护进程

```bash
openfang start
# Dashboard: http://127.0.0.1:4200
```

守护进程提供：

- **REST API**：`http://127.0.0.1:4200/api/`
- **WebSocket**：`ws://127.0.0.1:4200/api/agents/{id}/ws`
- **WebChat UI**：`http://127.0.0.1:4200/`
- **OFP 网络**：P2P Agent 通信（可选）

```bash
openfang status    # 查看守护进程状态
# 停止：Ctrl+C 或 curl -X POST http://127.0.0.1:4200/api/shutdown
```

---

## 第二章：LLM 提供商配置

OpenFang 通过 **3 个原生驱动**（Anthropic、Gemini、OpenAI 兼容）路由到 **27+ 提供商、123+ 模型**，支持智能路由、自动降级、成本追踪。

### 2.1 设置 API Key

密钥**不写入 config.toml**，而是通过环境变量引用（防止意外泄露到 Git）：

```bash
# Anthropic（默认）
export ANTHROPIC_API_KEY=sk-ant-...

# OpenAI
export OPENAI_API_KEY=sk-...

# Groq（有免费额度，适合入门）
export GROQ_API_KEY=gsk_...

# DeepSeek（国内高性价比）
export DEEPSEEK_API_KEY=sk-...

# 本地 Ollama（无需 Key）
# 确保 ollama serve 在 11434 端口运行
```

将 `export` 写入 `~/.bashrc` / `~/.zshrc` 或 Windows 用户环境变量以持久化。

### 2.2 编辑 config.toml

最小可用配置：

```toml
# ~/.openfang/config.toml

[default_model]
provider = "anthropic"
model = "claude-sonnet-4-20250514"
api_key_env = "ANTHROPIC_API_KEY"
```

**使用 Groq 免费模型入门：**

```toml
[default_model]
provider = "groq"
model = "llama-3.3-70b-versatile"
api_key_env = "GROQ_API_KEY"
```

**使用本地 Ollama：**

```toml
[default_model]
provider = "ollama"
model = "llama3.2:latest"
base_url = "http://localhost:11434"
api_key_env = ""
```

### 2.3 降级 Provider 与 Web 搜索

```toml
# 主 Provider 不可用时自动切换
[[fallback_providers]]
provider = "groq"
model = "llama-3.3-70b-versatile"
api_key_env = "GROQ_API_KEY"

[[fallback_providers]]
provider = "ollama"
model = "llama3.2:latest"
api_key_env = ""
base_url = "http://localhost:11434"

# Web 搜索（Agent 联网能力）
[web]
search_provider = "auto"   # auto | brave | tavily | perplexity | duck_duck_go

[web.tavily]
api_key_env = "TAVILY_API_KEY"
search_depth = "basic"
max_results = 5
```

### 2.4 支持的 Provider 一览

Anthropic、Gemini、OpenAI、Groq、DeepSeek、OpenRouter、Together、Mistral、Fireworks、Cohere、Perplexity、xAI、Ollama、vLLM、LM Studio、Qwen、MiniMax、Zhipu（智谱）、Moonshot（Kimi）、Qianfan、Bedrock 等。

每个 Agent 可在 manifest 中单独覆盖 `provider` 和 `model`，实现「复杂任务用 Claude、日常对话用 Groq」的分层策略。

---

## 第三章：Agent 基础操作

OpenFang 内置 **30 个预置 Agent 模板**（coder、researcher、writer、ops、analyst、security-auditor 等），分布在仓库 `agents/` 目录。

### 3.1 生成第一个 Agent

```bash
# 使用内置模板
openfang agent spawn agents/hello-world/agent.toml

# 输出示例：
# Agent spawned successfully!
#   ID:   a1b2c3d4-e5f6-...
#   Name: hello-world
```

### 3.2 自定义 Agent Manifest

创建 `my-assistant.toml`：

```toml
name = "my-assistant"
version = "0.1.0"
description = "通用助手，可读写文件和联网"
author = "you"
module = "builtin:chat"

[model]
provider = "groq"
model = "llama-3.3-70b-versatile"

[capabilities]
tools = ["file_read", "file_list", "web_fetch"]
memory_read = ["*"]
memory_write = ["self.*"]
```

```bash
openfang agent spawn my-assistant.toml
openfang agent list    # 查看所有运行中的 Agent
```

### 3.3 与 Agent 对话

```bash
# 按 ID 对话
openfang agent chat a1b2c3d4-e5f6-...

# 快捷命令（选第一个可用 Agent）
openfang chat

# 按名称对话
openfang chat hello-world
```

示例会话：

```
you> 列出当前目录的文件

agent> 当前目录包含：
- Cargo.toml
- README.md
- agents/
- crates/
...

  [tokens: 142 in / 87 out | iterations: 1]

you> exit
```

### 3.4 Web Dashboard 对话

浏览器打开 `http://127.0.0.1:4200/`，可：

- 查看所有运行中的 Agent
- 实时 WebSocket 流式对话
- 查看每条消息的 Token 用量

---

## 第四章：Hands —— 真正「为你工作」的自主 Agent

> **传统 Agent 等你输入；Hands 为你工作。**

Hands 是 OpenFang 的核心创新：**预配置的自主能力包**，按日程或触发器在后台运行，无需你每次手动 prompt。每个 Hand 打包了：

- `HAND.toml`：工具、设置、Dashboard 指标声明
- **System Prompt**：500+ 词的多阶段操作手册
- `SKILL.md`：运行时注入的领域知识
- **Guardrails**：敏感操作审批门（如 Browser Hand 购买前必须确认）

全部编译进二进制，无需额外下载。

### 4.1 七大内置 Hands

| Hand | 类型 | 核心能力 |
|------|------|---------|
| **Clip** | 内容 | YouTube 长视频 → 竖屏 Shorts，FFmpeg + yt-dlp + 5 种 STT，自动发布 Telegram/WhatsApp |
| **Lead** | 数据 | 每日自动发现、丰富、评分（0-100）潜在客户，导出 CSV/JSON，构建 ICP 知识图谱 |
| **Collector** | 情报 | OSINT 级目标监控：变更检测、情感分析、知识图谱、关键告警 |
| **Predictor** | 预测 | 超级预测引擎：多源信号、校准推理链、Brier 分数追踪、逆向共识模式 |
| **Researcher** | 研究 | CRAAP 事实核查、多语言引用报告（APA 格式）、交叉验证 |
| **Twitter** | 社交 | X 账号自主运营：7 种内容格式轮换、排期发布、互动追踪、审批队列 |
| **Browser** | 自动化 | Playwright 网页自动化，**强制购买审批门**，会话持久化 |

### 4.2 Hands CLI 操作

```bash
openfang hand list                    # 列出所有可用 Hands
openfang hand activate researcher     # 激活 Researcher，立即开始工作
openfang hand status researcher       # 查看进度与指标
openfang hand activate lead           # 激活 Lead，按日程每日运行
openfang hand pause lead              # 暂停（保留状态）
openfang hand resume lead             # 恢复
openfang hand deactivate lead         # 完全停止
```

### 4.3 实战案例一：每日竞品情报监控（Collector）

**场景**：你是一家 SaaS 公司的产品负责人，需要持续监控 3 个竞品的产品动态、定价变化和用户口碑。

**步骤：**

```bash
# 1. 确保 daemon 运行
openfang start

# 2. 激活 Collector Hand
openfang hand activate collector

# 3. 在 Dashboard → Hands → Collector 中配置监控目标
#    例如：competitor-a.com, "Competitor B pricing", "Competitor C reviews"
```

Collector 会：

1. 持续抓取目标页面的变更
2. 对内容进行情感分析
3. 构建知识图谱，关联实体与事件
4. 检测到关键变化时，通过 Telegram / Dashboard 推送告警

```bash
openfang hand status collector   # 查看监控状态、告警数、图谱节点数
```

**配合 Telegram 接收告警**（见第五章渠道配置）：

```toml
[channels.telegram]
bot_token_env = "TELEGRAM_BOT_TOKEN"
default_agent = "assistant"
allowed_users = ["你的Telegram用户ID"]
```

### 4.4 实战案例二：深度行业研究报告（Researcher）

**场景**：撰写一份关于「2026 年 AI Agent 框架对比」的研究报告。

```bash
openfang hand activate researcher
openfang chat researcher
```

```
you> 研究主题：2026 年主流 AI Agent 框架（OpenFang、CrewAI、LangGraph、AutoGen）的功能对比、
     安全模型、部署成本和适用场景。输出中文 Markdown 报告，含 APA 引用。

agent> [Researcher 启动多阶段流程]
       Phase 1: 定义研究范围与关键词...
       Phase 2: 多源检索与交叉引用...
       Phase 3: CRAAP 可信度评估...
       Phase 4: 生成带引用的结构化报告...
```

Researcher 会自动：

- 从多个来源检索并交叉验证
- 用 CRAAP 标准（Currency、Relevance、Authority、Accuracy、Purpose）评估来源可信度
- 生成带 APA 格式引用的 Markdown 报告
- 结果持久化到 Dashboard，可随时下载

### 4.5 实战案例三：B2B 销售线索自动化（Lead）

**场景**：你是 B2B 销售，希望每天自动发现符合 ICP（Ideal Customer Profile）的潜在客户。

```bash
openfang hand activate lead
```

在 Dashboard 配置 ICP 参数（行业、公司规模、技术栈等）后，Lead Hand 每日自动：

1. 按 ICP 搜索潜在客户
2. Web 调研丰富联系人信息
3. 0-100 评分并去重
4. 导出 CSV/JSON/Markdown 到 Dashboard
5. 可选：推送到 Telegram 或 Email

```bash
openfang hand status lead    # 查看今日发现数、平均分、导出路径
openfang hand pause lead     # 周末暂停
openfang hand resume lead    # 周一恢复
```

---

## 第五章：渠道接入 —— 一个 Agent，全平台触达

OpenFang 内置 **40 个渠道适配器**，覆盖即时通讯、企业协作、社交媒体、隐私协议和 Webhook。

### 5.1 渠道分类

| 类别 | 平台 |
|------|------|
| **核心** | Telegram、Discord、Slack、WhatsApp、Signal、Matrix、Email |
| **企业** | Teams、Mattermost、Google Chat、Webex、飞书/Lark、Rocket.Chat |
| **社交** | LINE、Viber、Messenger、Mastodon、Bluesky、Reddit、LinkedIn |
| **社区** | IRC、XMPP、Guilded、Revolt、Keybase、Discourse |
| **隐私** | Threema、Nostr、Mumble |
| **工作区** | 钉钉、Zalo、Twist、Pumble |
| **通知** | ntfy、Gotify |
| **集成** | 通用 Webhook（HMAC-SHA256 签名） |

### 5.2 通用配置模式

所有渠道配置位于 `~/.openfang/config.toml` 的 `[channels.*]` 段。**密钥通过环境变量引用，不写入配置文件。**

```toml
[channels.telegram]
bot_token_env = "TELEGRAM_BOT_TOKEN"
default_agent = "assistant"
allowed_users = ["123456789"]    # 空 = 允许所有人（生产环境务必限制）

[channels.discord]
bot_token_env = "DISCORD_BOT_TOKEN"
default_agent = "coder"

[channels.slack]
bot_token_env = "SLACK_BOT_TOKEN"
app_token_env = "SLACK_APP_TOKEN"
default_agent = "ops"
```

### 5.3 实战：Telegram Bot 接入

**第一步：创建 Bot**

1. 在 Telegram 搜索 `@BotFather`
2. 发送 `/newbot`，按提示命名
3. 复制 Bot Token

**第二步：配置环境变量**

```bash
export TELEGRAM_BOT_TOKEN="123456:ABC-DEF..."
```

**第三步：编辑 config.toml**（见上方示例）

**第四步：重启并验证**

```bash
openfang start
openfang channel list          # 查看渠道状态
openfang channel setup telegram  # 交互式配置向导（可选）
```

在 Telegram 中向 Bot 发消息，消息会路由到 `default_agent` 指定的 Agent，回复带跨会话记忆。

### 5.4 实战：WhatsApp Web（QR 码，无需 Meta Business 账号）

**前置条件**：Node.js 18+

```bash
# 1. 安装 Gateway 依赖
cd packages/whatsapp-gateway
npm install

# 2. 配置 config.toml
# [channels.whatsapp]
# mode = "web"
# default_agent = "assistant"

# 3. 设置 Gateway URL
export WHATSAPP_WEB_GATEWAY_URL="http://127.0.0.1:3009"

# 4. 启动 Gateway
node packages/whatsapp-gateway/index.js

# 5. 启动 OpenFang
openfang start
```

Dashboard → **Channels** → **WhatsApp** → 扫码绑定（WhatsApp → 设置 → 关联设备）。

### 5.5 渠道高级特性

每个适配器共享：

- **Per-channel 模型覆盖**：Telegram 用 Groq，Slack 用 Claude
- **DM/群组策略**：限制谁可以触发 Agent
- **速率限制**：GCRA 令牌桶，防滥用
- **输出格式化**：Markdown / TelegramHTML / SlackMrkdwn / PlainText 自动转换
- **Canonical Session**：同一用户跨 Telegram 和 WebChat 共享会话上下文

---

## 第六章：技能系统与 MCP 扩展

### 6.1 内置技能（60 个）

OpenFang 预装 60 个 `SKILL.md` 技能，覆盖 GitHub、Docker、Kubernetes、安全审计、Prompt Engineering 等。Agent 在运行时自动加载匹配的技能注入上下文。

```bash
openfang skill list                    # 查看已安装技能
openfang skill search "kubernetes"     # 搜索 FangHub 市场
openfang skill install <source>        # 安装新技能
openfang skill create                  # 脚手架创建自定义技能
```

技能格式兼容 **ClawHub 市场**，从 OpenClaw 迁移的技能可直接使用。

### 6.2 MCP（Model Context Protocol）

OpenFang 同时作为 **MCP Client 和 MCP Server**，可连接外部工具，也可把 OpenFang 工具暴露给其他 Agent。

**配置外部 MCP Server：**

```toml
[[mcp_servers]]
name = "filesystem"
timeout_secs = 30
[mcp_servers.transport]
type = "stdio"
command = "npx"
args = ["-y", "@modelcontextprotocol/server-filesystem", "/tmp"]

[[mcp_servers]]
name = "remote-tools"
timeout_secs = 60
[mcp_servers.transport]
type = "sse"
url = "https://mcp.example.com/events"
```

**把 OpenFang 作为 MCP Server 供其他工具调用：**

```bash
openfang mcp    # 以 stdio 模式启动 MCP Server
```

### 6.3 A2A 协议（Agent-to-Agent）

```toml
[a2a]
enabled = true
listen_path = "/a2a"

[[a2a.external_agents]]
name = "research-agent"
url = "https://agent.example.com/.well-known/agent.json"
```

启用后，OpenFang Agent 可与其他符合 Google A2A 协议的 Agent 协作执行任务。

---

## 第七章：工作流编排

当单个 Agent 不够用时，**Workflow Engine** 把多个 Agent 串联成可复现的多步流水线。

### 7.1 适用场景

- **顺序流水线**：研究 → 写作 → 审校
- **Fan-out 并行**：同时让 3 个 Agent 从不同角度分析同一问题
- **条件分支**：上一步输出含 "ERROR" 则走修复 Agent，否则走发布 Agent
- **循环迭代**：反复润色直到输出包含 "APPROVED"

### 7.2 工作流定义示例

通过 REST API 注册 JSON 工作流：

```json
{
  "name": "content-pipeline",
  "description": "研究 → 写作 → 审校",
  "steps": [
    {
      "name": "research",
      "agent_name": "researcher",
      "prompt": "深入研究以下主题，输出结构化要点：{{input}}",
      "mode": "sequential",
      "output_var": "research_notes",
      "timeout_secs": 180
    },
    {
      "name": "write",
      "agent_name": "writer",
      "prompt": "基于以下研究笔记撰写 1500 字文章：\n{{research_notes}}",
      "mode": "sequential",
      "output_var": "draft"
    },
    {
      "name": "review",
      "agent_name": "analyst",
      "prompt": "审校以下文章，指出事实错误、逻辑漏洞和改进建议：\n{{draft}}",
      "mode": "sequential"
    }
  ]
}
```

**CLI 操作：**

```bash
openfang workflow list
openfang workflow create pipeline.json
openfang workflow run <workflow-id> "2026 年 AI Agent 趋势"
```

### 7.3 实战案例：多 Agent 内容生产流水线

```mermaid
flowchart LR
    INPUT["用户输入主题"] --> R["researcher<br/>sequential"]
    R --> W["writer<br/>sequential"]
    W --> REV["analyst<br/>sequential"]
    REV --> OUT["最终审校稿"]

    R -.->|"fan_out 可选"| P1["coder<br/>生成代码示例"]
    R -.->|"fan_out 可选"| P2["analyst<br/>数据验证"]
    P1 & P2 --> COL["collect<br/>合并结果"]
    COL --> W
```

Fan-out 步骤并行执行，Collect 步骤合并所有并行输出，再传给下一步。

---

## 第八章：API 集成与 OpenAI 兼容层

OpenFang 提供 **140+ REST/WS/SSE 端点**，可作为现有工具的后端直接替换。

### 8.1 OpenAI 兼容 Chat Completions

```bash
curl -X POST http://127.0.0.1:4200/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "researcher",
    "messages": [{"role": "user", "content": "分析 Q4 市场趋势"}],
    "stream": true
  }'
```

任何支持 OpenAI API 的客户端（Continue、Cursor、LangChain 等）只需把 `base_url` 改为 `http://127.0.0.1:4200/v1` 即可接入 OpenFang Agent。

### 8.2 启用 API 认证（生产必做）

```toml
# config.toml
api_key = "your-strong-bearer-token"   # 启用 Bearer 认证
api_listen = "127.0.0.1:4200"          # 仅本机；暴露到 LAN 改为 0.0.0.0:4200
```

```bash
curl -H "Authorization: Bearer your-strong-bearer-token" \
  http://127.0.0.1:4200/api/agents
```

### 8.3 常用 API 端点

| 类别 | 端点 | 说明 |
|------|------|------|
| Agent | `POST /api/agents/spawn` | 生成 Agent |
| Agent | `GET /api/agents` | 列出 Agent |
| Chat | `POST /v1/chat/completions` | OpenAI 兼容对话 |
| Memory | `GET /api/memory/sessions` | 会话列表 |
| Workflow | `POST /api/workflows` | 创建工作流 |
| Hands | `POST /api/hands/{name}/activate` | 激活 Hand |
| Channels | `GET /api/channels/status` | 渠道状态 |

完整参考见 [API Reference](https://github.com/RightNow-AI/openfang/blob/main/docs/api-reference.md)。

---

## 第九章：安全架构 —— 16 层纵深防御

OpenFang 的安全不是事后补丁，而是 **16 个独立可测试的子系统**：

| # | 系统 | 作用 |
|---|------|------|
| 1 | WASM 双计量沙箱 | Fuel + Epoch 中断，Watchdog 杀死失控代码 |
| 2 | Merkle 审计链 | 每条操作密码学链接，篡改即破坏整条链 |
| 3 | 信息流污点追踪 | Secret 从源到汇全程标记 |
| 4 | Ed25519 签名 Manifest | Agent 身份与能力集加密签名 |
| 5 | SSRF 防护 | 阻断私网 IP、云元数据端点、DNS Rebinding |
| 6 | Secret 零化 | `Zeroizing<String>` 用完即擦除内存 |
| 7 | OFP 双向认证 | HMAC-SHA256 常量时间验证 |
| 8 | 能力门控 | RBAC，Agent 声明工具，内核强制 |
| 9 | 安全响应头 | CSP、HSTS、X-Frame-Options |
| 10 | Health 端点脱敏 | 公开健康检查返回最小信息 |
| 11 | 子进程沙箱 | `env_clear()` + 超时 + 跨平台 kill |
| 12 | Prompt 注入扫描 | 检测覆盖指令、数据外泄模式 |
| 13 | 循环守卫 | SHA256 工具调用循环检测 + 熔断 |
| 14 | 会话修复 | 7 阶段消息历史校验与自动恢复 |
| 15 | 路径遍历防护 | 规范化 + 符号链接逃逸阻止 |
| 16 | GCRA 速率限制 | 成本感知令牌桶 + 按 IP 追踪 |

**生产环境安全清单：**

- [ ] 设置 `api_key`，禁用未认证访问
- [ ] 渠道 `allowed_users` 白名单，禁止开放 DM
- [ ] Browser Hand 保持购买审批门开启
- [ ] 定期查看 Dashboard 审计日志
- [ ] 敏感 Key 只通过环境变量注入，不进 config.toml
- [ ] 暴露到公网时使用反向代理 + TLS

---

## 第十章：从 OpenClaw 迁移

如果你已经在用 OpenClaw，OpenFang 提供一键迁移：

```bash
# 预览迁移（不修改文件）
openfang migrate --from openclaw --dry-run

# 执行迁移
openfang migrate --from openclaw

# 指定 OpenClaw 路径
openfang migrate --from openclaw --path ~/.openclaw
```

迁移引擎会导入：Agent 配置、对话历史、Skills、渠道设置。OpenFang 原生支持 `SKILL.md` 格式和 ClawHub 市场。

---

## 第十一章：生产部署与运维

### 11.1 Docker Compose 生产模板

```yaml
# docker-compose.yml
services:
  openfang:
    image: ghcr.io/RightNow-AI/openfang:latest
    ports:
      - "4200:4200"
    environment:
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - OPENFANG_HOME=/data
    volumes:
      - openfang-data:/data
    restart: unless-stopped

volumes:
  openfang-data:
```

### 11.2 内存与上下文管理

```toml
[memory]
decay_rate = 0.05                    # 记忆置信度衰减率
embedding_model = "all-MiniLM-L6-v2"
consolidation_threshold = 10000

# 会话压缩（LLM 上下文管理）
[compaction]
threshold = 80        # 消息数超过此值触发压缩
keep_recent = 20      # 压缩后保留最近 N 条
max_summary_tokens = 1024
```

OpenFang 会在会话过长时自动 LLM 压缩历史，避免超出模型上下文窗口。

### 11.3 稳定性注意事项

- 当前 **pre-1.0**，小版本可能有 breaking changes
- **Researcher** 和 **Browser** Hands 最为成熟，其他 Hands 仍在快速迭代
- 生产环境 **pin 到特定 commit**，等 v1.0（预计 2026 年中）再跟踪 latest
- 遇到问题：`openfang doctor` → [GitHub Issues](https://github.com/RightNow-AI/openfang/issues)

### 11.4 桌面端与系统集成

Desktop 版（Tauri 2.0）提供：

- 系统托盘常驻
- OS 级通知（Hands 完成时推送）
- 登录自动启动
- 全局快捷键
- 单实例 enforcement

---

## 第十二章：综合实战 —— 搭建个人 AI 运营中心

把前面所有能力组合，搭建一个「7×24 个人 AI 运营中心」：

```mermaid
flowchart TB
    subgraph SCHEDULE["定时 Hands"]
        LEAD["Lead Hand<br/>每日 06:00 线索挖掘"]
        COLL["Collector Hand<br/>持续竞品监控"]
        TW["Twitter Hand<br/>排期内容发布"]
    end

    subgraph ON_DEMAND["按需 Agent"]
        RES["researcher<br/>深度研究"]
        COD["coder<br/>代码任务"]
        OPS["ops<br/>运维脚本"]
    end

    subgraph CHANNELS["触达渠道"]
        TG["Telegram<br/>告警 + 对话"]
        WEB["Web Dashboard<br/>管理 + 审阅"]
        API["OpenAI API<br/>第三方工具"]
    end

    LEAD & COLL --> TG
    TW --> TG
    RES & COD & OPS --> WEB
    RES & COD & OPS --> API
    TG --> RES
```

**实施步骤：**

```bash
# 1. 安装并配置
curl -fsSL https://openfang.sh/install | sh
openfang init
# 编辑 config.toml，配置 default_model + telegram 渠道

# 2. 设置环境变量
export ANTHROPIC_API_KEY=sk-ant-...
export TELEGRAM_BOT_TOKEN=123456:ABC-...
export TAVILY_API_KEY=tvly-...     # Web 搜索

# 3. 启动
openfang start

# 4. 激活自主 Hands
openfang hand activate lead
openfang hand activate collector
openfang hand activate twitter      # 记得在 Dashboard 配置审批队列

# 5. 按需 Agent
openfang agent spawn agents/researcher/agent.toml
openfang agent spawn agents/coder/agent.toml

# 6. 创建内容流水线工作流（可选）
openfang workflow create content-pipeline.json

# 7. 验证
openfang doctor
openfang hand status lead
openfang channel list
```

**日常运维：**

| 时间 | 动作 | 命令/位置 |
|------|------|---------|
| 每日 06:00 | Lead 自动运行 | `openfang hand status lead` |
| 实时 | Collector 告警 | Telegram Bot 推送 |
| 工作日 | Twitter 内容审批 | Dashboard → Hands → Twitter → Approval Queue |
| 按需 | 深度研究 | `openfang chat researcher` |
| 每周 | 检查审计日志 | Dashboard → Security → Audit Trail |

---

## 附录 A：常用命令速查

```bash
# 生命周期
openfang init / start / status / doctor

# Agent
openfang agent spawn <manifest.toml>
openfang agent list / chat <id> / kill <id>
openfang chat [agent-name]

# Hands
openfang hand list / activate / deactivate / status / pause / resume

# 渠道
openfang channel list / setup <channel>

# 工作流
openfang workflow list / create / run

# 技能
openfang skill list / search / install / create

# 配置
openfang config show / edit

# 迁移 & MCP
openfang migrate --from openclaw
openfang mcp
```

---

## 附录 B：OpenFang vs 主流框架

| 特性 | OpenFang | OpenClaw | CrewAI | LangGraph |
|------|----------|----------|--------|-----------|
| 语言 | **Rust** | TypeScript | Python | Python |
| 自主 Hands | **7 内置** | 无 | 无 | 无 |
| 安全层 | **16** | 3 | 1 | 2 |
| 渠道适配 | **40** | 13 | 0 | 0 |
| 安装体积 | **~32 MB** | ~500 MB | ~100 MB | ~150 MB |
| 冷启动 | **~180 ms** | ~6 s | ~3 s | ~2.5 s |
| 桌面 App | **Tauri 2.0** | 无 | 无 | 无 |
| 审计链 | **Merkle** | Logs | Tracing | Checkpoints |
| License | MIT | MIT | MIT | MIT |

---

## 附录 C：学习资源

| 资源 | 链接 |
|------|------|
| 官方网站 | [openfang.sh](https://www.openfang.sh/) |
| GitHub 仓库 | [RightNow-AI/openfang](https://github.com/RightNow-AI/openfang) |
| DeepWiki 架构文档 | [deepwiki.com/RightNow-AI/openfang](https://deepwiki.com/RightNow-AI/openfang) |
| Getting Started | [docs/getting-started.md](https://github.com/RightNow-AI/openfang/blob/main/docs/getting-started.md) |
| 配置参考 | [docs/configuration.md](https://github.com/RightNow-AI/openfang/blob/main/docs/configuration.md) |
| 渠道适配器 | [docs/channel-adapters.md](https://github.com/RightNow-AI/openfang/blob/main/docs/channel-adapters.md) |
| 工作流引擎 | [docs/workflows.md](https://github.com/RightNow-AI/openfang/blob/main/docs/workflows.md) |
| Discord 社区 | [discord.gg/openfang](https://discord.gg/openfang) |

---

> OpenFang 把「Agent 框架」和「Agent 操作系统」的分界线划得很清楚：**框架**帮你调用 LLM 和工具；**操作系统**帮你管理 Agent 的完整生命周期——生成、调度、记忆、安全、渠道、审计——让它们真正 7×24 为你工作。如果你已经在用 OpenClaw 或自建 Python Agent，值得花 10 分钟跑一遍 `openfang init && openfang start`，亲身体验 Hands 的自主运行与 16 层安全体系的区别。
