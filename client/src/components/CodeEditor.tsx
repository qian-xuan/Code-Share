import { Editor } from '@monaco-editor/react';
import React from 'react';

const CodeEditor: React.FC  = () => {
  return (
    <Editor
      defaultLanguage="html"
      language="html"
      theme="vs-dark"  // 主题：vs, vs-dark, hc-black
      defaultValue="// 输入代码..."
      options={{
        minimap: { enabled: false },  // 禁用小地图
        mouseWheelZoom: true,         // 滚轮缩放
        readOnly: false,
        folding: true,
        smoothScrolling: true,
        scrollbar: {vertical: "hidden"},
      }}
      className="h-80"
      />
  )
};

export default CodeEditor;