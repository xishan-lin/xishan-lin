// src/utils/markedConfig.ts
import { marked, Renderer } from 'marked';
import hljs from 'highlight.js';
// 引入高亮样式
import 'highlight.js/styles/atom-one-light.css';

// 创建自定义 Renderer 实例
const customRenderer = new Renderer();

/**
 * 自定义渲染器 - 标题定制
 * 支持标题内的markdown链接语法
 */
customRenderer.heading = (item: any) => {
  // 匹配[]()链接语法
  const regex = /\[(.*?)\]\((.*?)\)/g;
  const replaced = item.text.replace(regex, (match: any, text: any, url: any) => {
    return `<a href="${url}" target="_blank">${text}</a>`;
  });

  // 生成唯一ID
  // 1. 移除HTML标签
  const plainText = item.text.replace(/<[^>]+>/g, '');
  // 2. 转为小写
  const lowerText = plainText.toLowerCase();
  // 3. 将非字母数字字符替换为横线
  const dashedText = lowerText.replace(/[^\w\u4e00-\u9fa5]+/g, '-');
  // 4. 添加时间戳确保唯一性
  const uniqueId = `${dashedText}-${Date.now()}`;
  // 5. 再拼接4位随机数
  const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  const finalId = `${uniqueId}-${randomNum}`;

  // 添加id属性，支持锚点跳转
  return `<h${item.depth} id="${finalId}">${replaced}</h${item.depth}>`;
};

/**
 * 自定义渲染器 - 链接，默认打开新页签
 */
customRenderer.link = (item: any): string => {
  return `<a href="${item.href}" title="${item.title || ''}" target="_blank" rel="noopener noreferrer">${item.text}</a>`;
};

/**
 * 自定义渲染器 - 图片，点击可在新页签打开
 */
customRenderer.image = (item: any): string => {
  /**
   * 1. 添加了 crossorigin="anonymous" 属性，允许图片进行跨域加载
   * 2. 添加了 referrerpolicy="no-referrer" 属性，防止因 referrer 政策导致的加载限制
   */
  return `<a href="${item.href}" title="${item.title || ''}" target="_blank" rel="noopener noreferrer">
    <img src="${item.href}" alt="${item.title || ''}" crossorigin="anonymous" referrerpolicy="no-referrer" />
  </a>`;
};

/**
 * 自定义渲染器 - 代码片段高亮
 */
customRenderer.code = (item: any) => {  
  let validLanguage = item.lang || 'plaintext';

  // 特殊处理vue文件
  if (item.lang === 'vue') {
    validLanguage = 'html';
  } else if (item.lang) {
    // 检查语言是否支持
    validLanguage = hljs.getLanguage(item.lang) ? item.lang : 'plaintext';
  }

  const highlightedCode = hljs.highlight(item.text, { language: validLanguage }).value;
  return `<pre><code class="language-${validLanguage}">${highlightedCode}</code></pre>`;
};

// 创建 marked 配置对象
const markedConfig = {
  renderer: customRenderer,
  gfm: true,         // 启用 GitHub Flavored Markdown
  breaks: true,      // 将换行符转换为 <br>
  pedantic: false,   // 不使用严格模式
  sanitize: false,   // 原始输出，允许HTML标签
};

// 应用配置
marked.setOptions(markedConfig as any);

// 导出配置好的 marked 实例
export default marked;

// 导出一个便捷的渲染函数
export function renderMarkdown(content: string): string | Promise<string> {
  return marked.parse(content);
}
