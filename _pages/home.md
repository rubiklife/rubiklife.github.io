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