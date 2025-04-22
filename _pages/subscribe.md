---
title: "订阅我的博客"
permalink: /subscribe/
layout: single
author_profile: true
classes: subscribe-page
---

<div class="notice notice--info">
  <h3><i class="fas fa-rss rss-icon"></i> 通过RSS订阅此博客</h3>
  <p>订阅后，您将自动收到我发布的所有新文章的通知，不会错过任何更新。</p>
  <a href="{{ site.url }}{{ site.baseurl }}/feed.xml" class="btn btn--primary"><i class="fas fa-rss"></i> 订阅RSS</a>
</div>

## 什么是RSS？

RSS（简易信息聚合）是一种网络内容聚合技术，允许用户通过RSS阅读器订阅网站内容，无需频繁访问网站即可获取更新。

使用RSS的主要优点：
- **时间效率高**：一次性浏览多个网站的更新
- **无广告**：通常提供干净的阅读体验
- **隐私保护**：不需要注册账号或提供个人信息
- **完全控制**：您决定订阅什么，何时阅读

## 如何订阅

### 第1步：选择RSS阅读器

<div class="app-box">
<h4>网页版阅读器</h4>
<ul>
  <li><a href="https://feedly.com/" target="_blank">Feedly</a> - 最流行的RSS阅读器之一</li>
  <li><a href="https://www.inoreader.com/" target="_blank">Inoreader</a> - 功能强大，支持过滤和规则</li>
  <li><a href="https://www.newsblur.com/" target="_blank">NewsBlur</a> - 带有社交特性的阅读器</li>
  <li><a href="https://feedbin.com/" target="_blank">Feedbin</a> - 干净简洁的界面</li>
</ul>
</div>

<div class="app-box">
<h4>iOS应用</h4>
<ul>
  <li>NetNewsWire - 开源、快速、原生的iOS应用</li>
  <li>Reeder - 优雅的设计和丰富的功能</li>
  <li>Unread - 专注于阅读体验</li>
</ul>
</div>

<div class="app-box">
<h4>Android应用</h4>
<ul>
  <li>Feedly - 跨平台同步</li>
  <li>Palabre - 美观且易用</li>
  <li>FeedMe - 高度可定制的阅读体验</li>
</ul>
</div>

### 第2步：添加订阅源

在您选择的RSS阅读器中，添加以下地址：

```
{{ site.url }}{{ site.baseurl }}/feed.xml
```

大多数阅读器有一个"添加"或"订阅"按钮，点击后粘贴上面的URL即可。

### 第3步：直接订阅

点击下面的按钮直接添加到您的RSS阅读器（部分浏览器和阅读器支持）：

<a href="{{ site.url }}{{ site.baseurl }}/feed.xml" class="btn btn--success btn--large"><i class="fas fa-rss"></i> 立即订阅本博客</a>

<div class="notice notice--success">
<h4>提示</h4>
<p>订阅后，您的RSS阅读器会定期检查更新。每当有新文章发布，它们会自动出现在您的阅读列表中，无需手动访问网站。</p>
</div> 