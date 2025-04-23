import React, { useContext } from "react";
import AppleDots from "./AppleDots";
import CodePageRadio from "../CodePageRadio";
import { Dropdown, MenuProps, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import CodeEditor from "../CodeEditor";
import { CodeDataContext } from "../../contexts/CodeDataContext";


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

const EditCodeBox: React.FC = () => {
  const [codeData] = useContext(CodeDataContext);

  return (
    <div className="flex-row bg-AC-0 rounded-t-xl p-4 box-border">


      {/* 标题栏 */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2 pb-4">
          <AppleDots />
          <label className="text-text font-bold">{codeData.setting.title || "代码片段"}</label>
        </div>
      </div>


      {/* 代码页选项 Radio & language 选项 */}
      <CodePageRadio>

        {/* children */}
        <div className="box-border bg-AC-0 w-32">
        <Dropdown menu={{ items }} className="text-text text-[10px]">
          <Space>
          Hover
          <DownOutlined/>
          </Space>
        </Dropdown>
        </div>

      </CodePageRadio>


      {/* 代码编辑器 */}
      <CodeEditor />

    </div>
  );
}

export default EditCodeBox;
