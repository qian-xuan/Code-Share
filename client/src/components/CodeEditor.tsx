import { Editor } from '@monaco-editor/react';
import React, { useCallback, useContext } from 'react';
import { CodeDataContext } from '../contexts/CodeDataContext';

const CodeEditor: React.FC<{ language: string, page: number, readOnly: boolean }> = ({ language, page, readOnly }) => {
  const codes = useContext(CodeDataContext).codes;
  const onchange = (value: string | undefined) => {
    codes[page].code = value;
    console.log(page)
    console.log(codes)
  }
  useCallback(() => {console.log(page)}, [page]);

  return (
    <>
    <Editor
    // defaultLanguage="html"
    theme="vs-dark"  // 主题：vs, vs-dark, hc-black
    language={language}
    defaultValue={codes[page].code}
    onChange={onchange}
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
    <button onClick={() => {console.log(page) }}
      className="p-2 bg-accent text-textAccent rounded fixed bottom-20  right-5">Test</button>
      </>
  )
};

export default CodeEditor;