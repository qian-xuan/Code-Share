import React, { useMemo, useState } from 'react';
import store from '../store/store';
import { Button, ConfigProvider, Tabs, Tag, ThemeConfig } from 'antd';
import CodeEditor from './CodeEditor';
import { setPage } from '../store/editorSettingsSlice';
import { useDispatch } from 'react-redux';
import { CopyFilled } from '@ant-design/icons'


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
    <>
      <Tag bordered={false}>{codes[Number(activeKey)].language}</Tag>
      <Button shape='circle' size='small' icon={<CopyFilled />}
      onClick={() => {
        const code = store.getState().edit.editPageData
        .codes[store.getState().editorSettings.page].code;
        navigator.clipboard.writeText(code!)
        .then(() => {
          alert('代码已复制到剪贴板');
        })
        .catch((err) => {
          alert('复制失败:' + err);
        });
      }}
      />
    </>
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