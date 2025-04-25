/**
 * 自定义Utterances评论系统文本
 * 将英文替换为中文并移除powered by标记
 */
document.addEventListener('DOMContentLoaded', function() {
  // 等待iframe加载完成
  const observer = new MutationObserver(function(mutations) {
    const utterancesFrame = document.querySelector('.utterances-frame');
    if (utterancesFrame) {
      // 监听iframe内容加载
      utterancesFrame.addEventListener('load', function() {
        try {
          const iframeDocument = utterancesFrame.contentDocument || utterancesFrame.contentWindow.document;
          
          // 设置定时任务定期检查和替换文本
          setInterval(function() {
            // 替换标题中的文本
            const commentsText = iframeDocument.querySelector('.timeline-comment-header-text');
            if (commentsText && commentsText.textContent.includes('Comments')) {
              commentsText.textContent = commentsText.textContent.replace('Comments', '评论');
            }
            
            // 替换"Write"和"Preview"标签
            const writeTab = iframeDocument.querySelector('.write-tab');
            if (writeTab && writeTab.textContent.includes('Write')) {
              writeTab.textContent = '编辑';
            }
            
            const previewTab = iframeDocument.querySelector('.preview-tab');
            if (previewTab && previewTab.textContent.includes('Preview')) {
              previewTab.textContent = '预览';
            }
            
            // 替换"Leave a comment"占位符
            const textarea = iframeDocument.querySelector('textarea.comment-form-textarea');
            if (textarea && textarea.getAttribute('placeholder') && textarea.getAttribute('placeholder').includes('Leave a comment')) {
              textarea.setAttribute('placeholder', '发表评论...');
            }
            
            // 替换"Nothing to preview"文本
            const nothingToPreview = iframeDocument.querySelector('.markdown-body');
            if (nothingToPreview && nothingToPreview.textContent.includes('Nothing to preview')) {
              nothingToPreview.textContent = nothingToPreview.textContent.replace('Nothing to preview', '暂无内容可预览');
            }
            
            // 替换"Styling with Markdown is supported"文本
            const markdownText = iframeDocument.querySelector('.comment-form-head .tabnav-extra');
            if (markdownText && markdownText.textContent.includes('Styling with Markdown is supported')) {
              markdownText.textContent = '支持Markdown格式';
            }
            
            // 替换评论按钮文本
            const commentButton = iframeDocument.querySelector('.btn-primary');
            if (commentButton && commentButton.textContent.includes('Comment')) {
              commentButton.textContent = '提交评论';
            }
            
            // 移除"powered by utteranc.es"标记
            const footer = iframeDocument.querySelector('.footer');
            if (footer) {
              const poweredByLinks = footer.querySelectorAll('a');
              for (let i = 0; i < poweredByLinks.length; i++) {
                if (poweredByLinks[i].textContent.includes('utteranc.es')) {
                  footer.style.display = 'none';
                  break;
                }
              }
            }
          }, 1000); // 每秒检查一次
        } catch (e) {
          console.error('无法访问iframe内容:', e);
        }
      });
      
      observer.disconnect(); // 找到iframe后停止观察
    }
  });
  
  // 开始观察DOM变化
  observer.observe(document.body, { childList: true, subtree: true });
}); 