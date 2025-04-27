import { Editor, useMonaco } from '@monaco-editor/react';
import React, { useContext, useEffect, useRef } from 'react';
import { CodeDataContext } from '../contexts/CodeDataContext';

interface CodeEditorProps {
  language?: string,
  page: number,
  readOnly: boolean,
  forceUpdate?: Number
};

const CodeEditor: React.FC<CodeEditorProps> = ({ language = 'html', page, readOnly, forceUpdate }) => {
  const editorRef = useRef<any>(null); // 引用 Editor 实例
  const codes = useContext(CodeDataContext).codes;
  const monaco = useMonaco();

  // 获取编辑器实例
  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor; // 保存 Editor 实例
    // console.log('here')
  };

  if ( !readOnly ) {
    // 修改编辑器内容
    useEffect(() => {
      if ( editorRef.current !== null ) { 
        // console.log(editorRef.current)
        // console.log(editorRef.current.getValue());
        editorRef.current.setValue(codes[page].code);
      }
    }, [page, forceUpdate]);

    // 修改编辑器语言
    useEffect(() => {
      if (editorRef.current) {
        const model = editorRef.current.getModel();
        if (model && monaco) {
          monaco.editor.setModelLanguage(model, language); // 动态设置语言
          // console.log(language);
        }
      }
    }, [language]);
  }
  else {
    useEffect(() => {
      if ( editorRef.current !== null ) { 
        editorRef.current.setValue(codes[page].code);

        const model = editorRef.current.getModel();
        if (model && monaco) {
          monaco.editor.setModelLanguage(model, codes[page].language);
          // console.log(language);
        }
      }
    }, [page]);
  }

  // 编辑器内容变更
  const onchange = (value: string | undefined) => {
    codes[page].code = value;
    // console.log(page)
    // console.log(codes)
  }

  return (
    <>
    <Editor
    // defaultLanguage="html"
    theme="vs-dark"  // 主题：vs, vs-dark, hc-black
    language={language}
    defaultValue={codes[page].code}
    onChange={onchange}
    onMount={handleEditorDidMount}
    options={{
      minimap: { enabled: false },  // 禁用小地图
      mouseWheelZoom: true,         // 滚轮缩放
      readOnly: readOnly,
      folding: true,
      smoothScrolling: true,
      scrollbar: {vertical: "hidden"},
    }}
    className="h-96"
    />
    {/* <button onClick={() => {console.log(language) }}
      className="p-2 bg-accent text-textAccent rounded fixed bottom-20  right-5">Test</button> */}
    </>
  )
};

export default CodeEditor;