---
title: "Jekyll 博客中使用 Mermaid 图表指南"
date: 2025-01-20T10:00:00+08:00
categories: [Jekyll, 教程]
tags: [jekyll, mermaid, 图表, 配置]
mermaid: true
---

# Jekyll 博客中使用 Mermaid 图表指南

本文介绍如何在Jekyll博客中通过配置`_config.yml`来支持Mermaid图表。

## 配置方法

### 1. 在 `_config.yml` 中添加配置

```yaml
# Mermaid配置
mermaid:
  enabled: false  # 全局禁用，在需要的页面单独启用
  version: "10.6.1"  # CDN版本
  theme: "default"  # 主题
```

### 2. 在文章的 Front Matter 中启用

在需要使用Mermaid的文章开头添加：

```yaml
---
title: "您的文章标题"
mermaid: true
---
```

## 图表示例

### 流程图

```mermaid
graph TD
    A[开始] --> B{条件判断}
    B -->|是| C[执行操作A]
    B -->|否| D[执行操作B]
    C --> E[结束]
    D --> E
```

### 序列图

```mermaid
sequenceDiagram
    participant U as 用户
    participant B as 浏览器
    participant S as 服务器
    
    U->>B: 发起请求
    B->>S: 转发请求
    S-->>B: 返回响应
    B-->>U: 显示结果
```

### 甘特图

```mermaid
gantt
    title 项目进度计划
    dateFormat  YYYY-MM-DD
    section 设计阶段
    需求分析     :done,    des1, 2024-01-01, 2024-01-05
    界面设计     :active,  des2, 2024-01-06, 2024-01-10
    section 开发阶段
    前端开发     :         dev1, 2024-01-11, 2024-01-20
    后端开发     :         dev2, 2024-01-15, 2024-01-25
    section 测试阶段
    功能测试     :         test1, 2024-01-21, 2024-01-28
    性能测试     :         test2, 2024-01-25, 2024-01-30
```

### 类图

```mermaid
classDiagram
    class Vehicle {
        +String brand
        +String model
        +int year
        +start()
        +stop()
    }
    
    class Car {
        +int doors
        +String fuelType
        +drive()
    }
    
    class Motorcycle {
        +boolean hasSidecar
        +ride()
    }
    
    Vehicle <|-- Car
    Vehicle <|-- Motorcycle
```

## 主要特性

1. **按需加载**：只在设置了 `mermaid: true` 的页面加载相关脚本
2. **响应式设计**：图表自动适配不同屏幕尺寸
3. **主题配置**：可通过 `_config.yml` 自定义主题
4. **版本控制**：可指定特定的Mermaid版本

## 注意事项

1. 在文章的 Front Matter 中添加 `mermaid: true`
2. 使用 ````mermaid` 代码块语法
3. 确保 Mermaid 语法正确
4. 图表会自动居中显示并添加边框样式

现在您可以在Jekyll博客中轻松使用Mermaid图表了！ 