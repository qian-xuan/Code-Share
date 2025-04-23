import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, ConfigProvider} from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';

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

  // 根据当前路由更新选中项
  useEffect(() => {
    const path = location.pathname.replace('/', '');
    setSelected(path || 'codeList'); // 如果路径为空，默认选中 "create"
  }, [location]);

  // 点击菜单项时导航到对应路由
  const onClick: MenuProps['onClick'] = (e) => {
    // console.log('click ', e);
    setSelected(e.key);
    navigate(`/${e.key}`); // 跳转到对应路由
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            horizontalItemSelectedColor: 'var(--color-accent)',
            horizontalLineHeight: '60px',
            itemColor: 'var(--color-menuText)',
            itemDisabledColor: 'var(--color-menuText)',
            // ↓ Ali! Looking my eyes!(╯▔皿▔)╯
            // horizontalItemHoverColor: 'var(--color-menuText)',
            itemHoverColor: 'var(--color-menuText)',
          },
        },
      }}
    >
      <Menu onClick={onClick} selectedKeys={[selected]} mode="horizontal" items={items} 
      className="bg-AC-3 rounded-full font-bold w-10/12 ring-2 ring-transparent ring-offset-2 ring-offset-border"/>

      {/* Menu Border Blur
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} 
      className='relative bg-gray-900 rounded-full font-bold w-10/12'>
        <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gray-900 blur-md"></div>
      </Menu> */}

    </ConfigProvider>
  );
};

export default HeaderMenu;
