---
title: "Hermes Agent 完全使用指南：从入门配置到实战进阶"
date: 2026-04-08 14:00:00 +0800
categories:
  - AI工具
tags:
  - AI
  - Hermes Agent
toc: true
mermaid: true
---

> **Hermes Agent** 是 Nous Research 开源的自进化 AI Agent 框架（MIT 协议），目前已在 GitHub 获得 **75.5k Stars**。与普通 AI 助手不同，Hermes 具备真正的记忆系统、自动创建技能、多平台接入能力，以及可运行于服务器的持久化架构。本文从零开始，带你完成安装配置，并通过实战案例逐步掌握进阶用法。

---

## 核心架构概览

Hermes Agent 采用三层架构设计，将用户界面、核心 Agent 逻辑与执行环境解耦：

```mermaid
graph TD
    A[用户界面层] --> B[核心 Agent 层]
    A1[CLI 终端] --> A
    A2[Telegram / Discord / Slack] --> A
    A3[WhatsApp / Signal / Email] --> A
    A4[VS Code / Zed ACP] --> A

    B --> C[执行环境层]
    B1[AIAgent 对话循环] --> B
    B2[工具注册表 model_tools.py] --> B
    B3[记忆系统 MEMORY.md / USER.md] --> B
    B4[技能系统 ~/.hermes/skills/] --> B

    C --> D[本地 Local]
    C --> E[Docker 容器]
    C --> F[SSH 远程]
    C --> G[Modal 无服务器]
    C --> H[Daytona 云端]
```

**四种运行模式对比：**

| 模式 | 入口 | 适用场景 | 会话持久化 |
|------|------|---------|-----------|
| **CLI** | `hermes` | 本地交互终端 | `~/.hermes/sessions/` |
| **Gateway** | `hermes gateway` | Telegram/Discord 等多平台 | `~/.hermes/sessions/` |
| **ACP** | `hermes acp` | VS Code / Zed 编辑器集成 | 客户端管理 |
| **Batch** | `batch_runner.py` | RL 训练数据生成 | JSONL 文件 |

---

## 第一章：安装与初始配置

### 1.1 系统要求

- **Linux / macOS / WSL2 / Android (Termux)**：原生支持
- **Windows**：需先安装 [WSL2](https://learn.microsoft.com/zh-cn/windows/wsl/install)，然后在 WSL2 中运行
- **模型上下文**：至少 64,000 tokens（Claude、GPT-4、Gemini、Qwen 等主流模型均满足）

### 1.2 一键安装

```bash
curl -fsSL https://raw.githubusercontent.com/NousResearch/hermes-agent/main/scripts/install.sh | bash
```

安装完成后重新加载 shell：

```bash
source ~/.bashrc   # 或 source ~/.zshrc（如果使用 zsh）
```

### 1.3 配置 LLM 提供商

```bash
hermes model   # 交互式选择模型和提供商
```

Hermes 支持几乎所有主流提供商，无需修改代码即可切换：

| 提供商 | 特点 | 配置方式 |
|--------|------|---------|
| **Nous Portal** | 零配置订阅 | OAuth 登录 |
| **OpenRouter** | 200+ 模型统一路由 | 设置 API Key |
| **Anthropic (Claude)** | Claude 3.5/3.7 直连 | API Key 或 Claude Pro OAuth |
| **GitHub Copilot** | 订阅用户免费使用 | `hermes model` OAuth |
| **DeepSeek** | 国内高性价比模型 | 设置 `DEEPSEEK_API_KEY` |
| **阿里云 (Qwen)** | 通义千问系列 | 设置 `DASHSCOPE_API_KEY` |
| **Kimi/Moonshot** | 月之暗面 | 设置 `KIMI_API_KEY` |
| **自定义端点** | Ollama/VLLM/SGLang | 设置 base URL + API Key |

> **提示**：如果使用本地模型（如 Ollama），请确保上下文窗口至少设置为 64K，例如 `ollama run qwen2.5-coder:32b --ctx-size 65536`

### 1.4 全量配置向导

首次使用推荐运行完整配置向导，一次性完成所有设置：

```bash
hermes setup
```

向导会引导你配置：提供商、工具集、消息平台（可选）、安全策略等。

### 1.5 验证安装

```bash
hermes doctor   # 诊断配置问题
hermes          # 启动！
```

成功启动后，你会看到包含模型名称、可用工具列表和技能数量的欢迎界面。

---

## 第二章：CLI 核心操作

### 2.1 基础对话

```bash
hermes   # 启动交互式对话
```

**常用键盘快捷键：**

| 快捷键 | 功能 |
|--------|------|
| `Alt+Enter` 或 `Ctrl+J` | 多行输入（粘贴代码时非常有用） |
| `Ctrl+C` | 中断当前正在执行的任务 |
| `↑ / ↓` | 浏览历史消息 |

**中途打断 Agent**：当 Agent 执行时间过长，直接输入新消息并回车即可中断并切换到新指令。

### 2.2 斜杠命令速查

在对话中输入 `/` 会显示自动补全菜单：

| 命令 | 功能 |
|------|------|
| `/help` | 显示所有可用命令 |
| `/new` 或 `/reset` | 开启新对话 |
| `/model` | 切换模型 |
| `/tools` | 查看可用工具 |
| `/skills` | 浏览已安装技能 |
| `/save` | 保存当前对话 |
| `/compress` | 压缩上下文（节省 token） |
| `/usage` | 查看本次会话 token 用量 |
| `/insights` | 查看用量分析和趋势 |
| `/retry` | 重试上一条消息 |
| `/undo` | 撤销上一轮对话 |
| `/personality [名称]` | 切换 Agent 人格 |
| `/voice on` | 开启语音模式 |

### 2.3 恢复历史会话

```bash
hermes --continue   # 恢复最近一次会话
hermes -c           # 简写形式
```

### 2.4 直接执行单次任务

```bash
hermes chat -q "统计当前目录下所有 Python 文件的代码行数"
hermes chat --toolsets terminal -q "检查 Docker 容器状态"
```

---

## 第三章：核心配置详解

### 3.1 配置文件结构

所有配置和用户数据存储在 `~/.hermes/` 目录：

```
~/.hermes/
├── config.yaml        # 主配置文件
├── .env               # API 密钥和密钥
├── SOUL.md            # Agent 人格/身份定义
├── MEMORY.md          # 持久化记忆（Agent 自动维护）
├── USER.md            # 用户画像（Agent 自动维护）
├── sessions/          # 历史对话存储
├── skills/            # 技能目录
│   ├── devops/
│   ├── mlops/
│   └── .hub/          # Skills Hub 状态
└── logs/              # 日志文件
```

### 3.2 config.yaml 关键配置项

```yaml
# 模型配置
model: "anthropic:claude-sonnet-4-5"   # provider:model 格式
context_window: 200000

# 终端后端（执行环境）
terminal:
  backend: local        # local | docker | ssh | modal | daytona | singularity
  env_passthrough:      # 传递给终端的环境变量
    - MY_API_KEY
    - GITHUB_TOKEN

# 工具集配置
toolsets:
  - terminal            # 终端执行
  - web                 # 网络搜索和爬取
  - files               # 文件操作
  - code                # 代码执行
  - vision              # 图像理解

# 显示配置
display:
  tool_progress: all    # off | new | all | verbose
  streaming: true

# MCP 服务器（扩展工具）
mcp_servers:
  github:
    command: npx
    args: ["-y", "@modelcontextprotocol/server-github"]
    env:
      GITHUB_PERSONAL_ACCESS_TOKEN: "ghp_xxx"

# 技能外部目录
skills:
  external_dirs:
    - ~/.agents/skills
    - ~/team-skills
```

### 3.3 使用 Docker 沙箱（推荐）

生产环境或涉及系统操作时，强烈建议启用 Docker 隔离：

```bash
hermes config set terminal.backend docker
```

这样 Agent 执行的所有终端命令都在容器内运行，不会影响宿主机。

### 3.4 SSH 远程执行

让 Agent 在远程服务器上执行命令：

```bash
hermes config set terminal.backend ssh
hermes config set terminal.ssh_host "your-server.com"
hermes config set terminal.ssh_user "ubuntu"
```

---

## 第四章：记忆系统与技能系统

### 4.1 记忆系统工作原理

Hermes 的记忆系统是其区别于普通 AI 的核心特性之一：

```mermaid
graph LR
    A[对话输入] --> B[AIAgent 处理]
    B --> C{是否有重要信息?}
    C -->|是| D[写入 MEMORY.md]
    C -->|是| E[更新 USER.md 用户画像]
    D --> F[跨会话持久化记忆]
    E --> F
    F --> G[下次对话时自动加载]
```

- **MEMORY.md**：存储项目、技术偏好、常用命令等事实性知识
- **USER.md**：存储 Agent 对你的个性化建模（工作习惯、沟通风格等）
- **SOUL.md**：定义 Agent 的人格和行为准则（可手动编辑自定义）

Agent 会在合适的时机自动更新这些文件，你也可以直接编辑：

```bash
nano ~/.hermes/MEMORY.md   # 手动添加重要记忆
nano ~/.hermes/SOUL.md     # 自定义 Agent 人格
```

### 4.2 技能系统

技能（Skills）是 Hermes 的「程序化记忆」——当 Agent 解决了一个复杂问题后，会将方法论保存为技能，下次直接复用。

**技能自动创建时机：**
- 完成 5 步以上的复杂任务后
- 遭遇错误后找到可行方案时
- 用户纠正了 Agent 的做法后
- 发现非显而易见的工作流时

**手动管理技能：**

```bash
# 搜索和安装技能
hermes skills search kubernetes
hermes skills search react --source skills-sh
hermes skills search https://mintlify.com/docs --source well-known

# 浏览和安装
hermes skills browse
hermes skills inspect openai/skills/k8s   # 安装前预览
hermes skills install openai/skills/k8s
hermes skills install official/security/1password

# 更新和维护
hermes skills check     # 检查是否有更新
hermes skills update    # 更新所有技能
hermes skills list      # 查看已安装技能
```

**在对话中使用技能：**

```bash
/gif-search 可爱的猫咪
/plan 设计用户认证模块的重构方案
/axolotl 帮我在数据集上微调 Llama 3
```

### 4.3 自定义技能（SKILL.md 格式）

创建 `~/.hermes/skills/my-workflow/SKILL.md`：

```markdown
---
name: deploy-to-prod
description: 将代码安全部署到生产环境的标准流程
version: 1.0.0
platforms: [linux, macos]
metadata:
  hermes:
    tags: [devops, deployment]
    category: devops
    requires_toolsets: [terminal]
---

# 生产部署流程

## 触发条件
用户要求部署到生产环境时使用此技能。

## 执行步骤
1. 运行测试套件确保通过
2. 创建带版本号的 git tag
3. 触发 CI/CD 流水线
4. 监控部署日志
5. 验证健康检查端点

## 注意事项
- 部署前必须确认 staging 环境已验证
- 数据库迁移需要单独审批

## 验证方法
访问 /health 端点，确认返回 200 状态码。
```

---

## 第五章：消息平台接入（Gateway）

### 5.1 支持的平台

Hermes Gateway 支持将 Agent 接入多种消息平台，让你可以随时随地使用：

| 平台 | 语音 | 图片 | 文件 | 流式输出 |
|------|------|------|------|---------|
| Telegram | ✅ | ✅ | ✅ | ✅ |
| Discord | ✅ | ✅ | ✅ | ✅ |
| Slack | ✅ | ✅ | ✅ | ✅ |
| WhatsApp | — | ✅ | ✅ | ✅ |
| Signal | — | ✅ | ✅ | ✅ |
| 飞书/Lark | ✅ | ✅ | ✅ | ✅ |
| 企业微信 | ✅ | ✅ | ✅ | ✅ |
| 微信 | ✅ | ✅ | ✅ | ✅ |
| 钉钉 | — | — | — | ✅ |
| Email | — | ✅ | ✅ | — |

### 5.2 配置 Telegram Bot（最常用）

```bash
# 步骤 1：交互式配置向导
hermes gateway setup

# 步骤 2：启动 Gateway
hermes gateway

# 步骤 3：安装为系统服务（开机自启）
hermes gateway install    # Linux (systemd) 或 macOS (launchd)
hermes gateway start
hermes gateway status
```

**安全配置**——限制允许访问的用户：

```bash
# 在 ~/.hermes/.env 中配置
TELEGRAM_ALLOWED_USERS=123456789,987654321

# 或者使用配对码（无需预先知道用户 ID）
# 新用户发送消息后，Bot 会显示配对码，然后运行：
hermes pairing approve telegram XKGH5N7P
```

### 5.3 Gateway 中的特殊命令

在消息平台中，除了标准斜杠命令外，还有：

```
/sethome      # 将此频道设为主频道（接收 cron 任务通知）
/status       # 查看当前会话状态
/approve      # 批准待执行的危险命令
/deny         # 拒绝待执行的危险命令
/background   # 在后台并行执行任务
/rollback     # 还原文件系统检查点
```

### 5.4 后台并行任务

这是 Gateway 模式的杀手级功能——你可以让 Agent 在后台处理耗时任务：

```
/background 检查集群中所有服务器的健康状态，发现异常立即报告
/background 构建并部署 staging 环境
/background 研究竞品定价策略，整理成对比表格
```

Agent 立即确认接收，完成后自动在同一频道发送结果，完全不阻塞当前对话。

---

## 第六章：实战案例

### 案例一：代码库自动化分析

```
# 在 CLI 中执行
❯ 分析这个 Python 项目的代码质量，找出潜在的安全漏洞和性能问题，
  并生成一份详细报告保存到 reports/code-audit.md
```

Hermes 会自动：
1. 遍历项目文件结构
2. 分析代码模式
3. 运行静态分析工具（如 bandit、pylint）
4. 汇总结果并生成格式化报告

### 案例二：智能定时任务（Cron）

```
❯ 每天早上 9 点，检查 Hacker News 上关于 AI 的热门帖子，
  筛选出超过 100 分的内容，翻译成中文摘要发送到 Telegram
```

Agent 会创建 cron 任务，每天自动执行并将结果推送到你配置的消息平台。

```bash
# 查看已配置的定时任务
hermes cron list

# 手动触发测试
hermes cron run "morning-ai-news"
```

### 案例三：多步骤 DevOps 自动化

```
❯ 帮我完成以下部署流程：
  1. 运行测试，确认全部通过
  2. 构建 Docker 镜像并推送到仓库
  3. 更新 k8s deployment 的镜像版本
  4. 等待 rollout 完成并验证 Pod 状态
  5. 如有异常自动回滚
```

这类多步骤操作正是 Hermes 的强项——它会记住每个步骤的结果，遇到失败会自动调整策略。

### 案例四：MCP 工具集成

配置 GitHub MCP 服务器后，可以进行更强大的代码管理操作：

```yaml
# ~/.hermes/config.yaml
mcp_servers:
  github:
    command: npx
    args: ["-y", "@modelcontextprotocol/server-github"]
    env:
      GITHUB_PERSONAL_ACCESS_TOKEN: "ghp_xxx"
  filesystem:
    command: npx
    args: ["-y", "@modelcontextprotocol/server-filesystem", "/home/user/projects"]
  postgres:
    command: npx
    args: ["-y", "@modelcontextprotocol/server-postgres"]
    env:
      DATABASE_URL: "postgresql://user:pass@localhost/db"
```

之后就可以这样使用：

```
❯ 查看最近 7 天所有 PR 的代码审查评论，
  找出最常被指出的代码问题类型，生成改进建议
```

### 案例五：子 Agent 并行处理

Hermes 支持生成独立的子 Agent 处理并行任务：

```
❯ 同时分析三个竞争对手的官网：competitor-a.com、competitor-b.com、competitor-c.com，
  提取各自的定价策略、核心功能和目标用户，最后整合成对比分析报告
```

Agent 会派生三个子 Agent 并行抓取和分析，最后汇总结果，效率远高于串行处理。

---

## 第七章：语音模式

### 7.1 安装语音依赖

```bash
pip install "hermes-agent[voice]"

# 推荐：安装本地免费语音识别（更快更隐私）
pip install faster-whisper
```

### 7.2 启用语音

```bash
# 在 CLI 中
/voice on

# 快捷键：Ctrl+B 开始录音，再次按下停止并发送
# /voice tts  —— 让 Agent 以语音朗读回复
```

Gateway 模式下，向 Bot 发送语音消息会自动转录并处理，无需额外配置。

---

## 第八章：安全最佳实践

### 8.1 命令审批机制

Hermes 对潜在危险的命令（如 `rm -rf`、`sudo` 操作等）会先展示命令内容请求确认，而不是直接执行。

```bash
# 查看命令允许列表
hermes config show terminal.allowed_commands

# 添加信任的命令模式
hermes config set terminal.allowed_commands "git *,npm *,python *.py"
```

### 8.2 Docker 隔离（强烈推荐）

```bash
hermes config set terminal.backend docker
```

所有命令在 Docker 容器中执行，即使 Agent 产生错误操作也不会影响宿主机。

### 8.3 Gateway 安全配置

```bash
# 方案 A：固定用户 ID 白名单
TELEGRAM_ALLOWED_USERS=your_telegram_id

# 方案 B：配对码授权（推荐，更灵活）
hermes pairing list         # 查看待审批用户
hermes pairing approve telegram XKGH5N7P
hermes pairing revoke telegram 123456789  # 撤销访问

# 切勿在公开的 Bot 上使用：
# GATEWAY_ALLOW_ALL_USERS=true  ← 危险！
```

---

## 第九章：从 OpenClaw 迁移

如果你之前使用 OpenClaw，可以一键迁移所有配置：

```bash
hermes claw migrate              # 交互式迁移（完整预设）
hermes claw migrate --dry-run    # 预览将迁移的内容
hermes claw migrate --preset user-data   # 仅迁移用户数据（不含密钥）
```

迁移内容包括：SOUL.md 人格文件、记忆文件、自建技能、命令白名单、消息平台配置、API 密钥等。

---

## 第十章：开发者进阶

### 10.1 本地开发安装

```bash
git clone https://github.com/NousResearch/hermes-agent.git
cd hermes-agent

# 安装 uv（推荐的 Python 包管理器）
curl -LsSf https://astral.sh/uv/install.sh | sh

# 创建虚拟环境并安装依赖
uv venv venv --python 3.11
source venv/bin/activate
uv pip install -e ".[all,dev]"

# 运行测试
python -m pytest tests/ -q
```

### 10.2 在编辑器中使用（ACP 协议）

```bash
pip install -e '.[acp]'
hermes acp   # 启动 ACP 服务器
```

支持 VS Code、Zed、JetBrains 等 ACP 兼容编辑器，使用方式与 Claude Code、GitHub Copilot 类似。

### 10.3 批量轨迹生成（RL 研究）

```bash
# 用于生成训练数据
python batch_runner.py --config datagen-config-examples/basic.yaml
```

### 10.4 自定义 Agent 身份（SOUL.md）

```markdown
# ~/.hermes/SOUL.md
你是一位专注于后端开发和 DevOps 的技术专家助手。
你的工作风格：
- 优先考虑代码安全性和可维护性
- 对生产操作保持谨慎，危险操作前主动提示风险
- 偏好 Python 和 Go，熟悉 Kubernetes 生态
- 回复简洁直接，不说废话
```

---

## 常用命令速查表

```mermaid
mindmap
  root((Hermes Agent))
    安装与配置
      hermes setup
      hermes model
      hermes tools
      hermes doctor
      hermes update
    日常对话
      hermes
      hermes -c
      hermes chat -q
    消息平台
      hermes gateway setup
      hermes gateway start
      hermes gateway install
      hermes pairing
    技能管理
      hermes skills browse
      hermes skills search
      hermes skills install
      hermes skills update
    定时任务
      hermes cron list
      hermes cron run
    配置管理
      hermes config set
      hermes config show
```

| 场景 | 命令 |
|------|------|
| 首次安装 | `curl -fsSL .../install.sh \| bash` |
| 配置模型 | `hermes model` |
| 全量配置 | `hermes setup` |
| 启动对话 | `hermes` |
| 恢复上次 | `hermes --continue` |
| 诊断问题 | `hermes doctor` |
| 更新版本 | `hermes update` |
| 启动 Gateway | `hermes gateway start` |
| 安装技能 | `hermes skills install <name>` |
| 切换沙箱 | `hermes config set terminal.backend docker` |

---

## 总结

Hermes Agent 的核心价值在于它的**自进化架构**：不仅仅是一个对话工具，更是一个会随着使用不断成长的智能体。

**入门推荐路径：**
1. 安装并配置好提供商 → 体验基础对话和终端操作
2. 接入 Telegram/微信等消息平台 → 随时随地访问
3. 配置 Docker 沙箱 → 安全地执行复杂操作
4. 探索技能系统 → 安装适合你工作场景的技能
5. 自定义 SOUL.md 和记忆文件 → 打造专属 AI 助手

**参考资源：**
- [官方文档](https://hermes-agent.nousresearch.com/docs/getting-started/quickstart)
- [GitHub 仓库](https://github.com/NousResearch/hermes-agent)
- [DeepWiki 架构解析](https://deepwiki.com/nousresearch/hermes-agent)
- [Discord 社区](https://discord.gg/nousresearch)
- [Skills Hub (skills.sh)](https://skills.sh/)
