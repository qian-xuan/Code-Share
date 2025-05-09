import { useMemo, useState } from 'react';
import EditCodeBox from '../components/edit/EditCodeBox';
import CodeSettingBox from '../components/edit/CodeSettingBox';
import { Button, Collapse, ConfigProvider, Input, Radio, RadioChangeEvent, ThemeConfig } from 'antd';
import store from '../store/store';
import { encrypt } from '../utils/crypto';
import runes from 'runes2';
import { CloseCircleFilled, ReloadOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { seteditPageData, setEncrypted, setID, setValidated } from '../store/editPageSlice';
import { useNavigate } from 'react-router-dom';
import { defaultCodeData } from '../types/CodeData';

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
  useMemo(() => {
    const validated = store.getState().edit.validated;
    if (!validated) {
      const dispatch = useDispatch();
      dispatch(seteditPageData(defaultCodeData));
      dispatch(setValidated(true))
    }
  }, []);

  const [ifEncrypt, setIfEncrypt] = useState(false);
  const [key, setKey] = useState(randomString(6));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = () => {
    const data = store.getState().edit.editPageData;
    // TODO: 密码格式限制

    if (ifEncrypt) {
      const encrypted = encrypt(data, key);
      // 上传加密 data
      fetch('/api/post/codedata/Encrypted', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: encrypted,
      })
      .then(res => {
        // TODO: alert here
        if (res.ok) return res.json();
      })
      .then(resJson => {
        dispatch(setID(resJson.id));
        navigate(`/success?id=${resJson.id}`);
      });
    } else {
      // 上传非加密 data
      fetch('/api/post/codedata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
      })
      .then(res => {
        // TODO: alert here
        if (res.ok) return res.json();
      })
      .then(resJson => {
        dispatch(setID(resJson.id))
        navigate(`/success?id=${resJson.id}`);
      });
    }
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
