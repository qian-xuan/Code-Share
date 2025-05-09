import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';

import store from '../store/store';
import { Card } from 'antd';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setDescription } from '../store/editPageSlice';

// 导入编辑器的样式
import 'react-markdown-editor-lite/lib/index.css';
import 'highlight.js/styles/github.css';
import hljs from 'highlight.js';
import { HighlightResult } from 'highlight.js';


// 初始化Markdown解析器
const mdParser = new MarkdownIt({
  // 启用代码高亮
  highlight: (str: string, lang: string): string => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        // 使用 highlight.js 高亮代码块
        const highlighted: HighlightResult = hljs.highlight(str, { language: lang });
        return `<pre class="hljs"><code>${highlighted.value}</code></pre>`;
      } catch (error) {
        console.error('代码高亮失败:', error);
      }
    }
    // 若语言未指定或高亮失败，返回转义后的原始代码
    return `<pre class="hljs"><code>${mdParser.utils.escapeHtml(str)}</code></pre>`;
  },
});

export const ParseMarkdown = ({text}: {text: string}) => {
  return <div dangerouslySetInnerHTML={{ __html: mdParser.render(text) }} />;
}

const MarkdownEditor = () => {
  const description = useMemo(() => store.getState().edit.editPageData.settings.description, []);
  const dispatch = useDispatch();

  const onchange = ({ text}: {html: string, text: string}) => {
    // console.log('text:', text, '\nhtml:', html);
    dispatch(setDescription(text));
  };

  return (
    <Card className="h-96">
      <MdEditor style={{ height: '380px'}} renderHTML={text => mdParser.render(text)} onChange={onchange} defaultValue={description} />
    </Card>
  );
};

export default MarkdownEditor;
