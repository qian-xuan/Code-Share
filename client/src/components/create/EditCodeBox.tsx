import React from "react";
import AppleDots from "./AppleDots";
import CodePageRadio from "./CodePageRadio";
import { Editor } from '@monaco-editor/react';
import { Dropdown, MenuProps, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";

interface EditCodeBoxProps {
  FCName: string;
  code?: string | "";
  language?: string;
}

const items: MenuProps['items'] = [
  {
    label: 'Submit and continue',
    key: '1',
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        2nd menu item (disabled)
      </a>
    ),
    disabled: true,
  }
];

const EditCodeBox: React.FC<EditCodeBoxProps> = ({ FCName, code, language = "javascript"}) => {

  return (
    <div className="flex-row bg-AC-0 rounded-t-xl p-4 box-border">


      {/* 标题栏 */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 pb-4">
          <AppleDots />
          <label className="text-text font-bold">{FCName}</label>
        </div>
      </div>


      {/* 代码页选项 Radio & language 选项 */}
      <div className="flex justify-between items-center">

        {/* <div className="bg-blue-600 h-5"></div> */}
        <CodePageRadio />

        <div className="box-border bg-AC-0 w-32">
        <Dropdown menu={{ items }} className="text-text text-[10px]">
          <Space>
          Hover
          <DownOutlined/>
          </Space>
        </Dropdown>
        </div>
      </div>


      {/* 代码编辑器 */}
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


    </div>
  );
}

export default EditCodeBox;
