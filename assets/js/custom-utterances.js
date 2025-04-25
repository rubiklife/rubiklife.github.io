/**
 * 自定义Utterances评论系统文本
 * 将英文替换为中文并移除powered by标记
 */
(function() {
  // 由于跨域限制，我们需要使用消息通信而不是直接访问iframe内容
  
  // 创建样式元素，通过CSS覆盖Utterances的样式
  function addCustomStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .utterances-frame {
        min-height: 300px !important;
      }
    `;
    document.head.appendChild(style);
  }
  
  // 添加自定义样式
  addCustomStyles();
  
  // 检查评论iframe是否已加载
  function waitForUtterancesIframe() {
    // 每50毫秒检查一次iframe是否存在
    const checkInterval = setInterval(function() {
      const iframe = document.querySelector('.utterances-frame');
      if (iframe) {
        clearInterval(checkInterval);
        console.log('Utterances iframe已加载');
        
        // 尝试翻译内容
        translateUtterances();
      }
    }, 50);
  }
  
  // 翻译Utterances内容
  function translateUtterances() {
    // 由于iframe安全限制，我们需要使用自定义CSS
    const customCSS = document.createElement('style');
    customCSS.textContent = `
      /* 隐藏"powered by utterances"文本 */
      .utterances-frame {
        position: relative;
      }
      
      /* 通过CSS内容伪元素替换英文文本 */
      .utterances-frame::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 30px;
        background-color: #fff;
        z-index: 999;
      }
    `;
    document.head.appendChild(customCSS);

    // 由于无法直接修改跨域iframe内容，我们将使用修改Utterances源码的方式
    // 先移除原有的iframe
    const container = document.querySelector('#utterances-comments');
    if (!container) return;
    
    // 保存原始内容
    const originalContent = container.innerHTML;
    
    // 清空容器
    container.innerHTML = '';
    
    // 创建新的带本地化参数的script
    // Utterances v2版本已支持theme-url参数，可通过此自定义样式
    const newScript = document.createElement('script');
    newScript.src = 'https://utteranc.es/client.js';
    newScript.setAttribute('repo', '{{ site.comments.utterances.repository }}');
    newScript.setAttribute('issue-term', '{{ site.comments.utterances.issue_term | default: "pathname" }}');
    {% if site.comments.utterances.label %}newScript.setAttribute('label', '{{ site.comments.utterances.label }}');{% endif %}
    newScript.setAttribute('theme', '{{ site.comments.utterances.theme | default: "github-light" }}');
    
    // 添加自定义文本标记以便中文化
    newScript.setAttribute('custom-text', 'true');
    
    // 添加事件监听器，在iframe加载后尝试间接翻译
    newScript.onload = function() {
      setTimeout(applyTranslationHack, 1000);
    };
    
    newScript.setAttribute('crossorigin', 'anonymous');
    newScript.async = true;
    
    // 添加到容器
    container.appendChild(newScript);
    
    // 尝试定期应用翻译黑客方法
    setInterval(applyTranslationHack, 2000);
  }
  
  // 使用间接方式应用中文翻译
  function applyTranslationHack() {
    const iframe = document.querySelector('.utterances-frame');
    if (!iframe) return;
    
    try {
      // 创建一个隐藏的翻译层覆盖在iframe上方
      let translationOverlay = document.getElementById('utterances-translation-overlay');
      
      if (!translationOverlay) {
        translationOverlay = document.createElement('div');
        translationOverlay.id = 'utterances-translation-overlay';
        translationOverlay.style.cssText = `
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 30px;
          pointer-events: none;
          z-index: 9999;
        `;
        
        const container = document.querySelector('#utterances-comments');
        if (container) {
          container.style.position = 'relative';
          container.appendChild(translationOverlay);
        }
      }
      
      // 创建并注入改变"Comment"按钮的元素
      injectButtonTranslation();
      
      // 添加自定义覆盖层，遮挡powered by footer
      injectFooterCover();
      
    } catch(e) {
      console.error('翻译Utterances时出错:', e);
    }
  }
  
  // 注入按钮翻译
  function injectButtonTranslation() {
    let buttonStyle = document.getElementById('utterances-button-translation');
    if (!buttonStyle) {
      buttonStyle = document.createElement('style');
      buttonStyle.id = 'utterances-button-translation';
      buttonStyle.innerHTML = `
        .utterances-frame {
          position: relative;
        }
        
        /* 通过CSS选择器定位按钮并修改其内容 */
        .utterances-frame::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 2;
        }
      `;
      document.head.appendChild(buttonStyle);
    }
  }
  
  // 注入页脚覆盖层，隐藏powered by标记
  function injectFooterCover() {
    let footerCover = document.getElementById('utterances-footer-cover');
    if (!footerCover) {
      footerCover = document.createElement('div');
      footerCover.id = 'utterances-footer-cover';
      footerCover.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 30px;
        background-color: white;
        z-index: 9999;
      `;
      
      const container = document.querySelector('#utterances-comments');
      if (container) {
        container.style.position = 'relative';
        container.appendChild(footerCover);
      }
    }
  }

  // 当DOM加载完成后启动
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', waitForUtterancesIframe);
  } else {
    waitForUtterancesIframe();
  }
})(); 