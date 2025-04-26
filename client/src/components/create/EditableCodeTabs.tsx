import React, { useContext, useMemo, useState } from 'react';
import { ConfigProvider, Tabs } from 'antd';
import CodeEditor from '../CodeEditor';
import { CodeDataContext } from '../../contexts/CodeDataContext';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

const operations = <label>Test</label>

interface TabItem {
  label: string;
  key: string;
  children: React.ReactNode;
}

const EditableCodeTabs: React.FC<{ children?: React.ReactNode }> = () => {
  const codes = useContext(CodeDataContext).codes;
  const [activeKey, setActiveKey] = useState("0");
  const [page, setPage] = useState(0);
  const sharedEditor = useMemo(() => <CodeEditor language='html' page={page} readOnly={false} key={'sharedEditor'}/>, [page]);
  // const sharedEditor = <CodeEditor language='html' page={page} readOnly={false} key={'sharedEditor'} />;
  
  // 初始化页面数
  const items: TabItem[] = [];
  if (codes.length === 0) {
    items.push({ label: "代码 1", children: sharedEditor, key: "0" });
    codes.push({ language: "html", code: "// 输入代码..." });
  } else {
    codes.forEach(({}, index) =>{
      items.push({ label: `代码 ${index + 1}`, children: sharedEditor, key: index.toString() });
    })
  }

  const [tabItems, setTabItems] = useState(items);

  // 切换 Page 
  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
    setPage(Number(newActiveKey));
  };

  // 添加 Page
  const add = () => {
    const newPage = codes.length;
    const newPanes = [...tabItems];
    newPanes.push({ label: `代码${newPage+1}`, children: sharedEditor, key: newPage.toString() });
    codes.push({ language: "html", code: "// 输入代码..." });
    setTabItems(newPanes);
    setActiveKey(newPage.toString());
    setPage(newPage);
  };

  // 删除 Page
  const remove = (targetKey: TargetKey) => {
    let activePage = Number(activeKey);
    let removePage = Number(targetKey);

    const newPanes = tabItems.slice(0, removePage);
    if (removePage + 1 < tabItems.length) {
      // console.log(tabItems)
      // console.log(newPanes)
      // console.log(tabItems.slice(removePage + 1, ))
      tabItems.slice(removePage + 1, ).forEach((item: TabItem) => {
        const itemPage = Number(item.key);
        newPanes.push({ label: `代码${itemPage}`, children: sharedEditor, key: (itemPage-1).toString() });
      });
    }
    codes.splice(removePage, 1);

    // console.log(removePage);
    // console.log(tabItems)
    // console.log(newPanes)
    // console.log(codes)
    
    setTabItems(newPanes);
    if (activePage >= removePage) {
      setActiveKey((activePage-1).toString());
      setPage(activePage-1);
    }
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
    // 想哭的我带上痛苦面具
    <ConfigProvider
    theme={{
      components: {
        Tabs: {
          horizontalMargin: '0 0 0 0',
          lineWidth: 0,
          cardBg: 'var(--color-AC-1)',
          // active tabs color
          colorBgContainer: 'var(--color-AC-4)',
          itemColor: 'var(--color-text)',
          itemHoverColor: 'var(--color-accent)',
          itemSelectedColor: 'var(--color-accent)',
          // colorIcon: 'var(--color-text)',
          //  × color
          colorTextDescription: 'var(--color-text)',
          //  × hover color
          colorText: 'var(--color-accent)',
          colorTextHeading: 'var(--color-accent)',
          cardPaddingSM: '6px 16px',
          fontSize: 12,
          fontSizeSM: 10,
          controlHeightLG: 20,
        },
      },
    }}
    >
      <Tabs
      type="editable-card"
      // size='small'
      // indicator={{size: 5, align: 'center'}}
      // tabBarStyle={{'border': '0px' }}
      tabBarExtraContent={operations}
      onChange={onChange}
      activeKey={activeKey}
      onEdit={onEdit}
      items={tabItems}
      />
      {/* <button onClick={() => {console.log(page) }}
      className="p-2 bg-accent text-textAccent rounded fixed bottom-20  right-5">Test</button> */}
    </ConfigProvider>

  )
};

export default EditableCodeTabs;