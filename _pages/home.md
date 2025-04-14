---
layout: splash
permalink: /home/
header:
  overlay_color: "#5e616c"
  overlay_image: /assets/images/header-bg.jpg
  actions:
    - label: "开始阅读"
      url: "/year-archive/"
excerpt: >
  个人技术博客，分享我的学习心得和经验。<br />
  <small>基于 Minimal Mistakes Jekyll 主题</small>
feature_row:
  - image_path: /assets/images/feature-1.jpg
    alt: "最新文章"
    title: "最新文章"
    excerpt: "查看我最近发布的文章和分享的想法。"
    url: "/year-archive/"
    btn_class: "btn--primary"
    btn_label: "了解更多"
  - image_path: /assets/images/feature-2.jpg
    alt: "文章分类"
    title: "文章分类"
    excerpt: "按主题浏览不同类别的文章和内容。"
    url: "/categories/"
    btn_class: "btn--primary"
    btn_label: "查看分类"
  - image_path: /assets/images/feature-3.jpg
    alt: "项目展示"
    title: "项目展示"
    excerpt: "查看我的项目案例和相关详细信息。"
    url: "/projects/"
    btn_class: "btn--primary"
    btn_label: "查看项目"
---

{% include feature_row %}

## 最新文章

<div class="grid__wrapper">
  {% assign posts = site.posts | sort: 'date' | reverse %}
  {% for post in posts limit:4 %}
    {% include archive-single.html type="grid" %}
  {% endfor %}
</div>

<a href="/year-archive/" class="btn btn--primary">查看全部文章</a>

## 关于我

简短的自我介绍，您可以在这里添加一些个人信息，包括您的专业、兴趣和技能等。

[了解更多](/about/){: .btn .btn--primary} 