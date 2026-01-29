---
title: "Awesome ChatGPT Prompts完全指南 - 最全AI提示词库"
date: 2026-02-22T08:00:00+08:00
categories:
  - AI工具
tags:
  - Prompts
  - AI
toc: true
toc_label: "目录"
toc_icon: "comments"
excerpt: "Awesome ChatGPT Prompts是全球最受欢迎的AI提示词库，拥有142k+ GitHub星标，提供丰富的提示词模板，支持ChatGPT、Claude、Gemini等多种AI模型，可快速部署私有提示词库。"
---

## Awesome ChatGPT Prompts 简介

Awesome ChatGPT Prompts是一个开源的AI提示词（Prompts）收集和分享平台，拥有超过142,000个GitHub星标，是全球最受欢迎的提示词资源库之一。虽然最初为ChatGPT设计，但这些提示词同样适用于Claude、Gemini、Llama、Mistral等各种大语言模型。

```mermaid
graph TB
    A[Awesome ChatGPT Prompts] --> B[在线平台<br/>prompts.chat]
    A --> C[GitHub仓库<br/>开源协作]
    A --> D[私有部署<br/>企业定制]
    
    B --> B1[浏览提示词]
    B --> B2[在线使用]
    B --> B3[社区分享]
    
    C --> C1[贡献提示词]
    C --> C2[Fork定制]
    C --> C3[API集成]
    
    D --> D1[品牌定制]
    D --> D2[权限管理]
    D --> D3[私有数据]
    
    style A fill:#6366F1,stroke:#4F46E5,stroke-width:3px,color:#fff
    style B fill:#10B981,stroke:#059669,stroke-width:2px,color:#fff
    style C fill:#F59E0B,stroke:#D97706,stroke-width:2px,color:#fff
    style D fill:#EF4444,stroke:#DC2626,stroke-width:2px,color:#fff
```

### 核心特性

1. **海量提示词库**：包含数百个精心设计的提示词模板
2. **多模型支持**：兼容ChatGPT、Claude、Gemini、Llama等AI模型
3. **开源免费**：CC0-1.0协议，完全开源可商用
4. **快速部署**：一条命令即可部署私有提示词库
5. **社区驱动**：持续更新，298+贡献者共同维护

## 快速开始

### 在线使用

最简单的方式是直接访问 [prompts.chat](https://prompts.chat) 在线平台：

```bash
# 或使用命令行快速访问
npx prompts.chat
```

```mermaid
sequenceDiagram
    participant U as 用户
    participant P as prompts.chat
    participant AI as AI模型
    
    U->>P: 1. 访问网站/运行命令
    P->>U: 2. 展示提示词库
    U->>P: 3. 选择提示词
    P->>U: 4. 显示提示词内容
    U->>AI: 5. 复制到AI聊天
    AI->>U: 6. 获得专业回答
    
    Note over U,AI: 无需注册，即可使用
```

### 浏览提示词资源

提示词可以通过多种方式访问：

1. **在线平台**：[https://prompts.chat](https://prompts.chat)
2. **GitHub文档**：[PROMPTS.md](https://github.com/f/awesome-chatgpt-prompts/blob/main/PROMPTS.md)
3. **CSV数据**：[prompts.csv](https://github.com/f/awesome-chatgpt-prompts/blob/main/prompts.csv)
4. **HuggingFace数据集**：Data Studio格式
5. **DeepWiki分析**：[https://deepwiki.com/f/awesome-chatgpt-prompts](https://deepwiki.com/f/awesome-chatgpt-prompts)

## 核心功能详解

### 1. 提示词分类系统

```mermaid
mindmap
  root((Prompts分类))
    专业角色
      开发工程师
      产品经理
      数据分析师
      设计师
    创意写作
      小说创作
      剧本编写
      诗歌创作
      营销文案
    教育学习
      语言老师
      数学导师
      历史专家
      科学顾问
    生活助手
      心理咨询
      健康顾问
      旅行规划
      美食推荐
    技术工具
      代码审查
      调试助手
      架构设计
      SQL专家
```

### 2. 提示词使用流程

```mermaid
flowchart LR
    A[选择需求场景] --> B{浏览分类}
    B --> C[找到合适提示词]
    C --> D[复制提示词]
    D --> E[粘贴到AI聊天]
    E --> F{效果满意?}
    F -->|是| G[保存到收藏]
    F -->|否| H[调整提示词]
    H --> E
    G --> I[分享给社区]
    
    style A fill:#E0F2FE,stroke:#0369A1,stroke-width:2px
    style G fill:#D1FAE5,stroke:#059669,stroke-width:2px
    style I fill:#FEF3C7,stroke:#D97706,stroke-width:2px
```

## 实用示例

### 示例1：Linux终端专家

**提示词**：
```
I want you to act as a linux terminal. I will type commands and you will reply with what the terminal should show. I want you to only reply with the terminal output inside one unique code block, and nothing else. do not write explanations. do not type commands unless I instruct you to do so. When I need to tell you something in English, I will do so by putting text inside curly brackets {like this}.
```

**使用场景**：学习Linux命令、模拟终端环境、调试脚本

```mermaid
sequenceDiagram
    participant U as 用户
    participant AI as AI(Linux终端模式)
    
    U->>AI: 输入提示词（激活角色）
    Note over AI: 进入Linux终端模式
    
    U->>AI: ls -la
    AI->>U: drwxr-xr-x 5 user group 160 Feb 22 08:00 .<br/>drwxr-xr-x 3 user group  96 Feb 21 10:00 ..<br/>-rw-r--r-- 1 user group 2048 Feb 22 08:00 file.txt
    
    U->>AI: pwd
    AI->>U: /home/user/projects
    
    U->>AI: {这个命令的作用是什么?}
    AI->>U: 解释：pwd显示当前工作目录
```

### 示例2：英语翻译和改进助手

**提示词**：
```
I want you to act as an English translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version of my text, in English. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more literary.
```

**使用场景**：提升英语表达、翻译优化、学术写作

```mermaid
graph LR
    A[输入任何语言] --> B[AI检测语言]
    B --> C[翻译成英语]
    C --> D[拼写检查]
    D --> E[语法改进]
    E --> F[提升文学性]
    F --> G[输出优雅英语]
    
    style A fill:#DBEAFE,stroke:#1E40AF
    style G fill:#D1FAE5,stroke:#059669
    style D fill:#FEF3C7,stroke:#D97706
    style E fill:#FEF3C7,stroke:#D97706
    style F fill:#FEF3C7,stroke:#D97706
```

### 示例3：全栈开发工程师

**提示词**：
```
I want you to act as a software developer. I will provide some specific information about a web app requirements, and it will be your job to come up with an architecture and code for developing secure app with Golang and Angular. 
```

**应用架构示例**：

```mermaid
graph TB
    subgraph "前端层"
        A[Angular UI]
        A1[组件]
        A2[服务]
        A3[路由]
    end
    
    subgraph "后端层"
        B[Golang API]
        B1[Handler]
        B2[Service]
        B3[Repository]
    end
    
    subgraph "数据层"
        C[(数据库)]
        D[缓存Redis]
    end
    
    A --> A1
    A --> A2
    A --> A3
    A2 -->|REST API| B
    B --> B1
    B1 --> B2
    B2 --> B3
    B3 --> C
    B2 --> D
    
    style A fill:#DD0031,stroke:#C3002F,color:#fff
    style B fill:#00ADD8,stroke:#007D9C,color:#fff
    style C fill:#4479A1,stroke:#2C5F8D,color:#fff
```

### 示例4：产品经理

**提示词**：
```
I want you to act as a product manager. I will provide you with a product or feature idea, and you will help me create a comprehensive product requirements document (PRD) including user stories, acceptance criteria, and technical requirements.
```

**PRD文档结构**：

```mermaid
flowchart TD
    A[产品需求] --> B[用户研究]
    B --> C[功能定义]
    C --> D[用户故事]
    C --> E[验收标准]
    C --> F[技术要求]
    
    D --> G[优先级排序]
    E --> G
    F --> G
    
    G --> H[Sprint计划]
    H --> I[开发实施]
    I --> J[测试验证]
    J --> K{是否通过?}
    K -->|是| L[发布上线]
    K -->|否| I
    
    style A fill:#FEF3C7,stroke:#D97706,stroke-width:2px
    style L fill:#D1FAE5,stroke:#059669,stroke-width:2px
    style K fill:#FECACA,stroke:#DC2626,stroke-width:2px
```

## 私有部署指南

### 快速部署

使用一条命令创建私有提示词库：

```bash
# 使用向导式安装
npx prompts.chat new my-prompt-library
cd my-prompt-library

# 或手动克隆
git clone https://github.com/f/awesome-chatgpt-prompts.git
cd awesome-chatgpt-prompts
npm install
npm run setup
```

### 部署架构

```mermaid
graph TB
    subgraph "客户端"
        A[Web浏览器]
        B[移动应用]
    end
    
    subgraph "应用层"
        C[Next.js服务器]
        D[API路由]
        E[认证中间件]
    end
    
    subgraph "数据层"
        F[(PostgreSQL<br/>Prisma ORM)]
        G[文件存储]
    end
    
    subgraph "认证服务"
        H[GitHub OAuth]
        I[Google OAuth]
        J[Azure AD]
        K[邮箱登录]
    end
    
    A --> C
    B --> C
    C --> D
    D --> E
    E --> H
    E --> I
    E --> J
    E --> K
    D --> F
    D --> G
    
    style C fill:#000000,stroke:#000000,color:#fff
    style F fill:#4169E1,stroke:#27408B,color:#fff
    style E fill:#FF6B6B,stroke:#C92A2A,color:#fff
```

### 配置选项

安装向导会引导你完成以下配置：

```mermaid
flowchart LR
    A[运行setup] --> B[品牌配置]
    B --> C[主题设置]
    C --> D[认证方式]
    D --> E[功能开关]
    E --> F[语言选择]
    F --> G[赞助商配置]
    G --> H[完成配置]
    
    B -.-> B1[组织名称<br/>Logo<br/>描述]
    C -.-> C1[颜色<br/>圆角<br/>UI风格]
    D -.-> D1[OAuth<br/>邮箱<br/>SSO]
    E -.-> E2[私有Prompts<br/>分类标签<br/>AI搜索<br/>评论功能]
    
    style A fill:#A78BFA,stroke:#7C3AED,color:#fff
    style H fill:#34D399,stroke:#059669,color:#fff
```

### 环境变量配置

编辑 `.env` 文件：

```bash
# 数据库配置
DATABASE_URL="postgresql://user:password@localhost:5432/prompts"

# 认证配置
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"

# 应用配置
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your_secret_key"

# 功能开关
ENABLE_PRIVATE_PROMPTS=true
ENABLE_AI_SEARCH=true
ENABLE_COMMENTS=true
```

### 数据库迁移与启动

```bash
# 推送数据库架构
npm run db:push

# 启动开发服务器
npm run dev

# 生产环境构建
npm run build
npm start
```

## 高级功能

### 1. MCP集成（Model Context Protocol）

```mermaid
sequenceDiagram
    participant C as Cursor/IDE
    participant M as MCP服务器
    participant P as Prompts数据库
    participant AI as AI模型
    
    C->>M: 请求提示词
    M->>P: 查询提示词
    P->>M: 返回提示词
    M->>C: 提供提示词
    C->>AI: 发送带提示词的请求
    AI->>C: 返回结果
    
    Note over C,AI: 无缝集成到开发环境
```

### 2. AI搜索功能

使用AI语义搜索快速找到合适的提示词：

```mermaid
graph LR
    A[用户输入需求] --> B[向量化查询]
    B --> C[语义匹配]
    C --> D[相关度排序]
    D --> E[返回推荐提示词]
    E --> F{用户选择}
    F -->|满意| G[使用提示词]
    F -->|不满意| H[AI生成新提示词]
    H --> G
    
    style A fill:#E0F2FE,stroke:#0284C7
    style G fill:#D1FAE5,stroke:#059669
    style H fill:#FED7AA,stroke:#EA580C
```

### 3. 社区协作流程

```mermaid
flowchart TD
    A[创建提示词] --> B{本地测试}
    B -->|通过| C[提交到prompts.chat]
    B -->|失败| D[修改优化]
    D --> B
    
    C --> E[社区审核]
    E --> F{质量检查}
    F -->|通过| G[发布到平台]
    F -->|需改进| H[反馈建议]
    H --> D
    
    G --> I[自动同步到GitHub]
    I --> J[更新prompts.csv]
    I --> K[更新PROMPTS.md]
    
    style A fill:#DBEAFE,stroke:#0284C7
    style G fill:#D1FAE5,stroke:#059669
    style H fill:#FED7AA,stroke:#EA580C
```

## 最佳实践

### 1. 提示词编写原则

```mermaid
mindmap
  root((提示词<br/>编写原则))
    明确性
      清晰的角色定义
      具体的任务描述
      明确的输出格式
    上下文
      提供背景信息
      设定约束条件
      指定专业领域
    结构化
      使用分段说明
      列举要点
      添加示例
    可测试
      预期输出明确
      可重复使用
      易于调试
```

### 2. 提示词优化流程

```mermaid
graph TB
    A[初版提示词] --> B[测试输出质量]
    B --> C{是否满意?}
    C -->|否| D[分析问题]
    D --> E[调整提示词]
    E --> B
    C -->|是| F[多场景测试]
    F --> G{稳定性如何?}
    G -->|好| H[发布分享]
    G -->|差| I[增加约束条件]
    I --> B
    
    H --> J[收集反馈]
    J --> K[持续优化]
    
    style A fill:#E0F2FE,stroke:#0284C7
    style H fill:#D1FAE5,stroke:#059669
    style D fill:#FED7AA,stroke:#EA580C
```

### 3. 使用技巧

**技巧1：角色链**
将多个专业角色组合使用：

```mermaid
flowchart LR
    A[产品经理] -->|需求文档| B[架构师]
    B -->|技术方案| C[开发工程师]
    C -->|代码实现| D[测试工程师]
    D -->|测试报告| E[技术作家]
    E -->|最终文档| F[完成]
    
    style A fill:#FEF3C7,stroke:#D97706
    style B fill:#DBEAFE,stroke:#0284C7
    style C fill:#D1FAE5,stroke:#059669
    style D fill:#FED7AA,stroke:#EA580C
    style E fill:#E9D5FF,stroke:#9333EA
    style F fill:#D1FAE5,stroke:#059669
```

**技巧2：渐进式细化**

```mermaid
graph TD
    A[通用提示词] --> B[添加领域知识]
    B --> C[指定输出格式]
    C --> D[增加示例]
    D --> E[设置约束条件]
    E --> F[最终提示词]
    
    style A fill:#FEE2E2,stroke:#DC2626
    style C fill:#FEF3C7,stroke:#D97706
    style F fill:#D1FAE5,stroke:#059669
```

## 资源链接

### 官方资源

- **在线平台**：[https://prompts.chat](https://prompts.chat)
- **GitHub仓库**：[https://github.com/f/awesome-chatgpt-prompts](https://github.com/f/awesome-chatgpt-prompts)
- **DeepWiki分析**：[https://deepwiki.com/f/awesome-chatgpt-prompts](https://deepwiki.com/f/awesome-chatgpt-prompts)
- **HuggingFace数据集**：prompts.csv数据集

### 相关文档

- **提示词列表**：[PROMPTS.md](https://github.com/f/awesome-chatgpt-prompts/blob/main/PROMPTS.md)
- **自部署指南**：[Self-Hosting Guide](https://github.com/f/awesome-chatgpt-prompts#want-to-deploy-your-own-private-prompt-library-for-your-team)
- **贡献指南**：[Contributing](https://github.com/f/awesome-chatgpt-prompts/blob/main/CONTRIBUTING.md)
- **Agent提示词**：[AGENTS.md](https://github.com/f/awesome-chatgpt-prompts/blob/main/AGENTS.md)
- **Claude专用提示词**：[CLAUDE.md](https://github.com/f/awesome-chatgpt-prompts/blob/main/CLAUDE.md)

### 推荐书籍

作者编写的相关电子书：

1. **"The Art of ChatGPT Prompting"** - 如何编写清晰有效的提示词
2. **"How to Make Money with ChatGPT"** - 使用ChatGPT赚钱的策略和技巧
3. **"The Art of Midjourney AI"** - 从文本创建图像的指南

## 技术架构

### 技术栈

```mermaid
graph TB
    subgraph "前端技术"
        A[Next.js 14]
        B[React 18]
        C[TypeScript]
        D[Tailwind CSS]
        E[Shadcn UI]
    end
    
    subgraph "后端技术"
        F[Next.js API Routes]
        G[NextAuth.js]
        H[Prisma ORM]
    end
    
    subgraph "数据库"
        I[PostgreSQL]
        J[SQLite<br/>开发环境]
    end
    
    subgraph "部署"
        K[Vercel]
        L[Docker]
        M[自托管]
    end
    
    A --> F
    B --> A
    C --> A
    C --> F
    D --> A
    E --> A
    F --> G
    F --> H
    H --> I
    H --> J
    F --> K
    L --> M
    
    style A fill:#000000,stroke:#000000,color:#fff
    style I fill:#4169E1,stroke:#27408B,color:#fff
    style K fill:#000000,stroke:#000000,color:#fff
```

### 数据模型

```mermaid
erDiagram
    USER ||--o{ PROMPT : creates
    USER ||--o{ COMMENT : writes
    USER ||--o{ FAVORITE : saves
    PROMPT ||--o{ COMMENT : has
    PROMPT ||--o{ FAVORITE : has
    PROMPT }o--|| CATEGORY : belongs_to
    PROMPT }o--o{ TAG : has
    
    USER {
        string id PK
        string name
        string email
        string image
        datetime createdAt
    }
    
    PROMPT {
        string id PK
        string title
        text content
        string userId FK
        string categoryId FK
        boolean isPrivate
        int views
        datetime createdAt
    }
    
    CATEGORY {
        string id PK
        string name
        string description
    }
    
    TAG {
        string id PK
        string name
    }
    
    COMMENT {
        string id PK
        text content
        string userId FK
        string promptId FK
        datetime createdAt
    }
    
    FAVORITE {
        string id PK
        string userId FK
        string promptId FK
        datetime createdAt
    }
```

## 贡献与社区

### 贡献统计

- **GitHub Stars**: 142,000+
- **Forks**: 18,800+
- **贡献者**: 298+
- **提交次数**: 4,164+

### 贡献流程

```mermaid
sequenceDiagram
    participant C as 贡献者
    participant G as GitHub
    participant P as prompts.chat
    participant R as 审核团队
    
    C->>G: 1. Fork仓库
    C->>C: 2. 本地开发
    C->>G: 3. 提交PR
    G->>R: 4. 通知审核
    R->>R: 5. 代码审查
    R->>G: 6. 审核意见
    G->>C: 7. 反馈修改
    C->>G: 8. 更新PR
    R->>G: 9. 批准合并
    G->>P: 10. 自动同步
    
    Note over G,P: 提示词自动同步到平台
```

### 许可证

本项目使用 **CC0-1.0 Universal (Public Domain Dedication)** 许可证：

- ✅ 可自由复制、修改和分发
- ✅ 可用于商业用途
- ✅ 无需署名或许可
- ✅ 完全公共域

```mermaid
graph LR
    A[CC0-1.0<br/>许可证] --> B[个人使用]
    A --> C[商业使用]
    A --> D[修改分发]
    A --> E[私有部署]
    
    B --> F[✓ 无限制]
    C --> F
    D --> F
    E --> F
    
    style A fill:#10B981,stroke:#059669,stroke-width:3px,color:#fff
    style F fill:#34D399,stroke:#059669,stroke-width:2px,color:#fff
```

## 常见问题

### Q1: 如何选择合适的提示词？

**A**: 按照以下步骤：

```mermaid
flowchart TD
    A[明确你的需求] --> B{任务类型}
    B -->|代码开发| C[选择技术角色]
    B -->|内容创作| D[选择写作角色]
    B -->|分析决策| E[选择顾问角色]
    B -->|学习教育| F[选择教师角色]
    
    C --> G[测试效果]
    D --> G
    E --> G
    F --> G
    
    G --> H{是否满意?}
    H -->|是| I[保存使用]
    H -->|否| J[尝试其他提示词<br/>或自定义修改]
    J --> G
    
    style A fill:#DBEAFE,stroke:#0284C7
    style I fill:#D1FAE5,stroke:#059669
```

### Q2: 提示词不工作怎么办？

1. **尝试新对话线程**：有时AI需要新的上下文
2. **重新表述**：用自己的语言重写提示词，保持核心指令
3. **添加示例**：在提示词后添加期望的输出示例
4. **简化或细化**：根据情况调整提示词复杂度

### Q3: 可以修改提示词吗？

当然可以！所有提示词都是开源的，你可以：

- 根据需求修改
- 合并多个提示词
- 创建自己的变体
- 分享改进版本

### Q4: 私有部署需要什么条件？

**最低要求**：
- Node.js 18+
- PostgreSQL或SQLite数据库
- 1GB RAM
- 10GB存储空间

**推荐配置**：
- Node.js 20+
- PostgreSQL 14+
- 2GB+ RAM
- 20GB+ 存储空间
- HTTPS域名

## 总结

Awesome ChatGPT Prompts是AI时代必备的提示词资源库，无论你是开发者、创作者、研究者还是普通用户，都能从中找到适合的提示词模板。通过本指南，你已经掌握了：

```mermaid
mindmap
  root((掌握技能))
    基础使用
      在线访问
      提示词选择
      复制应用
    进阶技能
      提示词优化
      多角色组合
      自定义修改
    企业应用
      私有部署
      品牌定制
      团队协作
    社区贡献
      提交提示词
      代码贡献
      经验分享
```

立即开始使用：

```bash
# 在线使用
npx prompts.chat

# 私有部署
npx prompts.chat new my-prompts
cd my-prompts
npm run setup
```

祝你在AI的世界中探索愉快！🚀

---

## 参考资源

- [Awesome ChatGPT Prompts GitHub](https://github.com/f/awesome-chatgpt-prompts)
- [prompts.chat 官网](https://prompts.chat)
- [DeepWiki 代码库分析](https://deepwiki.com/f/awesome-chatgpt-prompts)
- [提示词工程指南](https://www.promptingguide.ai/)

