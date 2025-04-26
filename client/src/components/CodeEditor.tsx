import { Editor } from '@monaco-editor/react';
import React, { useContext } from 'react';
import { CodeDataContext } from '../contexts/CodeDataContext';

const CodeEditor: React.FC<{ language: string, page: number, readOnly: boolean }> = ({ language, page, readOnly }) => {
  const codes = useContext(CodeDataContext).codes;

  return (
    <Editor
    // defaultLanguage="html"
    theme="vs-dark"  // 主题：vs, vs-dark, hc-black
    language={language}
    defaultValue={codes[page].code}
    value="Test"
    onChange={(value) => {codes[page].code = value}}
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
  )
};

export default CodeEditor;