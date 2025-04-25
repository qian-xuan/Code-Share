import React, { Children, useContext, useMemo, useRef, useState } from 'react';
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Tabs } from 'antd';
import CodeEditor from './CodeEditor';
import { CodeDataContext } from '../contexts/CodeDataContext';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

// const items: MenuProps['items'] = [
//   {
//     key: "jacascript",
//     label: "jacascript",
//   },
//   {
//     key: "cpp",
//     label: "cpp"
//   }
// ];

// const operations = (<div className="box-border bg-AC-0 w-32 rounded-sm text-text text-[10px] p-[1px]">
//         <Dropdown menu={{ items }} placement="bottom" arrow className="flex justify-between pl-2 pr-2">
//             <Space>
//             编辑器主题色
//             <DownOutlined/>
//             </Space>
//           </Dropdown>
//         </div>);

const operations = <label>Test</label>

interface TabItem {
  label: string;
  key: string;
  children: React.ReactNode;
}

const DisplayCodes: React.FC<{ children?: React.ReactNode }> = () => {
  const codes = useContext(CodeDataContext).codes;
  const [activeKey, setActiveKey] = useState("0");
  const [page, setPage] = useState(0);
  // const editor = useMemo(() => <CodeEditor language='html' page={page} readOnly={false} />, [page]);
  const editor = <CodeEditor language='html' page={page} readOnly={false} />;
  
  // 初始化页面数
  const TabItems: TabItem[] = [];

  if (codes.length === 0) {
    TabItems.push({ label: "代码 1", children: editor, key: "0" });
    codes.push({ language: "html", code: "// 输入代码..." });
  } else {
    codes.forEach(({}, index) =>{
      TabItems.push({ label: `代码 ${index + 1}`, children: editor, key: index.toString() });
    })
  }

  const [items, setItems] = useState(TabItems);

  // 选中 Page 变更
  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
    setPage(Number(newActiveKey));
  };

  // 添加 Page
  const add = () => {
    const newPage = codes.length + 1;
    const newPanes = [...items];
    newPanes.push({ label: `代码${newPage}`, children: editor, key: newPage.toString() });
    codes.push({ language: "html", code: "// 输入代码..." });
    setItems(newPanes);
    setActiveKey(newPage.toString());
    setPage(newPage);
  };

  // 删除 Page
  const remove = (targetKey: TargetKey) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  // 修改 Page
  const onEdit = (
    targetKey: React.MouseEvent | React.KeyboardEvent | string,
    action: 'add' | 'remove',
  ) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey);
    }
  };

  return (
    <>
    <div >
      <div>
        <Tabs
        type="editable-card"
        tabBarExtraContent={operations}
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        items={items}
        />
      </div>

    </div>
    </>

  )
};

export default DisplayCodes;