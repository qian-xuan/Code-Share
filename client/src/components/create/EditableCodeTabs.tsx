import React, { useContext, useState } from 'react';
import { ConfigProvider, Select, Tabs, ThemeConfig } from 'antd';
import CodeEditor from '../CodeEditor';
import { CodeDataContext } from '../../contexts/CodeDataContext';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

// Tabs 样式
// 想哭的我带上痛苦面具
const theme:ThemeConfig = {
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
      // × | ＋ 按钮点击后颜色
      itemActiveColor: 'var(--color-text)',
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
};

interface TabItem {
  label: string;
  key: string;
}

const EditableCodeTabs: React.FC<{ children?: React.ReactNode }> = () => {
  const codes = useContext(CodeDataContext).codes;
  const [activeKey, setActiveKey] = useState("0");
  const [currentPage, setCurrentPage] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState('html');
  // const sharedEditor = useMemo(() => <CodeEditor language='html' page={page} readOnly={false} key={'sharedEditor'}/>, [page]);
  
  // 强制更新Editor的内容
  const [forceUpdate, setForceUpdate] = useState(0);
  const useForceUpdateEditor = () => setForceUpdate(forceUpdate+1);


  // 初始化页面数
  const items: TabItem[] = [];
  if (codes.length === 0) {
    items.push({ label: "代码 1", key: "0" });
    codes.push({ language: "html", code: "// 输入代码..." });
  } else {
    codes.forEach(({}, index) =>{
      items.push({ label: `代码 ${index + 1}`,  key: index.toString() });
    })
  }

  // Page 变动时逻辑链
  const tabChangeLogic:any = (value: number | string) => {
    const newPage = Number(value);
    if (newPage > codes.length-1) { alert("超出范围"); return;}
    setActiveKey(newPage.toString());
    setCurrentPage(newPage);
    setCurrentLanguage(codes[newPage].language);
  }
  
  const [tabItems, setTabItems] = useState(items);

  // 切换 Page 
  const onChange = (newActiveKey: string) => {
    tabChangeLogic(newActiveKey);
  };

  // 添加 Page
  const add = () => {
    const newPage = codes.length;
    const newPanes = [...tabItems];
    newPanes.push({ label: `代码${newPage+1}`, key: newPage.toString() });
    codes.push({ language: currentLanguage, code: '// 输入代码...' });
    // ! For testOnly, plz delete ↓
    // codes.push({ language: currentLanguage, code: `${newPage+1}` });
    setTabItems(newPanes);

    tabChangeLogic(newPage);
  };

  // 删除 Page
  const remove = (targetKey: TargetKey) => {
    // TODO: alert here
    if (tabItems.length === 1) return; 
    let activePage = Number(activeKey);
    let removePage = Number(targetKey);

    if (removePage > codes.length-1) {
      alert("out of range");
      return;
    }

    const newPanes = tabItems.slice(0, removePage);
    if (removePage + 1 < tabItems.length) {
      // console.log(tabItems)
      // console.log(newPanes)
      // console.log(tabItems.slice(removePage + 1, ))
      tabItems.slice(removePage + 1, ).forEach((item: TabItem) => {
        const itemPage = Number(item.key);
        newPanes.push({ label: `代码${itemPage}`, key: (itemPage-1).toString() });
      });
    }
    codes.splice(removePage, 1);

    // 更新 Tabs 面板 && 执行页面变更逻辑
    setTabItems(newPanes);
    // 删除页在显示页前 || 显示页===最后一页===删除页
    if ((activePage > removePage) || (activePage === codes.length))
      tabChangeLogic( Math.min(activePage-1, codes.length-1) );
    else if (activePage === removePage) {
      // ! 强制更新 Page Language
      // setCurrentLanguage(codes[activePage].language);
      tabChangeLogic(activePage);
      useForceUpdateEditor();
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

  // 修改语言
  const changeLanguage = (newLanguage: string) => {
    codes[currentPage].language = newLanguage
    setCurrentLanguage(newLanguage);
  }

  // TODO: 修整样式
  // Tabs 边栏 Select
  const operations = (
    <Select
    defaultValue="html"
    value={currentLanguage}
    style={{ width: 120 }}
    onChange={changeLanguage}
    // 语言选项
    options={[
      { value: 'html', label: 'html' },
      { value: 'javascript', label: 'javascript' },
    ]}/>
  );

  return (
    <>
      <ConfigProvider theme={theme} >
        <Tabs
        type="editable-card"
        // size='small'
        // indicator={{size: 5, align: 'center'}}
        // tabBarStyle={{'border': '0px' }}
        onChange={onChange}
        activeKey={activeKey}
        onEdit={onEdit}
        items={tabItems}
        // 右侧语言选框组件
        tabBarExtraContent={operations}
        />
      </ConfigProvider>

      <CodeEditor
      language={currentLanguage}
      page={currentPage}
      readOnly={false}
      key={'sharedEditor'}
      forceUpdate={forceUpdate}
      />

<button onClick={() => console.log(codes)}
className="p-2 bg-accent text-textAccent rounded fixed bottom-80  right-5">Test</button>

    </>
  )
};

export default EditableCodeTabs;

//  测试 Button
{/* <button onClick={() => {setCurrentLanguage('javascript') }}
className="p-2 bg-accent text-textAccent rounded fixed bottom-20  right-5">Test</button> */}
