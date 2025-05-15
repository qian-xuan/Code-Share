import { useState } from 'react';
import EditCodeBox from '../components/edit/EditCodeBox';
import CodeSettingBox from '../components/edit/CodeSettingBox';
import { Button, Collapse, ConfigProvider, Input, Radio, RadioChangeEvent, ThemeConfig } from 'antd';
import store from '../store/store';
import { encrypt } from '../utils/crypto';
import runes from 'runes2';
import { CloseCircleFilled, ReloadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { setCreatedAt, setEncrypted, setID, setValidated } from '../store/editPageSlice';
import { useNavigate } from 'react-router-dom';
import { setIfReadOnly, setPage } from '../store/editorSettingsSlice';
import { CodeData } from '../types/CodeData';

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

const validationCheck = (codedata: CodeData) => {
  if (codedata.settings.title === '') {
    alert('标题不能为空');
    return false;
  }
  if (codedata.settings.description === '') {
    alert('请添加描述');
    return false;
  }

  return true;
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
  const dispatch = useDispatch();

  const [ifEncrypt, setIfEncrypt] = useState(false);
  const [key, setKey] = useState(randomString(6));
  const navigate = useNavigate();

  // TODO: 判断id合法性，决定更新或新建提交
  // 通用的提交函数
  const submitData = async (url: string, body: any, headers: HeadersInit) => {
    try {
      // 批量添加 测试用
      // for (let i = 0; i < 10; i++) 
      //   fetch(url, {
      //   method: 'POST',
      //   headers,
      //   body,
      //   })

      const response = await fetch(url, {
        method: 'POST',
        headers,
        body,
      });

      if (!response.ok) {
        throw new Error('提交失败，请稍后重试');
      }

      const resJson = await response.json();
      console.log(resJson)
      dispatch(setID(resJson.id));
      dispatch(setCreatedAt(resJson.createdAt));
      dispatch(setValidated(false));
      dispatch(setIfReadOnly(true));
      dispatch(setPage(0));
      if (ifEncrypt) navigate(`/success?id=${resJson.id}&pwd=${key}`);
      else  navigate(`/success?id=${resJson.id}`);
    } catch (error) {
      console.error('Error:', error);
      alert(error || '提交失败');
    }
  };

  const onSubmit = () => {
    const data = store.getState().edit.editPageData;

    if (!validationCheck(data)) return;

    if (ifEncrypt) {
      const encrypted = encrypt(data, key);
      submitData('/api/post/codedata/Encrypted', encrypted, {
        'Content-Type': 'text/plain',
      });
    } else {
      submitData('/api/post/codedata', JSON.stringify(data), {
        'Content-Type': 'application/json',
      });
    }
  };
  
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
          onChange={ (e: RadioChangeEvent) => {
            setIfEncrypt(e.target.value === 'private');
            dispatch(setEncrypted(e.target.value === 'private'));
            } }>
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
