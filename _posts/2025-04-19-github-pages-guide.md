---
title: "GitHub Pages 使用指南 - 免费托管你的个人网站"
date: 2025-04-19T09:15:00+08:00
categories:
  - 教程
tags:
  - GitHub Pages
  - 网站搭建
  - Git
toc: true
toc_label: "目录"
toc_icon: "book"
header:
  image: /assets/images/digital-network-technology.jpg
  teaser: /assets/images/ai-technology-blue.jpg
---

## GitHub Pages 简介

GitHub Pages 是 GitHub 提供的一项静态网站托管服务，允许用户直接从 GitHub 仓库发布网站。无需服务器配置，无需后端代码，只需要简单的 Git 操作，就能轻松拥有一个专业的网站。本文将详细介绍如何使用 GitHub Pages 搭建个人网站。

## 为什么选择 GitHub Pages

- **完全免费**：无需支付任何费用，包括域名（以 `.github.io` 结尾）
- **易于维护**：使用 Git 工作流程管理内容
- **无需服务器**：GitHub 提供全部托管服务
- **支持自定义域名**：可以使用自己的域名
- **HTTPS 支持**：自动提供安全连接
- **Jekyll 集成**：原生支持 Jekyll 静态网站生成器

## 基本用法

### 创建一个 GitHub Pages 仓库

1. 登录 GitHub 账号
2. 创建一个新的仓库，命名为 `username.github.io`（将 `username` 替换为你的 GitHub 用户名）
3. 仓库必须是公开的

### 从零开始构建网站

1. 克隆仓库到本地：

```bash
git clone https://github.com/username/username.github.io.git
cd username.github.io
```

2. 创建一个简单的 HTML 页面：

```bash
echo "<!DOCTYPE html>
<html>
<head>
    <title>我的 GitHub Pages 网站</title>
    <meta charset="UTF-8">
</head>
<body>
    <h1>Hello World</h1>
    <p>这是我的第一个 GitHub Pages 网站！</p>
</body>
</html>" > index.html
```

3. 提交并推送到 GitHub：

```bash
git add index.html
git commit -m "初始网站"
git push -u origin main
```

4. 访问 `https://username.github.io` 查看你的网站！

## 使用 Jekyll 构建网站

GitHub Pages 原生支持 Jekyll，这是一个强大的静态网站生成器，可以让你的网站更加专业和易于维护。

### 方法一：使用 Jekyll 主题选择器

1. 在 GitHub 上，进入仓库设置
2. 找到 "GitHub Pages" 部分
3. 点击 "选择主题" 按钮，选择一个喜欢的主题
4. 提交更改

### 方法二：使用现有 Jekyll 主题

1. 克隆主题仓库或下载主题文件
2. 将文件复制到你的 GitHub Pages 仓库
3. 修改 `_config.yml` 文件，配置网站信息
4. 在 `_posts` 目录中添加文章

```bash
# 创建新文章
echo '---
layout: post
title: "我的第一篇文章"
date: 2025-04-19
---

这是我的第一篇使用 Jekyll 创建的博客文章。
' > _posts/2025-04-19-first-post.md
```

5. 提交并推送更改

```bash
git add .
git commit -m "添加 Jekyll 主题和第一篇文章"
git push
```

## 自定义域名

如果你想使用自己的域名，而不是默认的 `username.github.io`，可以按照以下步骤操作：

1. 在你的域名注册商中添加 DNS 记录：
   - 如果使用子域名（如 `blog.example.com`），添加一条 CNAME 记录，指向 `username.github.io`
   - 如果使用顶级域名（如 `example.com`），添加 A 记录，指向 GitHub Pages 的 IP 地址

2. 在仓库中创建 `CNAME` 文件：

```bash
echo "example.com" > CNAME
git add CNAME
git commit -m "添加自定义域名"
git push
```

3. 在仓库设置中启用 HTTPS（强烈推荐）

## 网站内容更新

### 添加新文章

1. 在 `_posts` 目录中创建一个新的 Markdown 文件，命名格式为 `YYYY-MM-DD-title.md`
2. 添加 YAML 前置元数据
3. 编写文章内容
4. 提交并推送更改

### 更新现有页面

1. 直接编辑 HTML 或 Markdown 文件
2. 提交并推送更改
3. 等待几分钟，更改会自动发布

## 常见问题解决

### 网站没有更新

- 确保你的修改已成功推送到正确的仓库和分支
- 检查 GitHub Actions 标签页中的构建状态
- 等待几分钟，更新可能需要一些时间

### 自定义域名无法访问

- 确认 DNS 记录设置正确
- 确认 CNAME 文件存在且内容正确
- DNS 传播可能需要 24-48 小时

### 页面样式丢失

- 检查路径引用是否正确
- 检查 `_config.yml` 中的 `baseurl` 设置
- 确保主题文件完整

## 高级技巧

### 使用 GitHub Actions 自动化工作流

创建 `.github/workflows/jekyll.yml` 文件：

```yaml
name: 构建并部署 Jekyll 网站

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    
    - name: 设置 Ruby
      uses: ruby/setup-ruby@v1
      with:
        ruby-version: 2.7
        
    - name: 安装依赖
      run: |
        gem install bundler
        bundle install
        
    - name: 构建网站
      run: bundle exec jekyll build
      
    - name: 部署到 GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./_site
```

### 本地开发和预览

1. 安装 Jekyll 和依赖：

```bash
gem install bundler jekyll
bundle install
```

2. 本地运行网站：

```bash
bundle exec jekyll serve
```

3. 在浏览器中访问 `http://localhost:4000` 预览网站

## 总结

GitHub Pages 是一个功能强大且完全免费的静态网站托管服务，结合 Jekyll 和 Git 工作流程，使得创建和维护个人网站变得既简单又专业。通过本文介绍的步骤和技巧，你应该能够轻松地创建自己的 GitHub Pages 网站，并根据需要进行定制和更新。

无论你是想创建个人博客、项目文档还是个人作品集，GitHub Pages 都是一个理想的选择。开始尝试吧！

## 参考资源

- [GitHub Pages 官方文档](https://docs.github.com/cn/pages)
- [Jekyll 官方网站](https://jekyllrb.com/)
- [Markdown 基础语法](https://www.markdownguide.org/basic-syntax/) 