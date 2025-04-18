---
layout: splash
permalink: /home/
header:
  overlay_color: "#5e616c"
  overlay_image: /assets/images/header-bg.png
  actions:
    - label: "开始阅读"
      url: "/year-archive/"
excerpt: >
  个人技术博客，分享我的学习心得和经验。<br />
  <small>基于 Minimal Mistakes Jekyll 主题</small>
---

## 最新文章

<div class="grid__wrapper">
  {% assign posts = site.posts | sort: 'date' | reverse %}
  {% for post in posts limit:4 %}
    {% include archive-single.html type="grid" %}
  {% endfor %}
</div>

<a href="/year-archive/" class="btn btn--primary">查看全部文章</a> 