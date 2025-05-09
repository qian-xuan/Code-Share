import React, { useMemo, useState } from 'react';
import store from '../store/store';
import { ConfigProvider, Tabs, ThemeConfig } from 'antd';
import CodeEditor from './CodeEditor';
import { setPage } from '../store/editorSettingsSlice';
import { useDispatch } from 'react-redux';


const theme:ThemeConfig = {
  components: {
    Tabs: {
      horizontalMargin: '0 0 0 0',
      cardPaddingSM: '6px 16px',
      fontSize: 12,
      fontSizeSM: 10,
      borderRadius: 8,
      borderRadiusLG: 8,
    },
  },
};

interface TabItem {
  label: string;
  key: string;
}

const DisplayCodeTabs: React.FC = () => {
  const dispatch = useDispatch();
  const [activeKey, setActiveKey] = useState('0');
  const codes = store.getState().edit.editPageData.codes;
  
  // const useForceUpdateEditor = () => setForceUpdate(forceUpdate+1);

  // 初始化页面数
  const tabItems = useMemo(() => {
    const codes = store.getState().edit.editPageData.codes;
    const items: TabItem[] = [];
    codes.forEach(({}, index) =>{
      items.push({ label: `代码 ${index + 1}`,  key: index.toString() });
    })
    return items;
  }, []);

  // Page 变动时逻辑链
  const tabChangeLogic:any = (value: number | string) => {
    const newPage = Number(value);
    setActiveKey(newPage.toString());
    dispatch(setPage(newPage));
  }

  // 切换 Page 
  const onChange = (newActiveKey: string) => {
    tabChangeLogic(newActiveKey);
  };

  // Tabs 边栏 label
  const operations = (
    <div className='pr-3 text-[15px]' >
      <label>{codes[Number(activeKey)].language}</label>
    </div>
  );

  return (
    <>
      <ConfigProvider theme={theme} >
        <Tabs
        type="card"
        size='small'
        onChange={onChange}
        activeKey={activeKey}
        items={tabItems}
        // 右侧语言选框组件
        tabBarExtraContent={operations}
        />
      </ConfigProvider>

      <CodeEditor />

    </>
  );
}

export default DisplayCodeTabs;