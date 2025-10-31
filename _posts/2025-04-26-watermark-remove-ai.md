---
title: "WatermarkRemover使用指南 - AI智能水印移除工具"
date: 2025-04-26T06:15:00+08:00
categories:
  - AI工具
tags:
  - AI
  - 工具
toc: true
toc_label: "目录"
toc_icon: "eraser"
---

## WatermarkRemover-AI 简介

WatermarkRemover-AI 是一款先进的AI驱动水印移除工具，利用微软的 Florence-2 模型进行精确的水印检测，结合 LaMA (Large Mask Aware) 模型实现高质量的图像修复。该工具提供了用户友好的 PyQt6 图形界面和强大的命令行接口，能够有效移除图像中的水印，同时保持图像的自然外观。

<svg width="600" height="200" xmlns="http://www.w3.org/2000/svg">
  <style>
    .title { font-family: Arial; font-size: 24px; font-weight: bold; fill: #333; }
    .subtitle { font-family: Arial; font-size: 16px; fill: #666; }
    .logo { font-family: Arial; font-size: 42px; font-weight: bold; fill: #E74C3C; }
    .highlight { fill: #3498DB; }
  </style>
  <rect width="600" height="200" fill="#f8f9fa" rx="12" ry="12" stroke="#dee2e6" stroke-width="2"/>
  <text x="300" y="70" text-anchor="middle" class="logo">WatermarkRemover-<tspan class="highlight">AI</tspan></text>
  <text x="300" y="110" text-anchor="middle" class="title">AI驱动的智能水印移除工具</text>
  <text x="300" y="140" text-anchor="middle" class="subtitle">基于 Florence-2 + LaMA 的先进图像处理技术</text>
</svg>

## 技术架构与工作原理

WatermarkRemover-AI 采用两阶段处理流程，结合了最先进的计算机视觉技术：

### 第一阶段：Florence-2 水印检测

Florence-2 是微软开发的开放词汇目标检测模型，能够准确识别图像中的水印区域并生成精确的边界框。

### 第二阶段：LaMA 图像修复

LaMA 模型使用上下文感知的修复算法，能够自然地填充被移除的水印区域，确保修复后的图像看起来完全自然。

<svg width="600" height="320" xmlns="http://www.w3.org/2000/svg">
  <style>
    .process-box { fill: white; stroke: #34495e; stroke-width: 2; rx: 10; ry: 10; }
    .process-title { font-family: Arial; font-size: 16px; font-weight: bold; fill: #2c3e50; text-anchor: middle; }
    .process-desc { font-family: Arial; font-size: 12px; fill: #7f8c8d; text-anchor: middle; }
    .arrow { stroke: #e74c3c; stroke-width: 3; fill: none; marker-end: url(#arrowhead); }
    .model-label { font-family: Arial; font-size: 14px; font-weight: bold; fill: #3498db; }
  </style>
  
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#e74c3c" />
    </marker>
  </defs>
  
  <!-- 输入图像 -->
  <rect x="50" y="50" width="120" height="100" class="process-box"/>
  <text x="110" y="85" class="process-title">输入图像</text>
  <text x="110" y="105" class="process-desc">包含水印的</text>
  <text x="110" y="120" class="process-desc">原始图像</text>
  <text x="110" y="135" class="process-desc">🖼️</text>
  
  <!-- Florence-2 检测 -->
  <rect x="220" y="50" width="120" height="100" class="process-box"/>
  <text x="280" y="75" class="model-label">Florence-2</text>
  <text x="280" y="95" class="process-title">水印检测</text>
  <text x="280" y="115" class="process-desc">开放词汇</text>
  <text x="280" y="130" class="process-desc">目标检测</text>
  
  <!-- LaMA 修复 -->
  <rect x="390" y="50" width="120" height="100" class="process-box"/>
  <text x="450" y="75" class="model-label">LaMA</text>
  <text x="450" y="95" class="process-title">图像修复</text>
  <text x="450" y="115" class="process-desc">上下文感知</text>
  <text x="450" y="130" class="process-desc">内容填充</text>
  
  <!-- 输出图像 -->
  <rect x="240" y="190" width="120" height="100" class="process-box"/>
  <text x="300" y="225" class="process-title">输出图像</text>
  <text x="300" y="245" class="process-desc">无水印的</text>
  <text x="300" y="260" class="process-desc">清洁图像</text>
  <text x="300" y="275" class="process-desc">✨</text>
  
  <!-- 连接箭头 -->
  <path d="M170 100 L220 100" class="arrow" />
  <path d="M340 100 L390 100" class="arrow" />
  <path d="M450 150 L300 190" class="arrow" />
  
  <!-- 处理步骤标注 -->
  <text x="195" y="85" text-anchor="middle" style="font-size: 12px; fill: #e74c3c;">步骤1</text>
  <text x="365" y="85" text-anchor="middle" style="font-size: 12px; fill: #e74c3c;">步骤2</text>
</svg>

## 核心功能特性

WatermarkRemover-AI 提供了丰富的功能，满足不同用户的需求：

- **🎯 精确检测**：基于 Florence-2 的开放词汇检测技术
- **🎨 无缝修复**：LaMA 模型提供上下文感知的图像修复
- **⚡ 双重界面**：支持 GUI 和 CLI 两种操作方式
- **📁 批量处理**：支持单张图像和整个目录的批量处理
- **🔧 自定义选项**：可配置边界框大小、透明度和输出格式
- **🚀 GPU 加速**：支持 CUDA GPU 加速处理
- **🌙 深色模式**：GUI 自动适应系统深色模式设置

<svg width="600" height="300" xmlns="http://www.w3.org/2000/svg">
  <style>
    .feature-card { fill: #ffffff; stroke: #bdc3c7; stroke-width: 2; rx: 8; ry: 8; }
    .feature-icon { font-size: 24px; text-anchor: middle; }
    .feature-title { font-family: Arial; font-size: 14px; font-weight: bold; fill: #2c3e50; text-anchor: middle; }
    .feature-desc { font-family: Arial; font-size: 11px; fill: #7f8c8d; text-anchor: middle; }
    .center-hub { fill: #3498db; stroke: #2980b9; stroke-width: 3; }
    .center-text { font-family: Arial; font-size: 16px; font-weight: bold; fill: white; text-anchor: middle; }
    .connector { stroke: #95a5a6; stroke-width: 2; stroke-dasharray: 3,3; }
  </style>
  
  <!-- 中心圆 -->
  <circle cx="300" cy="150" r="35" class="center-hub"/>
  <text x="300" y="145" class="center-text">核心</text>
  <text x="300" y="160" class="center-text">功能</text>
  
  <!-- 功能卡片 -->
  <!-- 精确检测 -->
  <rect x="80" y="40" width="120" height="70" class="feature-card"/>
  <text x="140" y="60" class="feature-icon">🎯</text>
  <text x="140" y="80" class="feature-title">精确检测</text>
  <text x="140" y="95" class="feature-desc">Florence-2 模型</text>
  <text x="140" y="105" class="feature-desc">开放词汇检测</text>
  
  <!-- 无缝修复 -->
  <rect x="400" y="40" width="120" height="70" class="feature-card"/>
  <text x="460" y="60" class="feature-icon">🎨</text>
  <text x="460" y="80" class="feature-title">无缝修复</text>
  <text x="460" y="95" class="feature-desc">LaMA 图像修复</text>
  <text x="460" y="105" class="feature-desc">上下文感知</text>
  
  <!-- 双重界面 -->
  <rect x="80" y="190" width="120" height="70" class="feature-card"/>
  <text x="140" y="210" class="feature-icon">⚡</text>
  <text x="140" y="230" class="feature-title">双重界面</text>
  <text x="140" y="245" class="feature-desc">GUI + CLI</text>
  <text x="140" y="255" class="feature-desc">灵活操作</text>
  
  <!-- 批量处理 -->
  <rect x="400" y="190" width="120" height="70" class="feature-card"/>
  <text x="460" y="210" class="feature-icon">📁</text>
  <text x="460" y="230" class="feature-title">批量处理</text>
  <text x="460" y="245" class="feature-desc">目录级处理</text>
  <text x="460" y="255" class="feature-desc">高效批量</text>
  
  <!-- GPU 加速 -->
  <rect x="240" y="40" width="120" height="70" class="feature-card"/>
  <text x="300" y="60" class="feature-icon">🚀</text>
  <text x="300" y="80" class="feature-title">GPU 加速</text>
  <text x="300" y="95" class="feature-desc">CUDA 支持</text>
  <text x="300" y="105" class="feature-desc">高速处理</text>
  
  <!-- 自定义选项 -->
  <rect x="240" y="190" width="120" height="70" class="feature-card"/>
  <text x="300" y="210" class="feature-icon">🔧</text>
  <text x="300" y="230" class="feature-title">自定义选项</text>
  <text x="300" y="245" class="feature-desc">灵活配置</text>
  <text x="300" y="255" class="feature-desc">多种格式</text>
  
  <!-- 连接线 -->
  <path d="M265 150 L200 75" class="connector" />
  <path d="M335 150 L400 75" class="connector" />
  <path d="M300 115 L300 110" class="connector" />
  <path d="M265 150 L200 225" class="connector" />
  <path d="M335 150 L400 225" class="connector" />
  <path d="M300 185 L300 190" class="connector" />
</svg>

## 安装指南

### 系统要求

- **Python**: 3.10 或更高版本
- **Conda/Miniconda**: 用于环境管理
- **可选**: CUDA 兼容的 GPU（用于加速处理）

### 快速安装

按照以下步骤快速设置 WatermarkRemover-AI：

<svg width="600" height="400" xmlns="http://www.w3.org/2000/svg">
  <style>
    .step-card { fill: #ecf0f1; stroke: #34495e; stroke-width: 2; rx: 10; ry: 10; }
    .step-number { font-family: Arial; font-size: 24px; font-weight: bold; fill: #e74c3c; }
    .step-title { font-family: Arial; font-size: 16px; font-weight: bold; fill: #2c3e50; }
    .step-desc { font-family: Arial; font-size: 12px; fill: #7f8c8d; }
    .code-text { font-family: monospace; font-size: 11px; fill: #27ae60; }
    .flow-arrow { stroke: #3498db; stroke-width: 3; fill: none; marker-end: url(#flow-arrow); }
  </style>
  
  <defs>
    <marker id="flow-arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#3498db" />
    </marker>
  </defs>
  
  <!-- 步骤1: 克隆仓库 -->
  <rect x="50" y="30" width="500" height="80" class="step-card"/>
  <text x="80" y="55" class="step-number">1</text>
  <text x="110" y="55" class="step-title">克隆 GitHub 仓库</text>
  <text x="110" y="75" class="code-text">git clone https://github.com/D-Ogi/WatermarkRemover-AI.git</text>
  <text x="110" y="90" class="code-text">cd WatermarkRemover-AI</text>
  
  <!-- 步骤2: 运行设置脚本 -->
  <rect x="50" y="130" width="500" height="80" class="step-card"/>
  <text x="80" y="155" class="step-number">2</text>
  <text x="110" y="155" class="step-title">运行自动设置脚本</text>
  <text x="110" y="175" class="code-text">bash setup.sh</text>
  <text x="110" y="190" class="step-desc">自动创建环境、安装依赖并启动 GUI</text>
  
  <!-- 步骤3: 下载模型 -->
  <rect x="50" y="230" width="500" height="80" class="step-card"/>
  <text x="80" y="255" class="step-number">3</text>
  <text x="110" y="255" class="step-title">下载 LaMA 模型</text>
  <text x="110" y="275" class="code-text">conda activate py312aiwatermark</text>
  <text x="110" y="290" class="code-text">iopaint download --model lama</text>
  
  <!-- 步骤4: 开始使用 -->
  <rect x="50" y="330" width="500" height="50" class="step-card"/>
  <text x="80" y="355" class="step-number">4</text>
  <text x="110" y="355" class="step-title">开始使用</text>
  <text x="110" y="370" class="step-desc">GUI 将自动启动，或使用命令行模式</text>
  
  <!-- 流程箭头 -->
  <path d="M300 110 L300 130" class="flow-arrow" />
  <path d="M300 210 L300 230" class="flow-arrow" />
  <path d="M300 310 L300 330" class="flow-arrow" />
</svg>

### 环境升级

如果你之前安装过旧版本，请按以下步骤升级：

```bash
# 更新仓库
git pull

# 移除旧环境
conda deactivate
conda env remove -n py312

# 重新运行设置脚本
bash setup.sh
```

## 使用方法详解

### GUI 图形界面使用

WatermarkRemover-AI 提供了直观的 PyQt6 图形界面，支持深色模式并具有实时进度跟踪功能。

<svg width="600" height="450" xmlns="http://www.w3.org/2000/svg">
  <style>
    .window { fill: #ffffff; stroke: #bdc3c7; stroke-width: 2; rx: 8; ry: 8; }
    .titlebar { fill: #34495e; rx: 8; ry: 8; }
    .titlebar-text { font-family: Arial; font-size: 14px; font-weight: bold; fill: white; }
    .button { fill: #3498db; stroke: #2980b9; stroke-width: 1; rx: 4; ry: 4; }
    .button-text { font-family: Arial; font-size: 12px; fill: white; text-anchor: middle; }
    .input-field { fill: #ecf0f1; stroke: #bdc3c7; stroke-width: 1; rx: 3; ry: 3; }
    .label-text { font-family: Arial; font-size: 12px; fill: #2c3e50; }
    .checkbox { fill: none; stroke: #34495e; stroke-width: 2; }
    .progress-bar { fill: #e8f5e8; stroke: #27ae60; stroke-width: 2; rx: 10; ry: 10; }
    .progress-fill { fill: #27ae60; rx: 10; ry: 10; }
  </style>
  
  <!-- 主窗口 -->
  <rect x="50" y="50" width="500" height="350" class="window"/>
  
  <!-- 标题栏 -->
  <rect x="50" y="50" width="500" height="40" class="titlebar"/>
  <text x="70" y="75" class="titlebar-text">WatermarkRemover-AI</text>
  
  <!-- 模式选择 -->
  <text x="70" y="115" class="label-text">处理模式:</text>
  <rect x="70" y="125" width="15" height="15" class="checkbox"/>
  <text x="95" y="137" class="label-text">处理单个图像</text>
  <rect x="200" y="125" width="15" height="15" class="checkbox"/>
  <text x="225" y="137" class="label-text">处理目录</text>
  
  <!-- 路径设置 -->
  <text x="70" y="165" class="label-text">输入路径:</text>
  <rect x="70" y="175" width="350" height="25" class="input-field"/>
  <rect x="430" y="175" width="60" height="25" class="button"/>
  <text x="460" y="190" class="button-text">浏览</text>
  
  <text x="70" y="220" class="label-text">输出路径:</text>
  <rect x="70" y="230" width="350" height="25" class="input-field"/>
  <rect x="430" y="230" width="60" height="25" class="button"/>
  <text x="460" y="245" class="button-text">浏览</text>
  
  <!-- 选项设置 -->
  <text x="70" y="280" class="label-text">选项设置:</text>
  <rect x="70" y="290" width="15" height="15" class="checkbox"/>
  <text x="95" y="302" class="label-text">覆盖现有文件</text>
  <rect x="200" y="290" width="15" height="15" class="checkbox"/>
  <text x="225" y="302" class="label-text">透明模式</text>
  
  <!-- 输出格式 -->
  <text x="350" y="302" class="label-text">输出格式:</text>
  <rect x="420" y="290" width="70" height="20" class="input-field"/>
  <text x="425" y="302" class="label-text">PNG</text>
  
  <!-- 进度条 -->
  <text x="70" y="335" class="label-text">处理进度:</text>
  <rect x="70" y="345" width="300" height="20" class="progress-bar"/>
  <rect x="70" y="345" width="120" height="20" class="progress-fill"/>
  <text x="380" y="358" class="label-text">40%</text>
  
  <!-- 开始按钮 -->
  <rect x="430" y="340" width="80" height="30" class="button"/>
  <text x="470" y="358" class="button-text">开始处理</text>
</svg>

#### GUI 使用步骤：

1. **启动程序**：
   ```bash
   python remwmgui.py
   ```

2. **选择处理模式**：
   - 单个图像处理
   - 目录批量处理

3. **配置路径和选项**：
   - 设置输入/输出路径
   - 选择是否覆盖现有文件
   - 启用透明模式（可选）
   - 选择输出格式

4. **开始处理**：
   - 点击"开始"按钮
   - 观察实时进度和日志

### CLI 命令行使用

对于高级用户或批处理场景，命令行界面提供了更多的灵活性和控制选项。

#### 基本语法：

```bash
python remwm.py <输入路径> <输出路径> [选项]
```

#### 可用选项：

<svg width="600" height="280" xmlns="http://www.w3.org/2000/svg">
  <style>
    .option-card { fill: #f8f9fa; stroke: #dee2e6; stroke-width: 1; rx: 6; ry: 6; }
    .option-name { font-family: monospace; font-size: 14px; font-weight: bold; fill: #e74c3c; }
    .option-desc { font-family: Arial; font-size: 12px; fill: #6c757d; }
    .example-text { font-family: monospace; font-size: 11px; fill: #28a745; }
  </style>
  
  <!-- --overwrite -->
  <rect x="30" y="20" width="540" height="50" class="option-card"/>
  <text x="50" y="40" class="option-name">--overwrite</text>
  <text x="50" y="55" class="option-desc">覆盖现有文件（目录处理模式）</text>
  
  <!-- --transparent -->
  <rect x="30" y="80" width="540" height="50" class="option-card"/>
  <text x="50" y="100" class="option-name">--transparent</text>
  <text x="50" y="115" class="option-desc">将水印区域设为透明而不是填充</text>
  
  <!-- --max-bbox-percent -->
  <rect x="30" y="140" width="540" height="50" class="option-card"/>
  <text x="50" y="160" class="option-name">--max-bbox-percent</text>
  <text x="50" y="175" class="option-desc">设置水印检测的最大边界框大小百分比（默认：10%）</text>
  
  <!-- --force-format -->
  <rect x="30" y="200" width="540" height="50" class="option-card"/>
  <text x="50" y="220" class="option-name">--force-format</text>
  <text x="50" y="235" class="option-desc">强制指定输出格式：PNG、WEBP 或 JPG</text>
</svg>

#### 使用示例：

```bash
# 基本使用
python remwm.py ./input_images ./output_images

# 使用所有选项
python remwm.py ./input_images ./output_images --overwrite --transparent --max-bbox-percent=15 --force-format=PNG

# 使用设置脚本快速处理
./setup.sh ./input_images ./output_images --overwrite --transparent
```

## 高级功能与技巧

### Alpha 透明蒙版

WatermarkRemover-AI 实现了先进的 Alpha 透明蒙版技术，允许对水印区域进行精确控制：

- **精确性**：通过边界框定位实现精确的水印移除
- **灵活性**：通过透明度控制实现从完全移除到部分透明的各种效果
- **最小影响**：确保水印外区域保持原始质量

### 批量处理优化

<svg width="600" height="250" xmlns="http://www.w3.org/2000/svg">
  <style>
    .tip-box { fill: #e8f4fd; stroke: #3498db; stroke-width: 2; rx: 8; ry: 8; }
    .warning-box { fill: #fef9e7; stroke: #f39c12; stroke-width: 2; rx: 8; ry: 8; }
    .tip-title { font-family: Arial; font-size: 14px; font-weight: bold; fill: #2980b9; }
    .warning-title { font-family: Arial; font-size: 14px; font-weight: bold; fill: #e67e22; }
    .tip-text { font-family: Arial; font-size: 12px; fill: #34495e; }
  </style>
  
  <!-- 性能优化提示 -->
  <rect x="30" y="20" width="540" height="100" class="tip-box"/>
  <text x="50" y="40" class="tip-title">💡 性能优化提示</text>
  <text x="50" y="60" class="tip-text">• 使用 GPU 加速可显著提高处理速度</text>
  <text x="50" y="75" class="tip-text">• 大批量处理建议在夜间或空闲时间运行</text>
  <text x="50" y="90" class="tip-text">• 对于大型图像，可适当调整分辨率以加快处理</text>
  <text x="50" y="105" class="tip-text">• 建议预先备份原始图像文件</text>
  
  <!-- 注意事项 -->
  <rect x="30" y="140" width="540" height="90" class="warning-box"/>
  <text x="50" y="160" class="warning-title">⚠️ 重要注意事项</text>
  <text x="50" y="180" class="tip-text">• 处理复杂纹理背景的水印可能需要多次处理</text>
  <text x="50" y="195" class="tip-text">• 水印过大（超过图像25%）时效果可能下降</text>
  <text x="50" y="210" class="tip-text">• 建议先用小批量测试最佳参数设置</text>
</svg>

### 输出格式选择指南

- **PNG**：适合需要透明背景或无损质量的图像
- **WEBP**：现代格式，提供优秀的压缩率和质量平衡
- **JPG**：传统格式，适合照片类图像，文件体积小

## 常见问题解决

### 安装相关问题

<svg width="600" height="320" xmlns="http://www.w3.org/2000/svg">
  <style>
    .problem-box { fill: #fdebee; stroke: #e74c3c; stroke-width: 2; rx: 8; ry: 8; }
    .solution-box { fill: #eafaf1; stroke: #27ae60; stroke-width: 2; rx: 8; ry: 8; }
    .problem-title { font-family: Arial; font-size: 14px; font-weight: bold; fill: #c0392b; }
    .solution-title { font-family: Arial; font-size: 14px; font-weight: bold; fill: #229954; }
    .content-text { font-family: Arial; font-size: 12px; fill: #2c3e50; }
    .code-snippet { font-family: monospace; font-size: 11px; fill: #8e44ad; }
  </style>
  
  <!-- 问题1 -->
  <rect x="30" y="20" width="540" height="90" class="problem-box"/>
  <text x="50" y="40" class="problem-title">❌ 依赖安装失败</text>
  <text x="50" y="60" class="content-text">现象：运行 setup.sh 时出现 conda 环境创建失败</text>
  <text x="50" y="80" class="content-text">解决方案：</text>
  <text x="50" y="95" class="code-snippet">conda clean -a && conda update conda</text>
  
  <!-- 问题2 -->
  <rect x="30" y="130" width="540" height="90" class="problem-box"/>
  <text x="50" y="150" class="problem-title">❌ LaMA 模型下载失败</text>
  <text x="50" y="170" class="content-text">现象：iopaint download --model lama 命令失败</text>
  <text x="50" y="190" class="content-text">解决方案：检查网络连接，使用代理或更换下载源</text>
  <text x="50" y="205" class="code-snippet">export https_proxy=your_proxy_address</text>
  
  <!-- 问题3 -->
  <rect x="30" y="240" width="540" height="70" class="problem-box"/>
  <text x="50" y="260" class="problem-title">❌ CUDA 相关错误</text>
  <text x="50" y="280" class="content-text">现象：GPU 加速无法使用</text>
  <text x="50" y="295" class="content-text">解决方案：检查 CUDA 版本兼容性，或使用 CPU 模式</text>
</svg>

### 处理效果问题

- **水印去除不彻底**：尝试调整 `--max-bbox-percent` 参数
- **修复区域不自然**：对于复杂纹理，可能需要后期手动调整
- **处理速度过慢**：启用 GPU 加速或减小图像尺寸

## 法律声明与使用建议

<svg width="600" height="200" xmlns="http://www.w3.org/2000/svg">
  <style>
    .legal-box { fill: #fff3cd; stroke: #856404; stroke-width: 2; rx: 10; ry: 10; }
    .legal-title { font-family: Arial; font-size: 16px; font-weight: bold; fill: #856404; }
    .legal-text { font-family: Arial; font-size: 12px; fill: #856404; }
    .allowed { fill: #d4edda; stroke: #155724; stroke-width: 1; rx: 5; ry: 5; }
    .forbidden { fill: #f8d7da; stroke: #721c24; stroke-width: 1; rx: 5; ry: 5; }
    .allowed-text { font-family: Arial; font-size: 11px; fill: #155724; }
    .forbidden-text { font-family: Arial; font-size: 11px; fill: #721c24; }
  </style>
  
  <!-- 法律声明主框 -->
  <rect x="30" y="20" width="540" height="160" class="legal-box"/>
  <text x="50" y="45" class="legal-title">⚖️ 重要法律声明</text>
  <text x="50" y="65" class="legal-text">请在使用本工具前仔细阅读以下使用条款和建议：</text>
  
  <!-- 允许的使用 -->
  <rect x="50" y="80" width="240" height="80" class="allowed"/>
  <text x="60" y="100" style="font-weight: bold; font-size: 12px; fill: #155724;">✅ 允许的使用</text>
  <text x="60" y="115" class="allowed-text">• 个人学习和研究目的</text>
  <text x="60" y="130" class="allowed-text">• 已获得版权许可的图像</text>
  <text x="60" y="145" class="allowed-text">• 处理自己创建的图像</text>
  
  <!-- 禁止的使用 -->
  <rect x="310" y="80" width="240" height="80" class="forbidden"/>
  <text x="320" y="100" style="font-weight: bold; font-size: 12px; fill: #721c24;">❌ 禁止的使用</text>
  <text x="320" y="115" class="forbidden-text">• 未经授权的商业用途</text>
  <text x="320" y="130" class="forbidden-text">• 盗用他人受版权保护的作品</text>
  <text x="320" y="145" class="forbidden-text">• 规避付费内容保护机制</text>
</svg>

**免责声明**：WatermarkRemover-AI 仅供技术研究和合法用途。用户需自行承担使用该工具可能产生的法律责任。建议在使用前了解并遵守所在地区的版权法律法规。

## 总结

WatermarkRemover-AI 是一款结合了最新 AI 技术的强大水印移除工具。它的主要优势包括：

- **🔬 技术先进**：基于 Florence-2 和 LaMA 的最新深度学习模型
- **🎯 检测精确**：开放词汇检测技术确保水印识别准确性
- **🎨 修复自然**：上下文感知的图像修复算法
- **💻 界面友好**：同时提供 GUI 和 CLI 两种操作方式
- **⚡ 性能优秀**：支持 GPU 加速和批量处理
- **🆓 开源免费**：MIT 许可证，完全开放源代码

通过本指南，您应该能够成功安装并使用 WatermarkRemover-AI 来处理图像中的水印。请记住在合法、合规的前提下使用该工具，并尊重原创作者的知识产权。

## 相关资源

- [GitHub 仓库](https://github.com/D-Ogi/WatermarkRemover-AI) - 源代码和最新更新
- [Florence-2 模型](https://github.com/microsoft/Florence) - 微软开源的视觉语言模型
- [LaMA 论文](https://github.com/saic-mdal/lama) - 图像修复技术详细介绍 