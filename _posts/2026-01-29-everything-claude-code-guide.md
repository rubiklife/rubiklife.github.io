---
title: "Everything Claude Code：Anthropic黑客松冠军的完整配置指南"
date: 2026-04-08 10:00:00 +0800
categories:
  - AI工具
tags:
  - AI
  - Claude
  - 开发工具
  - MCP
toc: true
toc_label: "目录"
toc_icon: "code"
mermaid: true
excerpt: "来自Anthropic黑客松冠军的完整Claude Code配置集合，包含agents、skills、hooks、commands、rules和MCPs，经过多个生产应用的实战验证。"
---

## 项目简介

**Everything Claude Code** 是由 Anthropic x Forum Ventures 黑客松获胜者（2025年9月）打造的完整 Claude Code 配置集合。该项目包含了构建高效 AI 编程助手所需的所有组件：agents、skills、hooks、commands、rules 和 MCP 服务器配置。

```mermaid
mindmap
  root((Everything<br/>Claude Code))
    核心组件
      Agents<br/>智能体
      Skills<br/>技能
      Commands<br/>命令
      Hooks<br/>钩子
      Rules<br/>规则
    扩展功能
      MCP配置
      插件系统
      测试套件
    生态工具
      Skill Creator
      Continuous Learning v2
      GitHub App
    应用场景
      代码审查
      测试驱动开发
      持续学习
      团队协作
```

### 核心价值

- **🏆 实战验证**：在构建 zenith.chat 等生产应用中充分验证
- **🔧 开箱即用**：提供完整的配置模板和最佳实践
- **🚀 生态系统**：包含技能创建器、持续学习等高级工具
- **🌍 社区驱动**：MIT 许可，鼓励贡献和定制
- **⭐ 33.7k+ Stars**：GitHub 上获得广泛认可

## 架构设计

### 系统架构概览

```mermaid
graph TB
    subgraph "用户界面层"
        UI[Claude Code IDE]
    end
    
    subgraph "配置层"
        PROJ[项目配置<br/>.claude/]
        USER[用户配置<br/>~/.claude/]
        SETTINGS[设置文件<br/>settings.json]
    end
    
    subgraph "核心组件层"
        AGENTS[Agents<br/>智能子代理]
        SKILLS[Skills<br/>工作流定义]
        COMMANDS[Commands<br/>自定义命令]
        HOOKS[Hooks<br/>事件钩子]
        RULES[Rules<br/>全局规则]
    end
    
    subgraph "工具层"
        MCP[MCP Servers<br/>外部工具]
        PLUGINS[Plugins<br/>插件系统]
    end
    
    subgraph "生态系统"
        CREATOR[Skill Creator<br/>技能生成器]
        LEARNING[Continuous Learning<br/>持续学习系统]
    end
    
    UI --> PROJ
    UI --> USER
    UI --> SETTINGS
    
    PROJ --> AGENTS
    PROJ --> SKILLS
    PROJ --> COMMANDS
    PROJ --> HOOKS
    PROJ --> RULES
    
    USER --> AGENTS
    USER --> SKILLS
    USER --> COMMANDS
    USER --> HOOKS
    USER --> RULES
    
    SETTINGS --> MCP
    SETTINGS --> PLUGINS
    SETTINGS --> HOOKS
    
    AGENTS --> MCP
    COMMANDS --> MCP
    SKILLS --> AGENTS
    
    CREATOR --> SKILLS
    LEARNING --> SKILLS
    
    style UI fill:#e3f2fd
    style AGENTS fill:#fff3e0
    style SKILLS fill:#f3e5f5
    style COMMANDS fill:#e8f5e9
    style HOOKS fill:#fce4ec
    style RULES fill:#fff9c4
    style MCP fill:#e0f2f1
    style CREATOR fill:#ffe0b2
    style LEARNING fill:#f1f8e9
```

### 配置优先级

```mermaid
graph LR
    A[项目配置<br/>.claude/] -->|覆盖| B[用户配置<br/>~/.claude/]
    B -->|覆盖| C[全局默认配置]
    
    A1[.claude/CLAUDE.md] -.->|项目级| A
    A2[.claude/rules/] -.->|项目级| A
    A3[.claude/agents/] -.->|项目级| A
    
    B1[~/.claude/CLAUDE.md] -.->|用户级| B
    B2[~/.claude/rules/] -.->|用户级| B
    B3[~/.claude/settings.json] -.->|用户级| B
    
    style A fill:#ffcdd2
    style B fill:#c5e1a5
    style C fill:#b3e5fc
```

## 核心概念详解

### 1. Agents（智能体）

Agents 是处理特定任务的子代理，具有有限的工具范围和明确的职责边界。

```mermaid
graph TB
    subgraph "Agent 生命周期"
        A[定义 Agent] --> B[设置工具范围]
        B --> C[指定模型]
        C --> D[编写系统提示]
        D --> E[任务委派]
        E --> F[执行与监控]
        F --> G[返回结果]
    end
    
    subgraph "Agent 类型"
        R[代码审查者]
        T[测试生成器]
        D2[文档编写者]
        S[安全审计员]
    end
    
    G -.-> R
    G -.-> T
    G -.-> D2
    G -.-> S
    
    style A fill:#e1f5fe
    style E fill:#fff9c4
    style G fill:#c8e6c9
```

**Agent 配置示例：**

```markdown
---
name: code-reviewer
description: 审查代码质量、安全性和可维护性
tools: ["Read", "Grep", "Glob", "Bash"]
model: opus
---

你是一位资深代码审查员，专注于：

## 审查重点

1. **代码质量**
   - 遵循 SOLID 原则
   - 避免重复代码 (DRY)
   - 保持函数简洁（<50行）

2. **安全性**
   - 检查 SQL 注入风险
   - 验证输入验证
   - 识别敏感数据泄露

3. **性能**
   - 识别 N+1 查询
   - 检查内存泄漏
   - 优化算法复杂度

4. **可维护性**
   - 检查命名规范
   - 确保充分注释
   - 验证错误处理

## 审查流程

1. 阅读变更的代码
2. 识别潜在问题
3. 提供具体建议
4. 评估严重程度（Critical/High/Medium/Low）
```

### 2. Skills（技能）

Skills 是可重用的工作流定义，描述了完成特定任务的步骤和最佳实践。

```mermaid
graph LR
    subgraph "Skill 组成"
        A[目标定义] --> B[前置条件]
        B --> C[步骤序列]
        C --> D[验证标准]
        D --> E[输出产物]
    end
    
    subgraph "Skill 类型"
        TDD[TDD工作流]
        REVIEW[代码审查流程]
        DEBUG[调试策略]
        REFACTOR[重构方法]
    end
    
    E -.-> TDD
    E -.-> REVIEW
    E -.-> DEBUG
    E -.-> REFACTOR
    
    style C fill:#fff9c4
    style D fill:#c8e6c9
```

**TDD Skill 示例：**

```markdown
# 测试驱动开发（TDD）工作流

## 目标
通过先写测试的方式确保代码质量和设计

## 工作流程

### 🔴 RED - 编写失败的测试
1. 定义接口和类型
2. 编写测试用例（预期失败）
3. 运行测试验证失败

### 🟢 GREEN - 实现最小代码
1. 编写最简单的实现
2. 确保测试通过
3. 不关注优化

### 🔵 REFACTOR - 优化改进
1. 重构代码结构
2. 提升可读性
3. 保持测试通过
4. 添加边界测试

## 验证标准
- ✅ 测试覆盖率 ≥ 80%
- ✅ 所有测试通过
- ✅ 代码符合规范
- ✅ 无警告或 linter 错误

## 最佳实践
- 一次只关注一个功能
- 测试先于实现
- 小步迭代
- 频繁提交
```

### 3. Hooks（钩子）

Hooks 在特定工具事件触发时自动执行，用于实现自动化检查和工作流增强。

```mermaid
graph TB
    subgraph "Hook 触发流程"
        E[工具事件] --> M{匹配器}
        M -->|匹配成功| H[执行 Hook]
        M -->|不匹配| S[跳过]
        H --> T{Hook 类型}
        T -->|Command| C[运行命令]
        T -->|Agent| A[调用 Agent]
        T -->|Prompt| P[发送提示]
    end
    
    subgraph "常见事件"
        EDIT[Edit 事件]
        READ[Read 事件]
        RUN[Run 事件]
    end
    
    E -.-> EDIT
    E -.-> READ
    E -.-> RUN
    
    style M fill:#fff9c4
    style H fill:#c8e6c9
```

**Hook 配置示例：**

```json
{
  "matcher": "tool == \"Edit\" && tool_input.file_path matches \"\\.(ts|tsx|js|jsx)$\"",
  "hooks": [
    {
      "type": "command",
      "command": "#!/bin/bash\nif grep -n 'console\\.log' \"$file_path\"; then\n  echo '[Hook] 警告：检测到 console.log，请在生产前移除' >&2\n  exit 1\nfi"
    },
    {
      "type": "agent",
      "agent": "code-reviewer",
      "prompt": "审查此文件的代码质量"
    }
  ]
}
```

**Hook 类型对比：**

```mermaid
graph LR
    subgraph "Hook 类型"
        direction TB
        C[Command Hook<br/>执行命令]
        A[Agent Hook<br/>调用 Agent]
        P[Prompt Hook<br/>发送提示]
    end
    
    subgraph "使用场景"
        C1[Linting 检查]
        C2[格式化代码]
        A1[代码审查]
        A2[生成测试]
        P1[提醒规范]
        P2[上下文注入]
    end
    
    C -.-> C1
    C -.-> C2
    A -.-> A1
    A -.-> A2
    P -.-> P1
    P -.-> P2
    
    style C fill:#e1f5fe
    style A fill:#f3e5f5
    style P fill:#fff9c4
```

### 4. Commands（命令）

Commands 是用户可调用的自定义命令，通过 `/command-name` 语法触发。

```mermaid
graph TB
    A[用户输入命令] --> B[解析命令名]
    B --> C{查找命令}
    C -->|找到| D[读取命令定义]
    C -->|未找到| E[显示错误]
    D --> F[执行命令逻辑]
    F --> G{需要参数?}
    G -->|是| H[提示输入]
    G -->|否| I[直接执行]
    H --> I
    I --> J[返回结果]
    
    style C fill:#fff9c4
    style F fill:#c8e6c9
```

**Command 示例：**

```markdown
---
name: skill-create
description: 从 Git 历史分析生成技能文件
---

# 技能创建命令

从代码仓库的 Git 提交历史中分析模式，自动生成 SKILL.md 文件。

## 用法

/skill-create                    # 分析当前仓库
/skill-create --instincts        # 同时生成 instincts

## 流程

1. 分析 Git 提交历史
2. 识别代码模式和最佳实践
3. 提取常见工作流
4. 生成结构化的 SKILL.md
5. （可选）生成 instinct 集合

## 输出

- `SKILL.md` - 工作流定义
- `instincts/*.json` - 学习到的模式（使用 --instincts）
```

### 5. Rules（规则）

Rules 是始终遵循的全局准则，保持模块化以便灵活组合。

```mermaid
mindmap
  root((Rules<br/>规则体系))
    安全规则
      无硬编码密钥
      SQL注入防护
      XSS防护
      CSRF保护
    编码规范
      命名约定
      文件大小限制
      函数长度限制
      注释要求
    测试规则
      TDD流程
      覆盖率要求
      测试命名
      Mock使用
    Git规范
      提交信息格式
      分支策略
      代码审查
      PR模板
```

**规则示例：**

```markdown
# 安全规则

## 禁止硬编码敏感信息

❌ **错误示例：**
```python
API_KEY = "sk-1234567890abcdef"
DATABASE_URL = "postgresql://user:pass@localhost/db"
```

✅ **正确示例：**
```python
import os
API_KEY = os.environ.get("API_KEY")
DATABASE_URL = os.environ.get("DATABASE_URL")
```

## SQL 注入防护

❌ **错误示例：**
```python
query = f"SELECT * FROM users WHERE name = '{user_input}'"
```

✅ **正确示例：**
```python
query = "SELECT * FROM users WHERE name = %s"
cursor.execute(query, (user_input,))
```

## XSS 防护

- 始终转义用户输入
- 使用内容安全策略（CSP）
- 验证和清理所有外部数据
```

### 6. MCP Servers（模型上下文协议服务器）

MCP Servers 为 Claude Code 提供外部工具和 API 集成能力。

```mermaid
graph TB
    subgraph "MCP 生态系统"
        CLAUDE[Claude Code] --> MCP_CORE[MCP 核心]
        
        MCP_CORE --> FS[Filesystem<br/>文件系统]
        MCP_CORE --> GITHUB[GitHub<br/>代码托管]
        MCP_CORE --> FIRECRAWL[Firecrawl<br/>网页抓取]
        MCP_CORE --> CONTEXT7[Context7<br/>文档检索]
        MCP_CORE --> MEMORY[Memory<br/>知识图谱]
        MCP_CORE --> THINKING[Sequential Thinking<br/>推理链]
        
        FS --> |读写文件| TOOLS1[工具集]
        GITHUB --> |PR/Issues| TOOLS1
        FIRECRAWL --> |爬取数据| TOOLS1
        CONTEXT7 --> |API文档| TOOLS1
        MEMORY --> |存储知识| TOOLS1
        THINKING --> |复杂推理| TOOLS1
    end
    
    style CLAUDE fill:#e3f2fd
    style MCP_CORE fill:#fff3e0
    style TOOLS1 fill:#c8e6c9
```

**MCP 配置示例：**

```json
{
  "mcpServers": {
    "context7": {
      "command": "npx",
      "args": ["-y", "@upvantage/mcp-context7"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_YOUR_TOKEN_HERE"
      }
    },
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/allowed/directory"]
    },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}
```

## 目录结构

```mermaid
graph TB
    ROOT[everything-claude-code/] --> AGENTS[agents/<br/>智能体定义]
    ROOT --> SKILLS[skills/<br/>工作流技能]
    ROOT --> COMMANDS[commands/<br/>自定义命令]
    ROOT --> HOOKS[hooks/<br/>钩子配置]
    ROOT --> RULES[rules/<br/>全局规则]
    ROOT --> MCP[mcp-configs/<br/>MCP配置]
    ROOT --> PLUGINS[plugins/<br/>插件系统]
    ROOT --> CONTEXTS[contexts/<br/>动态上下文]
    ROOT --> EXAMPLES[examples/<br/>示例配置]
    ROOT --> TESTS[tests/<br/>测试套件]
    ROOT --> SCRIPTS[scripts/<br/>工具脚本]
    
    AGENTS --> A1[code-reviewer.md]
    AGENTS --> A2[test-generator.md]
    AGENTS --> A3[doc-writer.md]
    
    SKILLS --> S1[tdd/]
    SKILLS --> S2[continuous-learning-v2/]
    SKILLS --> S3[debugging/]
    
    COMMANDS --> C1[skill-create.md]
    COMMANDS --> C2[instinct-status.md]
    
    HOOKS --> H1[hooks.json]
    HOOKS --> H2[session-start.js]
    
    RULES --> R1[security.md]
    RULES --> R2[coding-style.md]
    RULES --> R3[testing.md]
    
    MCP --> M1[mcp-servers.json]
    
    style ROOT fill:#e3f2fd
    style AGENTS fill:#fff3e0
    style SKILLS fill:#f3e5f5
    style COMMANDS fill:#e8f5e9
    style HOOKS fill:#fce4ec
    style RULES fill:#fff9c4
```

## 安装配置

### 方式一：插件安装（推荐）

```mermaid
graph LR
    A[添加 Marketplace] --> B[安装插件]
    B --> C[自动配置]
    C --> D[开始使用]
    
    A -.-> A1[/plugin marketplace add]
    B -.-> B1[/plugin install]
    
    style A fill:#e1f5fe
    style C fill:#c8e6c9
    style D fill:#fff9c4
```

**安装步骤：**

```bash
# 1. 添加 marketplace
/plugin marketplace add affaan-m/everything-claude-code

# 2. 安装插件
/plugin install everything-claude-code@everything-claude-code
```

或直接编辑 `~/.claude/settings.json`：

```json
{
  "extraKnownMarketplaces": {
    "everything-claude-code": {
      "source": {
        "source": "github",
        "repo": "affaan-m/everything-claude-code"
      }
    }
  },
  "enabledPlugins": {
    "everything-claude-code@everything-claude-code": true
  }
}
```

**⚠️ 重要：手动安装 Rules**

Claude Code 插件系统不支持通过插件分发 rules（上游限制），需要手动安装：

```bash
# 克隆仓库
git clone https://github.com/affaan-m/everything-claude-code.git

# 选项 A：用户级规则（应用于所有项目）
cp -r everything-claude-code/rules/* ~/.claude/rules/

# 选项 B：项目级规则（仅当前项目）
mkdir -p .claude/rules
cp -r everything-claude-code/rules/* .claude/rules/
```

### 方式二：手动安装

```mermaid
graph TB
    A[克隆仓库] --> B{选择安装范围}
    B -->|用户级| C[~/.claude/]
    B -->|项目级| D[.claude/]
    
    C --> E[复制 agents]
    C --> F[复制 skills]
    C --> G[复制 commands]
    C --> H[复制 rules]
    
    D --> E
    D --> F
    D --> G
    D --> H
    
    E --> I[配置 hooks]
    F --> I
    G --> I
    H --> I
    
    I --> J[配置 MCPs]
    J --> K[完成]
    
    style B fill:#fff9c4
    style I fill:#c8e6c9
    style K fill:#a5d6a7
```

**完整安装命令：**

```bash
# 1. 克隆仓库
git clone https://github.com/affaan-m/everything-claude-code.git
cd everything-claude-code

# 2. 复制核心组件到用户目录
cp agents/*.md ~/.claude/agents/
cp -r skills/* ~/.claude/skills/
cp commands/*.md ~/.claude/commands/
cp rules/*.md ~/.claude/rules/

# 3. 配置 Hooks（编辑 ~/.claude/settings.json）
# 将 hooks/hooks.json 的内容合并到 settings.json

# 4. 配置 MCPs（编辑 ~/.claude.json）
# 将 mcp-configs/mcp-servers.json 的内容合并到 .claude.json
# 替换 YOUR_*_HERE 占位符为实际 API 密钥
```

### MCP 配置最佳实践

```mermaid
graph TB
    A[MCP 配置策略] --> B[上下文窗口管理]
    A --> C[按项目启用]
    A --> D[工具数量控制]
    
    B --> B1[200k 基础窗口]
    B --> B2[过多 MCP 会压缩至 70k]
    
    C --> C1[配置 20-30 个 MCP]
    C --> C2[每项目启用 < 10 个]
    
    D --> D1[总工具数 < 80]
    D --> D2[使用 disabledMcpServers]
    
    style A fill:#fff9c4
    style B2 fill:#ffcdd2
    style C2 fill:#c8e6c9
    style D1 fill:#c8e6c9
```

**项目级 MCP 配置示例：**

```json
{
  "mcpServers": {
    "context7": { "command": "npx", "args": ["-y", "@upvantage/mcp-context7"] },
    "github": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-github"] },
    "filesystem": { "command": "npx", "args": ["-y", "@modelcontextprotocol/server-filesystem"] }
  },
  "disabledMcpServers": [
    "supabase",
    "vercel",
    "railway"
  ]
}
```

## 生态系统工具

### Skill Creator（技能创建器）

从代码仓库的 Git 历史中自动生成 Claude Code 技能。

```mermaid
graph LR
    A[Git 仓库] --> B[Skill Creator]
    B --> C[分析提交历史]
    C --> D[识别模式]
    D --> E[提取工作流]
    E --> F[生成 SKILL.md]
    E --> G[生成 Instincts]
    
    F --> H[直接使用]
    G --> I[持续学习系统]
    
    style B fill:#fff3e0
    style F fill:#c8e6c9
    style G fill:#f3e5f5
```

**使用方式：**

#### 方式 A：本地命令（内置）

```bash
# 分析当前仓库
/skill-create

# 同时生成 instincts
/skill-create --instincts
```

#### 方式 B：GitHub App（高级功能）

适用于 10k+ 提交、自动 PR、团队共享等场景。

```bash
# 在任何 issue 中评论
/skill-creator analyze

# 或在 push 到默认分支时自动触发
```

**输出产物：**

- **SKILL.md 文件** - 即用型技能定义
- **Instinct 集合** - 用于持续学习 v2
- **模式提取** - 从提交历史学习

### Continuous Learning v2（持续学习系统）

基于 instinct 的学习系统，自动从你的编码模式中学习。

```mermaid
graph TB
    subgraph "学习循环"
        A[观察编码行为] --> B[提取 Instinct]
        B --> C[计算置信度]
        C --> D{置信度阈值}
        D -->|高| E[应用到工作流]
        D -->|中| F[继续观察]
        D -->|低| G[归档]
        E --> H[聚类相关 Instinct]
        H --> I[演化为 Skill]
        I --> A
    end
    
    style B fill:#fff9c4
    style E fill:#c8e6c9
    style I fill:#f3e5f5
```

**核心命令：**

```bash
# 查看学习到的 instincts（带置信度）
/instinct-status

# 从他人导入 instincts
/instinct-import <file>

# 导出你的 instincts 供分享
/instinct-export

# 将相关 instincts 聚类为 skills
/evolve
```

**Instinct 结构示例：**

```json
{
  "id": "prefer-immutability",
  "pattern": "使用不可变数据结构",
  "context": "状态管理",
  "confidence": 0.92,
  "occurrences": 47,
  "examples": [
    "使用 Object.freeze()",
    "使用 const 替代 let",
    "使用展开运算符创建副本"
  ]
}
```

### 工作流对比

```mermaid
graph LR
    subgraph "传统方式"
        T1[手动编写配置] --> T2[经验积累]
        T2 --> T3[重复劳动]
    end
    
    subgraph "Everything Claude Code"
        E1[Skill Creator<br/>自动生成] --> E2[Continuous Learning<br/>持续优化]
        E2 --> E3[智能演化]
        E3 --> E1
    end
    
    T3 -.->|低效| X[时间浪费]
    E3 -.->|高效| Y[持续改进]
    
    style T3 fill:#ffcdd2
    style E3 fill:#c8e6c9
    style X fill:#ff6b6b
    style Y fill:#51cf66
```

## 实战示例

### 完整 TDD 工作流

```mermaid
sequenceDiagram
    actor Dev as 开发者
    participant CC as Claude Code
    participant Agent as Test Generator
    participant Hook as Pre-commit Hook
    
    Dev->>CC: 描述功能需求
    CC->>CC: 加载 TDD Skill
    CC->>Agent: 委派：生成测试
    Agent->>Agent: 创建测试文件
    Agent-->>CC: 返回测试代码
    CC->>Dev: 展示测试（RED）
    
    Dev->>CC: 要求实现功能
    CC->>CC: 编写最小实现
    CC->>Dev: 展示实现（GREEN）
    
    Dev->>CC: 运行测试
    CC->>CC: 执行测试套件
    CC->>Dev: ✅ 所有测试通过
    
    Dev->>CC: 重构代码
    CC->>CC: 优化代码结构
    
    Dev->>CC: 提交代码
    CC->>Hook: 触发 pre-commit
    Hook->>Hook: 运行 linter
    Hook->>Hook: 检查测试覆盖率
    Hook-->>CC: ✅ 检查通过
    CC->>Dev: 提交成功
```

### 代码审查流程

```mermaid
graph TB
    A[提交 PR] --> B[触发 Review Hook]
    B --> C[调用 Code Reviewer Agent]
    C --> D[安全检查]
    C --> E[质量检查]
    C --> F[性能检查]
    C --> G[可维护性检查]
    
    D --> H{发现问题?}
    E --> H
    F --> H
    G --> H
    
    H -->|是| I[生成详细报告]
    H -->|否| J[批准 PR]
    
    I --> K[标注严重程度]
    K --> L[提供修复建议]
    L --> M[等待修复]
    
    M --> A
    
    style H fill:#fff9c4
    style I fill:#ffcdd2
    style J fill:#c8e6c9
```

### Hook 应用场景

```mermaid
mindmap
  root((Hook<br/>应用场景))
    代码质量
      自动 Linting
      格式化检查
      复杂度检查
      重复代码检测
    安全检查
      密钥扫描
      依赖审计
      SQL注入检测
      XSS防护
    测试相关
      覆盖率检查
      测试命名验证
      Mock使用检查
      性能测试
    文档管理
      API文档生成
      变更日志更新
      注释完整性
      README同步
    团队协作
      提交信息规范
      PR模板检查
      代码所有者通知
      自动标签
```

## 最佳实践

### 1. 配置分层策略

```mermaid
graph TB
    subgraph "全局配置 ~/.claude/"
        G1[通用 Rules]
        G2[常用 Agents]
        G3[基础 Skills]
        G4[MCP 配置]
    end
    
    subgraph "项目配置 .claude/"
        P1[项目特定 Rules]
        P2[项目 Agents]
        P3[项目 Skills]
        P4[禁用不需要的 MCP]
    end
    
    G1 -.->|继承| P1
    G2 -.->|继承| P2
    G3 -.->|继承| P3
    G4 -.->|继承| P4
    
    P1 -->|覆盖| FINAL[最终配置]
    P2 -->|覆盖| FINAL
    P3 -->|覆盖| FINAL
    P4 -->|覆盖| FINAL
    
    style G1 fill:#e1f5fe
    style P1 fill:#fff9c4
    style FINAL fill:#c8e6c9
```

### 2. 上下文窗口优化

```mermaid
graph LR
    A[200k 基础窗口] --> B{MCP 数量}
    B -->|< 10 个| C[保持 180k+]
    B -->|10-20 个| D[降至 120k+]
    B -->|> 20 个| E[降至 70k!]
    
    C --> F[✅ 良好性能]
    D --> G[⚠️ 性能下降]
    E --> H[❌ 严重影响]
    
    style C fill:#c8e6c9
    style D fill:#fff9c4
    style E fill:#ffcdd2
```

**优化建议：**

- **配置 20-30 个 MCP**：满足各种需求
- **每项目启用 < 10 个**：保持性能
- **使用 `disabledMcpServers`**：项目级禁用
- **定期审查**：移除不使用的 MCP

### 3. 模块化规则设计

```mermaid
graph TB
    A[大型规则文件] --> B[问题]
    B --> B1[难以维护]
    B --> B2[难以复用]
    B --> B3[难以组合]
    
    C[模块化规则] --> D[优势]
    D --> D1[易于维护]
    D --> D2[灵活复用]
    D --> D3[按需组合]
    
    style A fill:#ffcdd2
    style C fill:#c8e6c9
```

**推荐结构：**

```
~/.claude/rules/
├── security/
│   ├── secrets.md        # 密钥管理
│   ├── injection.md      # 注入防护
│   └── xss.md           # XSS 防护
├── coding-style/
│   ├── naming.md         # 命名规范
│   ├── structure.md      # 代码结构
│   └── comments.md       # 注释规范
├── testing/
│   ├── tdd.md           # TDD 流程
│   ├── coverage.md      # 覆盖率要求
│   └── mocking.md       # Mock 使用
└── git/
    ├── commit-msg.md     # 提交信息
    └── branching.md      # 分支策略
```

### 4. Agent 设计原则

```mermaid
graph TB
    subgraph "良好的 Agent 设计"
        A1[单一职责]
        A2[有限工具范围]
        A3[明确的输入输出]
        A4[详细的系统提示]
    end
    
    subgraph "避免的反模式"
        B1[职责过多]
        B2[工具过多]
        B3[模糊的目标]
        B4[缺少文档]
    end
    
    A1 --> C[✅ 可维护]
    A2 --> C
    A3 --> C
    A4 --> C
    
    B1 --> D[❌ 难维护]
    B2 --> D
    B3 --> D
    B4 --> D
    
    style C fill:#c8e6c9
    style D fill:#ffcdd2
```

### 5. 持续学习策略

```mermaid
graph LR
    A[日常编码] --> B[Instinct 提取]
    B --> C[置信度评估]
    C --> D{置信度}
    D -->|高 > 0.8| E[应用到工作流]
    D -->|中 0.5-0.8| F[继续观察]
    D -->|低 < 0.5| G[归档]
    
    E --> H[聚类相关模式]
    H --> I[演化为 Skill]
    I --> J[分享给团队]
    J --> A
    
    style E fill:#c8e6c9
    style I fill:#f3e5f5
    style J fill:#fff9c4
```

## 团队协作

### 配置共享策略

```mermaid
graph TB
    subgraph "团队配置仓库"
        TEAM[team-claude-config/] --> TR[rules/]
        TEAM --> TA[agents/]
        TEAM --> TS[skills/]
    end
    
    subgraph "成员 A"
        A_GLOBAL[~/.claude/] --> A_PROJ[project/.claude/]
        A_GLOBAL -.->|克隆| TEAM
    end
    
    subgraph "成员 B"
        B_GLOBAL[~/.claude/] --> B_PROJ[project/.claude/]
        B_GLOBAL -.->|克隆| TEAM
    end
    
    subgraph "成员 C"
        C_GLOBAL[~/.claude/] --> C_PROJ[project/.claude/]
        C_GLOBAL -.->|克隆| TEAM
    end
    
    A_PROJ -.->|反馈| TEAM
    B_PROJ -.->|反馈| TEAM
    C_PROJ -.->|反馈| TEAM
    
    style TEAM fill:#fff9c4
    style A_PROJ fill:#e1f5fe
    style B_PROJ fill:#e1f5fe
    style C_PROJ fill:#e1f5fe
```

### Instinct 共享工作流

```mermaid
sequenceDiagram
    actor DevA as 开发者 A
    actor DevB as 开发者 B
    participant Repo as 团队仓库
    
    DevA->>DevA: /instinct-export
    DevA->>Repo: 提交 instincts.json
    
    Repo->>DevB: 拉取更新
    DevB->>DevB: /instinct-import instincts.json
    DevB->>DevB: /instinct-status
    
    DevB->>DevB: 基于新 instinct 编码
    DevB->>DevB: /evolve
    DevB->>Repo: 提交新 skill
    
    Repo->>DevA: 拉取更新
    DevA->>DevA: 使用新 skill
```

## 常见问题

### Q1: 如何选择合适的 MCP？

```mermaid
graph TB
    A{项目需求} --> B[Web开发]
    A --> C[数据分析]
    A --> D[DevOps]
    A --> E[通用]
    
    B --> B1[Context7<br/>Firecrawl<br/>GitHub]
    C --> C1[Memory<br/>Sequential Thinking]
    D --> D1[GitHub<br/>Railway<br/>Vercel]
    E --> E1[Filesystem<br/>Memory]
    
    style A fill:#fff9c4
    style B1 fill:#e1f5fe
    style C1 fill:#e1f5fe
    style D1 fill:#e1f5fe
    style E1 fill:#e1f5fe
```

### Q2: Agent vs Skill 如何选择？

```mermaid
graph LR
    A{需要解决的问题} --> B{需要工具执行?}
    B -->|是| C[使用 Agent]
    B -->|否| D[使用 Skill]
    
    C --> C1[代码审查<br/>测试生成<br/>Bug修复]
    D --> D1[工作流程<br/>最佳实践<br/>指导原则]
    
    style C fill:#fff3e0
    style D fill:#f3e5f5
```

### Q3: Hook 性能影响如何优化？

```mermaid
graph TB
    A[Hook 性能优化] --> B[使用精确匹配器]
    A --> C[避免复杂命令]
    A --> D[缓存检查结果]
    A --> E[并行执行]
    
    B --> B1[正则表达式优化]
    C --> C1[简化检查逻辑]
    D --> D1[存储中间结果]
    E --> E1[独立 Hook 并行]
    
    style A fill:#fff9c4
    style B1 fill:#c8e6c9
    style C1 fill:#c8e6c9
    style D1 fill:#c8e6c9
    style E1 fill:#c8e6c9
```

## 进阶主题

### 自定义 Skill 模板

```markdown
# [技能名称]

## 🎯 目标
简明描述该技能要实现的目标

## 📋 前置条件
- 条件 1
- 条件 2

## 🔄 工作流程

### 步骤 1: [步骤名]
详细描述步骤 1

### 步骤 2: [步骤名]
详细描述步骤 2

## ✅ 验证标准
- [ ] 标准 1
- [ ] 标准 2

## 📚 相关资源
- 相关文档链接
- 相关 Agent
- 相关 Rule

## 💡 最佳实践
- 实践建议 1
- 实践建议 2

## ⚠️ 常见陷阱
- 陷阱 1 及避免方法
- 陷阱 2 及避免方法
```

### 复杂 Hook 示例

```json
{
  "matcher": "tool == \"Edit\" && tool_input.file_path matches \"src/.*\\.(ts|tsx)$\" && tool_output.success",
  "hooks": [
    {
      "type": "command",
      "command": "#!/bin/bash\n# 检查 TypeScript 类型\nnpx tsc --noEmit \"$file_path\" 2>&1",
      "continueOnError": false
    },
    {
      "type": "command",
      "command": "#!/bin/bash\n# 运行相关测试\ntest_file=\"${file_path/src/tests}\"\ntest_file=\"${test_file/.ts/.test.ts}\"\nif [ -f \"$test_file\" ]; then\n  npm test \"$test_file\"\nfi",
      "continueOnError": true
    },
    {
      "type": "agent",
      "agent": "code-reviewer",
      "prompt": "快速审查此改动是否引入明显问题",
      "condition": "changed_lines > 50"
    }
  ]
}
```

## 贡献指南

### 贡献流程

```mermaid
graph LR
    A[Fork 仓库] --> B[创建分支]
    B --> C[开发功能]
    C --> D[编写测试]
    D --> E[提交 PR]
    E --> F[代码审查]
    F --> G{审查结果}
    G -->|通过| H[合并]
    G -->|需修改| C
    
    style A fill:#e1f5fe
    style E fill:#fff9c4
    style H fill:#c8e6c9
```

### 贡献方向

```mermaid
mindmap
  root((贡献<br/>方向))
    新增 Agents
      领域专家
      调试助手
      性能优化器
    扩展 Skills
      语言特定
      框架特定
      领域知识
    改进 Hooks
      更多检查
      性能优化
      错误处理
    增强 Rules
      安全规范
      性能规范
      可访问性
    MCP 配置
      新服务集成
      配置优化
      文档完善
```

## 社区资源

- **GitHub 仓库**: [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code)
- **简明指南**: [The Shorthand Guide](https://github.com/affaan-m/everything-claude-code/blob/main/SHORTHAND_GUIDE.md)
- **详细指南**: [The Longform Guide](https://github.com/affaan-m/everything-claude-code/blob/main/LONGFORM_GUIDE.md)
- **zenith.chat**: 使用 Claude Code 构建的产品示例
- **Twitter**: [@affaanmustafa](https://twitter.com/affaanmustafa)

## 总结

```mermaid
graph TB
    START[开始使用<br/>Everything Claude Code] --> INSTALL[选择安装方式]
    INSTALL --> PLUGIN[插件安装 推荐]
    INSTALL --> MANUAL[手动安装]
    
    PLUGIN --> CONFIG[配置 MCPs]
    MANUAL --> CONFIG
    
    CONFIG --> BASIC[掌握基础概念]
    BASIC --> B1[Agents]
    BASIC --> B2[Skills]
    BASIC --> B3[Hooks]
    BASIC --> B4[Commands]
    BASIC --> B5[Rules]
    
    B1 --> PRACTICE[实践应用]
    B2 --> PRACTICE
    B3 --> PRACTICE
    B4 --> PRACTICE
    B5 --> PRACTICE
    
    PRACTICE --> ADVANCED[使用高级工具]
    ADVANCED --> A1[Skill Creator]
    ADVANCED --> A2[Continuous Learning]
    
    A1 --> SHARE[分享与贡献]
    A2 --> SHARE
    
    SHARE --> COMMUNITY[加入社区]
    
    style START fill:#e3f2fd
    style PLUGIN fill:#c8e6c9
    style PRACTICE fill:#fff9c4
    style ADVANCED fill:#f3e5f5
    style COMMUNITY fill:#ffccbc
```

Everything Claude Code 是一个强大而灵活的配置集合，它不仅提供了开箱即用的最佳实践，还支持持续学习和团队协作。通过合理使用这些工具，你可以显著提升 Claude Code 的能力，构建更高效的 AI 编程工作流。

**关键要点：**

1. **从小开始**：先启用基础组件，逐步添加更多功能
2. **保持模块化**：让配置易于维护和复用
3. **持续学习**：利用 Skill Creator 和 Continuous Learning 不断优化
4. **团队协作**：通过共享配置和 Instinct 提升团队效率
5. **贡献回馈**：将你的最佳实践分享给社区

## 许可证

MIT - 自由使用、修改，如果可能请回馈社区。

---

**如果这个指南对你有帮助，请给项目加星 ⭐，阅读两份指南（简明版和详细版），然后开始构建伟大的项目！**

