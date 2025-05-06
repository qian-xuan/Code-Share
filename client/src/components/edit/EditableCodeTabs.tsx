import React, { useMemo, useState } from 'react';
import { ConfigProvider, Select, Tabs, ThemeConfig } from 'antd';
import CodeEditor from '../CodeEditor';
import { useDispatch } from 'react-redux';
import store, { DispatchType } from '../../store/store';
import { addCode, removeCode, setLanguage } from '../../store/editPageSlice';
import { LanguageType } from '../../types/CodeData';

type TargetKey = React.MouseEvent | React.KeyboardEvent | string;

// Tabs 样式
// 想哭的我带上痛苦面具
const theme:ThemeConfig = {
  components: {
    Tabs: {
      horizontalMargin: '0 0 0 0',
      cardPaddingSM: '6px 16px',
      fontSize: 12,
      fontSizeSM: 10,
      borderRadius: 8,
      borderRadiusLG: 8,
      // cardBg: 'var(--color-AC-1)',
      // // active tabs color
      // colorBgContainer: 'var(--color-AC-4)',
      // itemColor: 'var(--color-text)',
      // itemHoverColor: 'var(--color-accent)',
      // itemSelectedColor: 'var(--color-accent)',
      // // × | ＋ 按钮点击后颜色
      // itemActiveColor: 'var(--color-text)',
      // //  × color
      // colorTextDescription: 'var(--color-text)',
      // //  × hover color
      // colorText: 'var(--color-accent)',
      // colorTextHeading: 'var(--color-accent)',
    },
  },
};

interface TabItem {
  label: string;
  key: string;
}

const EditableCodeTabs: React.FC<{ children?: React.ReactNode }> = () => {
  const dispatch: DispatchType = useDispatch();

  const [activeKey, setActiveKey] = useState('0');
  const [currentPage, setCurrentPage] = useState(0);
  const [currentLanguage, setCurrentLanguage] = useState<LanguageType>('html');
  
  // 强制更新Editor的内容
  const [forceUpdate, setForceUpdate] = useState(0);
  const useForceUpdateEditor = () => setForceUpdate(forceUpdate+1);

  // 初始化页面数
  const [tabItemsChange, setTabItemsChange] = useState(false);
  const tabItems = useMemo(() => {
    const codes = store.getState().edit.editPageData.codes;
    const items: TabItem[] = [];
    if (codes.length === 0) {
      items.push({ label: "代码 1", key: "0" });
      dispatch(addCode({ language: "html", code: "// 输入代码..." }));
    } else {
      codes.forEach(({}, index) =>{
        items.push({ label: `代码 ${index + 1}`,  key: index.toString() });
      })
    }
    return items;
  }, [tabItemsChange]);


  // Page 变动时逻辑链
  const tabChangeLogic:any = (value: number | string) => {
    const newPage = Number(value);
    if (newPage > store.getState().edit.editPageData.codes.length-1) {
      alert("超出范围");
      return;
    }
    setActiveKey(newPage.toString());
    setCurrentPage(newPage);
    setCurrentLanguage(store.getState().edit.editPageData.codes[newPage].language);
  }

  // 切换 Page 
  const onChange = (newActiveKey: string) => {
    tabChangeLogic(newActiveKey);
  };

  // 添加 Page
  const add = async () => {
    const newPage = tabItems.length;
    dispatch(addCode({ language: currentLanguage, code: '// 输入代码...' }));
    setTabItemsChange(!tabItemsChange);
    tabChangeLogic(newPage);
  };

  // 删除 Page
  const remove = (targetKey: TargetKey) => {
    // TODO: alert here
    if (tabItems.length === 1) return;

    let activePage = Number(activeKey);
    let removePage = Number(targetKey);

    if (removePage > tabItems.length-1) {
      alert("out of range");
      return;
    }

    dispatch(removeCode(removePage));
    setTabItemsChange(!tabItemsChange);

    // 更新 Tabs 面板 && 执行页面变更逻辑
    // 删除页在显示页前 || 显示页===最后一页===删除页
    if ((activePage > removePage) || (activePage === tabItems.length-1))
      tabChangeLogic( Math.min(activePage-1, tabItems.length-1) );
    else if (activePage === removePage) {
      // ! 强制更新 Page Language
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
  const changeLanguage = (newLanguage: LanguageType) => {
    dispatch(setLanguage({page: currentPage, language: newLanguage}));
    setCurrentLanguage(newLanguage);
  }

  // TODO: 添加可选语言
  // Tabs 边栏 Select
  const operations = (
    <Select
    className='ml-4'
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
        size='small'
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

    </>
  )
};

export default EditableCodeTabs;
