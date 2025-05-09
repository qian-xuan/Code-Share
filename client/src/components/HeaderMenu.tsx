import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { MenuProps, ThemeConfig } from 'antd';
import { ConfigProvider, Menu } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import store, { DispatchType } from '../store/store';
import { useDispatch } from 'react-redux';
import { seteditPageData, setValidated } from '../store/editPageSlice';
import { defaultCodeData } from '../types/CodeData';
import { setIfReadOnly } from '../store/editorSettingsSlice';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: (
    <div className='ml-2 space-x-3'>
      <img src="/LOGO_NERV.png" className='w-8 h-auto object-contain inline-block'/>
      <label className='text-lg'>Code Share</label>
    </div>
    ),
    key: 'icon',
    disabled: true,
  },
  {
    label: '创建',
    key: 'create',
    icon: <PlusOutlined />,
  },
  {
    label: '代码列表',
    key: 'codes',
  },
  {
    label: '卡片分享',
    key: 'share',
    // disabled: true,
  },
];


const HeaderMenu: React.FC = () => {
  const location = useLocation(); // 获取当前路由
  const navigate = useNavigate(); // 用于导航
  const [selected, setSelected] = useState('codeList');
  const dispatch: DispatchType = useDispatch();

  // 根据当前路由更新选中项
  useEffect(() => {
    const path = location.pathname.replace('/', '');
    setSelected(path || 'codeList'); // 如果路径为空，默认选中 "codeList"
  }, [location]);

  // 点击菜单项时导航到对应路由
  const onClick: MenuProps['onClick'] = (e) => {
    if (e.key === 'create') {
      if (!store.getState().edit.validated) {
        dispatch(seteditPageData(defaultCodeData));
        dispatch(setValidated(true))
      }
      if (store.getState().editorSettings.ifReadOnly)
        dispatch(setIfReadOnly(false));
    };
    setSelected(e.key);
    navigate(`/${e.key}`); // 跳转到对应路由
  };

  const theme:ThemeConfig = {
    token: {
      lineWidth: 5,
    },
    components: {
      Menu: {
        horizontalLineHeight: '60px',
        itemDisabledColor: 'var(--color-text)',
        // itemColor: 'var(--color-menuText)',
        // // ↓ Ali! Looking my eyes!(╯▔皿▔)╯
        // // horizontalItemHoverColor: 'var(--color-menuText)',
        // itemHoverColor: 'var(--color-menuText)',
      },
    },
  }

  return (
    <ConfigProvider theme={theme}>
      <Menu onClick={onClick} selectedKeys={[selected]} mode="horizontal" items={items}
      className="rounded-full font-bold w-10/12"/>
    </ConfigProvider>
  );
};

export default HeaderMenu;
