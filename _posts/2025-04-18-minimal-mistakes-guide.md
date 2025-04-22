---
title: "Minimal Mistakes主题使用指南"
date: 2025-04-18T07:30:00+08:00
categories:
  - 教程
tags:
  - Jekyll
  - Minimal Mistakes
  - 网站搭建
toc: true
toc_label: "目录"
toc_icon: "cog"
---

## Minimal Mistakes主题简介

Minimal Mistakes是一个灵活的双栏Jekyll主题，非常适合个人网站、博客和项目文档。它的设计简洁、响应式，支持多种布局选项，是GitHub上最受欢迎的Jekyll主题之一。本文将详细介绍如何使用Minimal Mistakes主题来打造你的个人网站。

## 主题安装

安装Minimal Mistakes主题有几种方法：

### 方法一：使用GitHub Pages远程主题

这是最简单的方法，只需在`_config.yml`文件中添加：

```yaml
remote_theme: "mmistakes/minimal-mistakes@4.24.0"
```

并确保在`Gemfile`中包含以下插件：

```ruby
gem "jekyll-remote-theme"
gem "jekyll-include-cache"
```

### 方法二：从GitHub克隆

```bash
git clone https://github.com/mmistakes/minimal-mistakes.git
cd minimal-mistakes
```

## 基本配置

### 网站配置

在`_config.yml`文件中设置网站的基本信息：

```yaml
# 网站设置
locale                   : "zh-CN"
title                    : "网站标题"
title_separator          : "-"
subtitle                 : "网站副标题"
name                     : "您的名字"
description              : "网站描述"
url                      : "https://yourdomain.com"
baseurl                  : # 留空或填写子路径
repository               : "username/repo-name"
```

### 作者信息

```yaml
# 作者信息
author:
  name             : "您的名字"
  avatar           : "/assets/images/bio-photo.jpg"
  bio              : "简短的个人介绍"
  location         : "位置"
  email            : "your.email@domain.com"
  links:
    - label: "Email"
      icon: "fas fa-fw fa-envelope-square"
      url: "mailto:your.email@domain.com"
    - label: "GitHub"
      icon: "fab fa-fw fa-github"
      url: "https://github.com/yourusername"
```

### 导航菜单

创建`_data/navigation.yml`文件，添加导航链接：

```yaml
main:
  - title: "首页"
    url: /
  - title: "文章"
    url: /year-archive/
  - title: "分类"
    url: /categories/
  - title: "标签"
    url: /tags/
```

## 布局选项

Minimal Mistakes提供多种布局选项：

1. **默认布局**：`layout: default`
2. **单页布局**：`layout: single`
3. **首页布局**：`layout: home`
4. **归档布局**：`layout: archive`
5. **分类布局**：`layout: categories`
6. **标签布局**：`layout: tags`
7. **集合布局**：`layout: collection`
8. **搜索布局**：`layout: search`
9. **Splash页面**：`layout: splash`

## 文章撰写

### 文章前置元数据

每篇文章开头需要包含YAML前置元数据：

```yaml
---
title: "文章标题"
date: YYYY-MM-DD
categories:
  - 分类
tags:
  - 标签1
  - 标签2
toc: true
toc_label: "目录"
toc_icon: "cog"
---
```

### 特色图片

Minimal Mistakes支持多种特色图片设置：

```yaml
header:
  image: /assets/images/image-name.jpg             # 页面顶部横幅图片
  teaser: /assets/images/teaser-image.jpg          # 列表页面的缩略图
  overlay_image: /assets/images/overlay-image.jpg  # 覆盖图片
  overlay_color: "#333"                            # 覆盖颜色
  overlay_filter: 0.5                              # 透明度滤镜
```

### 目录设置

在文章中添加自动目录：

```yaml
toc: true
toc_label: "目录标题"
toc_icon: "图标名称"  # 使用Font Awesome图标
toc_sticky: true    # 固定目录在页面滚动时
```

## 代码高亮

Minimal Mistakes支持代码高亮，示例：

```ruby
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.
```

## 响应式图片

使用Minimal Mistakes的图片辅助类：

```html
<figure class="half">
  <img src="/assets/images/image-1.jpg">
  <img src="/assets/images/image-2.jpg">
  <figcaption>Caption for the images.</figcaption>
</figure>

<figure class="third">
  <img src="/assets/images/image-1.jpg">
  <img src="/assets/images/image-2.jpg">
  <img src="/assets/images/image-3.jpg">
</figure>
```

## 社交分享

在`_config.yml`中启用社交分享功能：

```yaml
share: true  # 在文章底部显示分享按钮
```

## 定制主题

### 更改皮肤

在`_config.yml`中选择预设皮肤：

```yaml
minimal_mistakes_skin: "default" # "air", "aqua", "contrast", "dark", "dirt", "neon", "mint", "plum", "sunrise"
```

### 自定义CSS

创建`/assets/css/main.scss`文件添加自定义样式：

```scss
---
# Only the main Sass file needs front matter (the dashes are enough)
---

@import "minimal-mistakes";

// 添加您的自定义CSS
.page__title {
  color: #ff0000;
}
```

## 高级功能

### 添加评论系统

在`_config.yml`中配置评论系统：

```yaml
comments:
  provider: "disqus"
  disqus:
    shortname: "your-disqus-shortname"
```

### 添加Google Analytics

在`_config.yml`中添加分析代码：

```yaml
analytics:
  provider: "google-gtag"
  google:
    tracking_id: "UA-XXXXXXXX-X"
    anonymize_ip: false
```

## 常见问题排查

1. **图片不显示**：确保图片路径正确，并检查`baseurl`配置
2. **样式丢失**：确保已添加`jekyll-include-cache`插件
3. **页面布局混乱**：检查文章的YAML前置数据格式是否正确

## 总结

Minimal Mistakes是一个功能强大且灵活的Jekyll主题，适合各种类型的网站。通过本文介绍的配置和技巧，你可以充分利用这个主题的优势，打造出美观且实用的个人网站。

如有更多问题，可参考[官方文档](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/)或在GitHub上提交issue。 