import { useState } from 'react';
import EditCodeBox from '../components/edit/EditCodeBox';
import CodeSettingBox from '../components/edit/CodeSettingBox';
import { Button, Collapse, ConfigProvider, Input, Radio, RadioChangeEvent, ThemeConfig } from 'antd';
import store from '../store/store';
import { decrypt, encrypt } from '../utils/crypto';
import runes from 'runes2';
import { CloseCircleFilled, ReloadOutlined } from '@ant-design/icons';

const theme:ThemeConfig = {
  components: {
    Collapse: {
      headerBg: 'var(--color-bgBase)',
    },
    Radio: {
      borderRadiusSM: 2,
      paddingXS: 15,
      controlHeightSM: 27,
    },
    Card: {
      
    }
  },
}

const randomString = (length: number): string => {
  // const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }
  return result;
};

const EditCodePage = () => {
  const [ifEncrypt, setIfEncrypt] = useState(false);
  const [key, setKey] = useState(randomString(6));

  const onSubmit = () => {
    const data = store.getState().edit.editPageData;
    // TODO: 密码格式限制 && data格式校验
    if (ifEncrypt) {
      const e = encrypt(data, key);
      // TODO: 上传数据库
      // postMessage()
      console.log(e);
      console.log(decrypt(e, key));
      return;
    }
    // TODO: 上传数据库
  }
  
  return (
    <ConfigProvider theme={theme}>
    <div className='flex-row space-y-4'>

      {/* 代码编辑区域 */}
      <EditCodeBox />

      {/* 编辑设置区域 */}
      <Collapse size="small" defaultActiveKey={['1']}
      items={[{
        key: "1",
        label: "更多设置",
        children: <CodeSettingBox />,
        // headerClass: "items-start",
      }]}
      />

      {/* 提交按钮 */}
      <div className='flex-row text-text'>
        <div className='flex justify-between'>
          <Radio.Group defaultValue="public" buttonStyle="solid" size='small' name='encrypt' 
          onChange={ (e: RadioChangeEvent) => { setIfEncrypt(e.target.value === 'private') } }>
            <Radio.Button value="public">公开</Radio.Button>
            <Radio.Button value="private">加密</Radio.Button>
          </Radio.Group>

          <Button className='w-40 rounded-sm' size='small' type='primary'
          onClick={onSubmit}
          >提交</Button>
        </div>
        {/* 加密框 */}
        { ifEncrypt &&
        (<div className='flex w-60 text-text pt-2 space-x-2 items-center'>
          <Input
          prefix='密码 : '
          size='small'
          value={key}
          addonAfter={
            <button onClick={() => setKey('')}><CloseCircleFilled className="w-3"/></button>
          }
          count={{
            show: false,
            max: 16,
            strategy: (txt) => runes(txt).length,
            exceedFormatter: (txt, { max }) => runes(txt).slice(0, max).join(''),
          }}
          onChange={(e) => setKey(e.target.value)}
          />
          <Button onClick={() => setKey(randomString(6))}
          className='border-none' size='small' variant='text' shape='circle' icon={<ReloadOutlined />} ghost/>
        </div>)}
      </div>
    </div>
    </ConfigProvider>
  );
};

export default EditCodePage;
