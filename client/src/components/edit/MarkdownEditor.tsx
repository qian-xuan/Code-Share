// 导入React、react-markdown-editor-lite，以及一个你喜欢的Markdown渲染器
import { Card } from 'antd';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// 导入编辑器的样式
import 'react-markdown-editor-lite/lib/index.css';
import store from '../../store/store';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setDescription } from '../../store/editPageSlice';

// 注册插件（如果有的话）
// MdEditor.use(YOUR_PLUGINS_HERE);

// 初始化Markdown解析器
const mdParser = new MarkdownIt(/* Markdown-it options */);


const MarkdownEditor = () => {
  const description = useMemo(() => store.getState().edit.editPageData.settings.description, []);
  const dispatch = useDispatch();

  const onchange = ({html, text}: {html: string, text: string}) => {
    // console.log('text:', text, '\nhtml:', html);
    dispatch(setDescription(text));
  };

  return (
    <Card className="h-96">
      <MdEditor style={{ height: '380px',}} renderHTML={text => mdParser.render(text)} onChange={onchange} defaultValue={description} />
    </Card>
  );
};

export default MarkdownEditor;
