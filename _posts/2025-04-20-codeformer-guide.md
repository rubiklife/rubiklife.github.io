---
title: "CodeFormer使用指南 - 人脸修复的AI工具"
date: 2025-04-20T07:50:00+08:00
categories:
  - AI工具
tags:
  - AI
  - 图像处理
  - 开源
toc: true
toc_label: "目录"
toc_icon: "magic"
---

## CodeFormer 简介

CodeFormer 是一款基于代码本查找 Transformer 的先进 AI 人脸修复工具，发表于 NeurIPS 2022。该工具专门设计用于鲁棒的盲人脸修复，能够处理各种退化类型的人脸图像，包括老照片修复、低分辨率图像增强、人脸着色和修复填充等多种任务。

<svg width="600" height="200" xmlns="http://www.w3.org/2000/svg">
  <style>
    .title { font-family: Arial; font-size: 24px; font-weight: bold; fill: #2C3E50; }
    .subtitle { font-family: Arial; font-size: 16px; fill: #7F8C8D; }
    .logo { font-family: Arial; font-size: 44px; font-weight: bold; fill: #E74C3C; }
    .highlight { fill: #3498DB; }
    .badge { font-family: Arial; font-size: 12px; fill: #FFFFFF; font-weight: bold; }
  </style>
  <rect width="600" height="200" fill="#ECF0F1" rx="12" ry="12" stroke="#BDC3C7" stroke-width="2"/>
  <text x="300" y="70" text-anchor="middle" class="logo">Code<tspan class="highlight">Former</tspan></text>
  <text x="300" y="110" text-anchor="middle" class="title">鲁棒盲人脸修复的代码本查找 Transformer</text>
  <text x="300" y="140" text-anchor="middle" class="subtitle">NeurIPS 2022 | 17.1k ⭐ | 3.6k Forks</text>
  
  <!-- NeurIPS 2022 徽章 -->
  <rect x="180" y="160" width="80" height="25" fill="#E74C3C" rx="12" ry="12"/>
  <text x="220" y="177" text-anchor="middle" class="badge">NeurIPS 2022</text>
  
  <!-- GitHub 徽章 -->
  <rect x="280" y="160" width="80" height="25" fill="#2ECC71" rx="12" ry="12"/>
  <text x="320" y="177" text-anchor="middle" class="badge">17.1k ⭐</text>
  
  <!-- Open Source 徽章 -->
  <rect x="380" y="160" width="80" height="25" fill="#3498DB" rx="12" ry="12"/>
  <text x="420" y="177" text-anchor="middle" class="badge">开源免费</text>
</svg>

## 核心技术架构

CodeFormer 采用了创新的技术架构，结合了 Transformer 和代码本查找机制，实现了高质量的人脸修复效果：

### 关键技术组件

1. **代码本查找 Transformer**：使用离散代码表示人脸特征
2. **盲修复机制**：无需已知退化类型即可进行修复
3. **保真度控制**：通过权重参数平衡质量和保真度
4. **多任务支持**：统一框架支持多种人脸处理任务

<svg width="600" height="350" xmlns="http://www.w3.org/2000/svg">
  <style>
    .tech-box { fill: white; stroke: #34495E; stroke-width: 2; rx: 10; ry: 10; }
    .tech-title { font-family: Arial; font-size: 16px; font-weight: bold; fill: #2C3E50; text-anchor: middle; }
    .tech-desc { font-family: Arial; font-size: 12px; fill: #7F8C8D; text-anchor: middle; }
    .arrow { stroke: #E74C3C; stroke-width: 3; fill: none; marker-end: url(#arrowhead); }
    .tech-label { font-family: Arial; font-size: 14px; font-weight: bold; fill: #E74C3C; }
    .flow-text { font-family: Arial; font-size: 11px; fill: #34495E; text-anchor: middle; }
  </style>
  
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#E74C3C" />
    </marker>
  </defs>
  
  <!-- 输入图像 -->
  <rect x="30" y="50" width="100" height="80" class="tech-box"/>
  <text x="80" y="75" class="tech-title">输入图像</text>
  <text x="80" y="95" class="tech-desc">退化的</text>
  <text x="80" y="110" class="tech-desc">人脸图像</text>
  <text x="80" y="125" style="font-size: 20px;">📷</text>
  
  <!-- Encoder -->
  <rect x="180" y="50" width="100" height="80" class="tech-box"/>
  <text x="230" y="75" class="tech-label">编码器</text>
  <text x="230" y="95" class="tech-desc">特征</text>
  <text x="230" y="110" class="tech-desc">提取</text>
  
  <!-- 代码本查找 -->
  <rect x="330" y="50" width="100" height="80" class="tech-box"/>
  <text x="380" y="75" class="tech-label">代码本</text>
  <text x="380" y="95" class="tech-desc">查找</text>
  <text x="380" y="110" class="tech-desc">机制</text>
  
  <!-- Transformer -->
  <rect x="480" y="50" width="100" height="80" class="tech-box"/>
  <text x="530" y="75" class="tech-label">Transformer</text>
  <text x="530" y="95" class="tech-desc">特征</text>
  <text x="530" y="110" class="tech-desc">融合</text>
  
  <!-- Decoder -->
  <rect x="180" y="180" width="100" height="80" class="tech-box"/>
  <text x="230" y="205" class="tech-label">解码器</text>
  <text x="230" y="225" class="tech-desc">图像</text>
  <text x="230" y="240" class="tech-desc">重建</text>
  
  <!-- 保真度控制 -->
  <rect x="330" y="180" width="100" height="80" class="tech-box"/>
  <text x="380" y="205" class="tech-label">保真度控制</text>
  <text x="380" y="225" class="tech-desc">权重 w</text>
  <text x="380" y="240" class="tech-desc">[0, 1]</text>
  
  <!-- 输出图像 -->
  <rect x="480" y="180" width="100" height="80" class="tech-box"/>
  <text x="530" y="205" class="tech-title">输出图像</text>
  <text x="530" y="225" class="tech-desc">高质量</text>
  <text x="530" y="240" class="tech-desc">修复结果</text>
  <text x="530" y="255" style="font-size: 20px;">✨</text>
  
  <!-- 连接箭头 -->
  <path d="M130 90 L180 90" class="arrow" />
  <path d="M280 90 L330 90" class="arrow" />
  <path d="M430 90 L480 90" class="arrow" />
  <path d="M530 130 L530 180" class="arrow" />
  <path d="M430 220 L480 220" class="arrow" />
  <path d="M330 220 L280 220" class="arrow" />
  <path d="M230 180 L230 130" class="arrow" />
  
  <!-- 流程标注 -->
  <text x="155" y="85" class="flow-text">编码</text>
  <text x="305" y="85" class="flow-text">查找</text>
  <text x="455" y="85" class="flow-text">融合</text>
  <text x="545" y="160" class="flow-text">重建</text>
  <text x="455" y="215" class="flow-text">控制</text>
  <text x="305" y="215" class="flow-text">平衡</text>
  <text x="245" y="160" class="flow-text">解码</text>
</svg>

## 主要功能特性

CodeFormer 提供了全面的人脸处理功能，满足不同场景的需求：

- **🎯 人脸修复**：修复低质量、模糊或损坏的人脸图像
- **🎨 人脸着色**：为黑白或褪色照片添加自然色彩
- **🖌️ 人脸修复填充**：修复被遮挡或缺失的人脸区域
- **📹 视频增强**：支持视频文件的逐帧人脸修复
- **🖼️ 整体图像增强**：结合背景增强功能
- **⚙️ 保真度控制**：灵活调节修复强度和原始特征保持

<svg width="600" height="320" xmlns="http://www.w3.org/2000/svg">
  <style>
    .feature-card { fill: #FFFFFF; stroke: #BDC3C7; stroke-width: 2; rx: 8; ry: 8; }
    .feature-icon { font-size: 28px; text-anchor: middle; }
    .feature-title { font-family: Arial; font-size: 14px; font-weight: bold; fill: #2C3E50; text-anchor: middle; }
    .feature-desc { font-family: Arial; font-size: 11px; fill: #7F8C8D; text-anchor: middle; }
    .center-circle { fill: #E74C3C; stroke: #C0392B; stroke-width: 3; }
    .center-text { font-family: Arial; font-size: 16px; font-weight: bold; fill: white; text-anchor: middle; }
    .connector { stroke: #95A5A6; stroke-width: 2; stroke-dasharray: 4,4; }
  </style>
  
  <!-- 中心圆 -->
  <circle cx="300" cy="160" r="40" class="center-circle"/>
  <text x="300" y="155" class="center-text">CodeFormer</text>
  <text x="300" y="170" class="center-text">核心功能</text>
  
  <!-- 功能卡片 -->
  <!-- 人脸修复 -->
  <rect x="80" y="40" width="120" height="80" class="feature-card"/>
  <text x="140" y="65" class="feature-icon">🎯</text>
  <text x="140" y="85" class="feature-title">人脸修复</text>
  <text x="140" y="100" class="feature-desc">修复低质量</text>
  <text x="140" y="110" class="feature-desc">损坏人脸</text>
  
  <!-- 人脸着色 -->
  <rect x="400" y="40" width="120" height="80" class="feature-card"/>
  <text x="460" y="65" class="feature-icon">🎨</text>
  <text x="460" y="85" class="feature-title">人脸着色</text>
  <text x="460" y="100" class="feature-desc">黑白照片</text>
  <text x="460" y="110" class="feature-desc">智能上色</text>
  
  <!-- 修复填充 -->
  <rect x="80" y="200" width="120" height="80" class="feature-card"/>
  <text x="140" y="225" class="feature-icon">🖌️</text>
  <text x="140" y="245" class="feature-title">修复填充</text>
  <text x="140" y="260" class="feature-desc">遮挡区域</text>
  <text x="140" y="270" class="feature-desc">智能填充</text>
  
  <!-- 视频增强 -->
  <rect x="400" y="200" width="120" height="80" class="feature-card"/>
  <text x="460" y="225" class="feature-icon">📹</text>
  <text x="460" y="245" class="feature-title">视频增强</text>
  <text x="460" y="260" class="feature-desc">逐帧处理</text>
  <text x="460" y="270" class="feature-desc">视频修复</text>
  
  <!-- 整体增强 -->
  <rect x="240" y="40" width="120" height="80" class="feature-card"/>
  <text x="300" y="65" class="feature-icon">🖼️</text>
  <text x="300" y="85" class="feature-title">整体增强</text>
  <text x="300" y="100" class="feature-desc">背景增强</text>
  <text x="300" y="110" class="feature-desc">完整处理</text>
  
  <!-- 保真度控制 -->
  <rect x="240" y="200" width="120" height="80" class="feature-card"/>
  <text x="300" y="225" class="feature-icon">⚙️</text>
  <text x="300" y="245" class="feature-title">保真度控制</text>
  <text x="300" y="260" class="feature-desc">权重调节</text>
  <text x="300" y="270" class="feature-desc">灵活平衡</text>
  
  <!-- 连接线 -->
  <path d="M260 160 L200 80" class="connector" />
  <path d="M340 160 L400 80" class="connector" />
  <path d="M300 120 L300 100" class="connector" />
  <path d="M260 160 L200 240" class="connector" />
  <path d="M340 160 L400 240" class="connector" />
  <path d="M300 200 L300 220" class="connector" />
</svg>

## 安装与环境配置

### 系统要求

- **Python**: 3.8 或更高版本  
- **PyTorch**: ≥ 1.7.1
- **CUDA**: ≥ 10.1（GPU 加速推荐）
- **系统内存**: 建议 16GB 以上
- **GPU 显存**: 建议 8GB 以上

### 安装步骤

<svg width="600" height="420" xmlns="http://www.w3.org/2000/svg">
  <style>
    .install-card { fill: #F8F9FA; stroke: #34495E; stroke-width: 2; rx: 10; ry: 10; }
    .step-number { font-family: Arial; font-size: 28px; font-weight: bold; fill: #E74C3C; }
    .step-title { font-family: Arial; font-size: 16px; font-weight: bold; fill: #2C3E50; }
    .step-desc { font-family: Arial; font-size: 12px; fill: #7F8C8D; }
    .code-text { font-family: monospace; font-size: 10px; fill: #27AE60; }
    .install-arrow { stroke: #3498DB; stroke-width: 3; fill: none; marker-end: url(#install-arrow); }
  </style>
  
  <defs>
    <marker id="install-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#3498DB" />
    </marker>
  </defs>
  
  <!-- 步骤1: 克隆仓库 -->
  <rect x="50" y="30" width="500" height="70" class="install-card"/>
  <text x="80" y="55" class="step-number">1</text>
  <text x="110" y="55" class="step-title">克隆 GitHub 仓库</text>
  <text x="110" y="75" class="code-text">git clone https://github.com/sczhou/CodeFormer</text>
  <text x="110" y="87" class="code-text">cd CodeFormer</text>
  
  <!-- 步骤2: 创建环境 -->
  <rect x="50" y="120" width="500" height="70" class="install-card"/>
  <text x="80" y="145" class="step-number">2</text>
  <text x="110" y="145" class="step-title">创建 Conda 环境</text>
  <text x="110" y="165" class="code-text">conda create -n codeformer python=3.8 -y</text>
  <text x="110" y="177" class="code-text">conda activate codeformer</text>
  
  <!-- 步骤3: 安装依赖 -->
  <rect x="50" y="210" width="500" height="70" class="install-card"/>
  <text x="80" y="235" class="step-number">3</text>
  <text x="110" y="235" class="step-title">安装 Python 依赖</text>
  <text x="110" y="255" class="code-text">pip3 install -r requirements.txt</text>
  <text x="110" y="267" class="code-text">python basicsr/setup.py develop</text>
  
  <!-- 步骤4: 下载模型 -->
  <rect x="50" y="300" width="500" height="70" class="install-card"/>
  <text x="80" y="325" class="step-number">4</text>
  <text x="110" y="325" class="step-title">下载预训练模型</text>
  <text x="110" y="345" class="code-text">python scripts/download_pretrained_models.py facelib</text>
  <text x="110" y="357" class="code-text">python scripts/download_pretrained_models.py CodeFormer</text>
  
  <!-- 步骤5: 验证安装 -->
  <rect x="50" y="390" width="500" height="25" class="install-card"/>
  <text x="80" y="405" class="step-number">5</text>
  <text x="110" y="405" class="step-title">验证安装完成</text>
  
  <!-- 流程箭头 -->
  <path d="M300 100 L300 120" class="install-arrow" />
  <path d="M300 190 L300 210" class="install-arrow" />
  <path d="M300 280 L300 300" class="install-arrow" />
  <path d="M300 370 L300 390" class="install-arrow" />
</svg>

### 可选安装（人脸检测增强）

如果需要使用 dlib 进行更精确的人脸检测：

```bash
# 安装 dlib（可选，用于更精确的人脸检测）
conda install -c conda-forge dlib

# 下载 dlib 模型
python scripts/download_pretrained_models.py dlib
```

## 使用方法详解

### 基本使用语法

CodeFormer 提供了多个推理脚本，针对不同的任务场景：

```bash
# 基本语法
python inference_codeformer.py [选项]
```

### 人脸修复

#### 1. 裁剪对齐的人脸修复（推荐用于性能对比）

```bash
# 处理 512x512 的裁剪对齐人脸
python inference_codeformer.py -w 0.5 --has_aligned --input_path [图像文件夹]|[图像路径]
```

#### 2. 整体图像修复

```bash
# 处理完整图像
python inference_codeformer.py -w 0.7 --input_path [图像文件夹]|[图像路径]

# 增强背景区域
python inference_codeformer.py -w 0.7 --bg_upsampler realesrgan --input_path [图像路径]

# 进一步提升人脸分辨率
python inference_codeformer.py -w 0.7 --bg_upsampler realesrgan --face_upsample --input_path [图像路径]
```

### 保真度权重详解

保真度权重 `w` 是 CodeFormer 最重要的参数，控制修复质量和原始特征保持的平衡：

<svg width="600" height="280" xmlns="http://www.w3.org/2000/svg">
  <style>
    .weight-scale { fill: none; stroke: #34495E; stroke-width: 3; }
    .weight-point { fill: #E74C3C; stroke: #C0392B; stroke-width: 2; }
    .weight-text { font-family: Arial; font-size: 12px; fill: #2C3E50; text-anchor: middle; }
    .weight-label { font-family: Arial; font-size: 14px; font-weight: bold; fill: #E74C3C; }
    .weight-desc { font-family: Arial; font-size: 11px; fill: #7F8C8D; text-anchor: middle; }
    .scale-bg { fill: #ECF0F1; stroke: #BDC3C7; stroke-width: 1; rx: 5; ry: 5; }
  </style>
  
  <!-- 背景框 -->
  <rect x="30" y="30" width="540" height="220" class="scale-bg"/>
  
  <!-- 标题 -->
  <text x="300" y="55" class="weight-label" text-anchor="middle">保真度权重 (w) 控制参数</text>
  
  <!-- 权重刻度线 -->
  <line x1="80" y1="120" x2="520" y2="120" class="weight-scale"/>
  
  <!-- 权重点标记 -->
  <circle cx="80" cy="120" r="8" class="weight-point"/>
  <text x="80" y="145" class="weight-text">0.0</text>
  <text x="80" y="160" class="weight-desc">最高质量</text>
  <text x="80" y="172" class="weight-desc">可能改变特征</text>
  
  <circle cx="190" cy="120" r="8" class="weight-point"/>
  <text x="190" y="145" class="weight-text">0.3</text>
  <text x="190" y="160" class="weight-desc">高质量修复</text>
  <text x="190" y="172" class="weight-desc">适合严重退化</text>
  
  <circle cx="300" cy="120" r="10" fill="#27AE60" stroke="#229954" stroke-width="2"/>
  <text x="300" y="145" class="weight-text">0.5-0.7</text>
  <text x="300" y="160" class="weight-desc">推荐范围</text>
  <text x="300" y="172" class="weight-desc">平衡质量和保真</text>
  
  <circle cx="410" cy="120" r="8" class="weight-point"/>
  <text x="410" y="145" class="weight-text">0.8</text>
  <text x="410" y="160" class="weight-desc">高保真度</text>
  <text x="410" y="172" class="weight-desc">保持原始特征</text>
  
  <circle cx="520" cy="120" r="8" class="weight-point"/>
  <text x="520" y="145" class="weight-text">1.0</text>
  <text x="520" y="160" class="weight-desc">最高保真</text>
  <text x="520" y="172" class="weight-desc">最小修改</text>
  
  <!-- 箭头指示 -->
  <polygon points="80,100 300,100 295,95 300,100 295,105" fill="#3498DB" opacity="0.7"/>
  <text x="190" y="95" class="weight-desc">更高质量</text>
  
  <polygon points="520,100 300,100 305,95 300,100 305,105" fill="#E67E22" opacity="0.7"/>
  <text x="410" y="95" class="weight-desc">更高保真</text>
  
  <!-- 使用场景推荐 -->
  <text x="80" y="210" class="weight-desc">老照片修复</text>
  <text x="190" y="210" class="weight-desc">严重模糊</text>
  <text x="300" y="210" class="weight-desc">一般修复</text>
  <text x="410" y="210" class="weight-desc">轻微增强</text>
  <text x="520" y="210" class="weight-desc">身份保持</text>
</svg>

### 视频处理

CodeFormer 支持视频文件的逐帧处理：

```bash
# 安装 ffmpeg（Windows/Mac 用户）
conda install -c conda-forge ffmpeg

# 处理视频文件
python inference_codeformer.py --bg_upsampler realesrgan --face_upsample -w 1.0 --input_path [视频路径]
```

**支持的视频格式**：`.mp4`、`.mov`、`.avi`

### 人脸着色

专门用于黑白或褪色照片的着色处理：

```bash
# 对裁剪对齐的人脸进行着色
python inference_colorization.py --input_path [图像文件夹]|[图像路径]
```

### 人脸修复填充

修复被遮挡或损坏的人脸区域：

```bash
# 修复被白色画笔遮挡的区域
python inference_inpainting.py --input_path [图像文件夹]|[图像路径]
```

**提示**：可以使用图像编辑软件（如 Photoshop）用白色画笔标记需要修复的区域。

## 高级功能与技巧

### 批量处理优化

<svg width="600" height="250" xmlns="http://www.w3.org/2000/svg">
  <style>
    .optimization-box { fill: #E8F6FF; stroke: #3498DB; stroke-width: 2; rx: 8; ry: 8; }
    .tip-title { font-family: Arial; font-size: 14px; font-weight: bold; fill: #2980B9; }
    .tip-text { font-family: Arial; font-size: 12px; fill: #34495E; }
    .tip-icon { font-size: 16px; }
  </style>
  
  <!-- 性能优化提示 -->
  <rect x="30" y="20" width="540" height="210" class="optimization-box"/>
  <text x="50" y="45" class="tip-title">🚀 批量处理优化建议</text>
  
  <text x="50" y="70" class="tip-icon">💻</text>
  <text x="75" y="70" class="tip-text">GPU 加速：使用 CUDA 兼容显卡可显著提升处理速度</text>
  
  <text x="50" y="90" class="tip-icon">📁</text>
  <text x="75" y="90" class="tip-text">批量处理：将图像放入文件夹，使用文件夹路径进行批量处理</text>
  
  <text x="50" y="110" class="tip-icon">🎯</text>
  <text x="75" y="110" class="tip-text">人脸预处理：使用 crop_align_face.py 预处理可提高效果</text>
  
  <text x="50" y="130" class="tip-icon">⚙️</text>
  <text x="75" y="130" class="tip-text">参数调优：根据图像类型选择合适的 w 值</text>
  
  <text x="50" y="150" class="tip-icon">💾</text>
  <text x="75" y="150" class="tip-text">存储空间：确保有足够空间存储处理结果</text>
  
  <text x="50" y="170" class="tip-icon">🔄</text>
  <text x="75" y="170" class="tip-text">中断恢复：大批量处理建议分批进行，避免意外中断</text>
  
  <text x="50" y="190" class="tip-icon">📊</text>
  <text x="75" y="190" class="tip-text">质量检查：处理完成后建议人工检查关键结果</text>
  
  <text x="50" y="210" class="tip-icon">🎬</text>
  <text x="75" y="210" class="tip-text">视频处理：长视频建议先测试短片段确定最佳参数</text>
</svg>

### 人脸预处理

对于获得最佳效果，建议先进行人脸裁剪和对齐：

```bash
# 安装 dlib（如果尚未安装）
conda install -c conda-forge dlib

# 裁剪对齐人脸
python scripts/crop_align_face.py -i [输入文件夹] -o [输出文件夹]
```

### 在线体验平台

CodeFormer 已集成到多个在线平台，方便快速体验：

- **🤗 Hugging Face**: [在线演示](https://huggingface.co/spaces/sczhou/CodeFormer)
- **🚀 Replicate**: [API 接口](https://replicate.com/sczhou/codeformer)
- **🐼 OpenXLab**: [在线体验](https://openxlab.org.cn/apps)
- **📓 Google Colab**: 提供 Jupyter Notebook 体验

## 常见问题解决

### 安装相关问题

<svg width="600" height="300" xmlns="http://www.w3.org/2000/svg">
  <style>
    .problem-card { fill: #FDEBEE; stroke: #E74C3C; stroke-width: 2; rx: 8; ry: 8; }
    .solution-card { fill: #EAFAF1; stroke: #27AE60; stroke-width: 2; rx: 8; ry: 8; }
    .problem-title { font-family: Arial; font-size: 14px; font-weight: bold; fill: #C0392B; }
    .solution-title { font-family: Arial; font-size: 14px; font-weight: bold; fill: #229954; }
    .qa-text { font-family: Arial; font-size: 12px; fill: #2C3E50; }
    .code-fix { font-family: monospace; font-size: 11px; fill: #8E44AD; }
  </style>
  
  <!-- 问题1 -->
  <rect x="30" y="20" width="540" height="80" class="problem-card"/>
  <text x="50" y="40" class="problem-title">❌ 模型下载失败</text>
  <text x="50" y="60" class="qa-text">现象：download_pretrained_models.py 脚本执行失败</text>
  <text x="50" y="75" class="qa-text">解决：检查网络连接，或手动从 GitHub Releases 下载模型文件</text>
  <text x="50" y="90" class="code-fix">wget [模型下载链接] -P weights/CodeFormer/</text>
  
  <!-- 问题2 -->
  <rect x="30" y="120" width="540" height="80" class="problem-card"/>
  <text x="50" y="140" class="problem-title">❌ CUDA 相关错误</text>
  <text x="50" y="160" class="qa-text">现象：GPU 加速无法使用或 CUDA 版本不兼容</text>
  <text x="50" y="175" class="qa-text">解决：检查 CUDA 和 PyTorch 版本匹配性，或使用 CPU 模式</text>
  <text x="50" y="190" class="code-fix">pip install torch torchvision --index-url https://download.pytorch.org/whl/cpu</text>
  
  <!-- 问题3 -->
  <rect x="30" y="220" width="540" height="60" class="problem-card"/>
  <text x="50" y="240" class="problem-title">❌ 内存不足错误</text>
  <text x="50" y="260" class="qa-text">现象：处理大图像时出现 OOM (Out of Memory) 错误</text>
  <text x="50" y="275" class="qa-text">解决：使用较小的图像尺寸，或增加虚拟内存设置</text>
</svg>

### 效果优化问题

- **人脸检测失败**：尝试调整图像亮度对比度，或使用更清晰的图像
- **修复效果不自然**：调整 `w` 值，尝试不同的权重设置
- **处理速度慢**：启用 GPU 加速，或使用更小的图像尺寸

## 训练自定义模型

CodeFormer 支持使用自定义数据集进行训练。详细的训练指南请参考：

- **英文文档**: [Training Guide](https://github.com/sczhou/CodeFormer/blob/master/docs/README.md)
- **中文文档**: [训练指南](https://github.com/sczhou/CodeFormer/blob/master/docs/README_CN.md)

基本训练命令：

```bash
# 准备训练数据
python scripts/prepare_data.py --input_dir [原始数据] --output_dir [处理后数据]

# 开始训练
python basicsr/train.py -opt options/train_codeformer.yml
```

## 技术细节与原理

### 代码本查找机制

CodeFormer 的核心创新在于使用离散代码本来表示人脸特征：

1. **代码本构建**：通过 VQ-VAE 训练得到离散的代码向量
2. **特征查找**：将退化特征映射到最近的代码向量
3. **特征融合**：使用 Transformer 融合查找到的特征
4. **图像重建**：解码器生成最终的修复结果

### 盲修复能力

"盲修复"意味着 CodeFormer 无需事先知道图像的退化类型（模糊、噪声、压缩等），能够自动适应各种退化情况。

## 应用案例与实践

### 老照片修复项目

1. **预处理**：使用图像编辑软件修复明显的物理损伤
2. **人脸修复**：使用 CodeFormer 修复人脸区域（推荐 w=0.6-0.7）
3. **整体优化**：结合背景增强功能处理整体图像
4. **后处理**：调整色彩平衡和对比度

### 视频会议画质提升

虽然 CodeFormer 主要针对静态图像，但也可以用于视频处理：

1. **实时处理**：需要高性能 GPU 支持
2. **批量处理**：先录制视频，后处理优化
3. **选择性处理**：只处理关键帧或人脸区域

## 总结

CodeFormer 作为一款基于最新研究成果的人脸修复工具，具有以下显著优势：

- **🔬 技术先进**：基于 NeurIPS 2022 论文的代码本查找 Transformer
- **🎯 修复精确**：盲修复机制适应各种退化类型
- **🎨 功能全面**：支持修复、着色、填充等多种任务
- **⚙️ 控制灵活**：保真度权重提供精细控制
- **🚀 性能优秀**：GPU 加速支持和批量处理能力
- **🌍 易于访问**：多平台在线体验和开源代码

通过本指南，您应该能够成功安装和使用 CodeFormer 来处理各种人脸修复任务。无论是修复珍贵的老照片，还是提升视频质量，CodeFormer 都能提供令人满意的结果。

## 相关资源

- **[GitHub 仓库](https://github.com/sczhou/CodeFormer)** - 源代码和最新更新
- **[项目主页](https://shangchenzhou.com/projects/CodeFormer/)** - 官方项目页面
- **[论文地址](https://arxiv.org/abs/2206.11253)** - NeurIPS 2022 原始论文
- **[在线演示](https://huggingface.co/spaces/sczhou/CodeFormer)** - Hugging Face 在线体验
- **[视频介绍](https://youtu.be/d3VDpLlWXYw)** - 项目演示视频 