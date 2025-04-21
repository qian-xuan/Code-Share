import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu, ConfigProvider} from 'antd';
import { PAGE_PRIMARY } from '../config/constants';

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
    key: 'codeList',
  },
  {
    label: '卡片分享',
    key: 'cardShare',
  },
];

interface HeaderMenuProps {
  selectPage: (page: string) => void;
}

const HeaderMenu: React.FC<HeaderMenuProps> = ({ selectPage }) => {
  const [selected, setSelected] = useState('create');

  const onClick: MenuProps['onClick'] = (e) => {
    // console.log('click ', e);
    setSelected(e.key);
    // console.log(selectPage)
    selectPage(e.key)
  };

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            horizontalItemSelectedColor: PAGE_PRIMARY,
            horizontalLineHeight: '60px',
            itemColor: '#F5F5F5',
            itemDisabledColor: '#F5F5F5',
            // ↓ Ali! Looking my eyes!(╯▔皿▔)╯
            // horizontalItemHoverColor: '#F5F5F5',
            itemHoverColor: '#F5F5F5',
          },
        },
      }}
    >
      <Menu onClick={onClick} selectedKeys={[selected]} mode="horizontal" items={items} 
      className='bg-gray-900 rounded-full font-bold w-10/12 ring-2 ring-transparent ring-offset-2 ring-offset-gray-800'/>

      {/* Menu Border Blur
      <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} 
      className='relative bg-gray-900 rounded-full font-bold w-10/12'>
        <div className="absolute inset-0 rounded-full border-2 border-transparent bg-gray-900 blur-md"></div>
      </Menu> */}

    </ConfigProvider>
  );
};

export default HeaderMenu;
