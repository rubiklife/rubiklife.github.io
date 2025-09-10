# iFlow 上下文信息 (IFLOW.md)

## 项目概述

这是一个基于 GitHub Pages 和 Minimal Mistakes Jekyll 主题搭建的个人网站，名为"AI创未来"。该网站主要用于分享 AI 学习、AI 分享、AI 创意和 AI 编程相关内容。

主要技术栈：
- Jekyll 静态网站生成器
- Minimal Mistakes 主题
- Ruby (通过 Gemfile 管理依赖)
- GitHub Pages 托管

网站功能特性包括响应式设计、SEO 优化、Markdown 支持、文章分类/标签/归档、富媒体嵌入、社交媒体集成、站内搜索等。

## 目录结构说明

- `_config.yml`: 网站核心配置文件，包含站点设置、主题配置、SEO 设置、评论系统配置等。
- `_posts/`: 存放所有博客文章，文件名格式为 `YYYY-MM-DD-title.md`。
- `_pages/`: 存放网站页面，如首页、分类页、标签页、404 页面等。
- `_data/`: 存放数据文件，如导航菜单配置 (`navigation.yml`)。
- `_layouts/`: 存放自定义页面布局模板。
- `_includes/`: 存放可复用的页面组件，如头部、页脚、评论系统等。
- `assets/`: 存放静态资源文件，包括 CSS 样式文件 (`main.scss`) 和图片。
- `scripts/`: 存放脚本文件。

## 构建和运行

1. 确保已安装 Ruby 和 Bundler
2. 克隆仓库: `git clone https://github.com/rubiklife/rubiklife.github.io.git`
3. 进入目录: `cd rubiklife.github.io`
4. 安装依赖: `bundle install`
5. 启动本地服务器: `bundle exec jekyll serve`
6. 在浏览器中访问: `http://localhost:4000`

## 开发约定

### 添加新文章

1. 在 `_posts` 目录中创建新的 markdown 文件，文件名格式为: `YYYY-MM-DD-title.md`
2. 添加前置元数据（YAML Front Matter）：

```yaml
---
title: "文章标题"
date: YYYY-MM-DD
categories:
  - 分类名称
tags:
  - 标签1
  - 标签2
toc: true  # 启用目录
header:
  image: /assets/images/header-image.jpg  # 可选
  teaser: /assets/images/teaser-image.jpg  # 可选
---
```

3. 使用 Markdown 编写文章内容

### 自定义

- 修改 `_config.yml` 文件中的站点设置和作者信息
- 修改 `_data/navigation.yml` 自定义导航菜单
- 添加自定义 CSS 到 `assets/css/main.scss`

## 关键配置文件

1. `_config.yml`: 网站的主要配置文件，包含所有全局设置。
2. `Gemfile`: 定义 Ruby 依赖项。
3. `_data/navigation.yml`: 网站导航菜单配置。
4. `assets/css/main.scss`: 自定义 CSS 样式。

## 特殊功能

### Mermaid 图表支持

网站集成了 Mermaid 图表功能，可以在文章中使用代码块来插入图表：

````markdown
```mermaid
graph TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[Car]
```
````

### 评论系统

网站使用 Giscus 作为评论系统，配置在 `_config.yml` 中。

### SEO 优化

通过 `jekyll-seo-tag` 插件进行 SEO 优化，相关配置也在 `_config.yml` 中。