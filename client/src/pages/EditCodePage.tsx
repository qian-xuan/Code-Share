import React, { useMemo, useState } from 'react';
import EditCodeBox from '../components/create/EditCodeBox';
import { CodeDataContext } from '../contexts/CodeDataContext';
import { CodeData } from '../types/CodeData';
import CodeSettingBox from '../components/create/CodeSettingBox';
import { Collapse, ConfigProvider, Radio, RadioChangeEvent, ThemeConfig } from 'antd';

const theme:ThemeConfig = {
  components: {
    Collapse: {
      headerBg: "var(--color-AC-3)",
      colorTextHeading: "var(--color-text)",
      contentBg: "var(--color-AC-2)",
      colorBorder: "var(--color-border)",
      borderRadiusLG: 0,
    },
    Radio: {
      colorBorder: "var(--color-border)",
      buttonBg: "var(--color-pageBg)",
      buttonColor: "var(--color-text)",
      buttonSolidCheckedBg: "var(--color-accent)",
      buttonSolidCheckedColor: "var(--color-textAccent)",
      buttonSolidCheckedHoverBg: "var(--color-accent)",
      colorPrimary: "var(--color-accent)",
      borderRadiusSM: 2,
      paddingXS: 15,
      controlHeightSM: 27,
    },
  },
}

const EditCodePage: React.FC<{ codeData?: CodeData }> = ({ codeData = new CodeData() }) => {
  const [beforeSubmit, setBeforeSubmit] = useState(false);
  const [fcName, setFcName] = useState("");
  const [ifEncrypt, setIfEncrypt] = useState(false);
  const codeDataCache = useMemo(() => codeData, [beforeSubmit]);
  // const codeDataCache = new CodeData();
  
  return (
    <CodeDataContext.Provider value={codeDataCache}>
      <div className='flex-row space-y-4'>


        {/* 代码编辑区域 */}
        <EditCodeBox fcName={fcName} />

        {/* 编辑设置区域 */}
        <ConfigProvider theme={theme}>
          <Collapse size="small" defaultActiveKey={['1']}
          items={ [{
              key: "1",
              label: "更多设置",
              children: <CodeSettingBox setFcName={setFcName} />,
              // headerClass: "items-start",
            }] }
           />


          {/* 提交按钮 */}
          <div className='flex-row text-text'>
            <div className='flex justify-between'>
              <Radio.Group defaultValue="public" buttonStyle="solid" size='small' name='encrypt' 
              onChange={ (e: RadioChangeEvent) => { setIfEncrypt(e.target.value === 'private') } }>
                <Radio.Button value="public">公开</Radio.Button>
                <Radio.Button value="private">加密</Radio.Button>
              </Radio.Group>

              <button className='w-40 bg-accent text-textAccent rounded-sm'
              onClick={() => setBeforeSubmit(!beforeSubmit)}
              >提交</button>
            </div>
            {/* 加密框 */}
            <div>

            </div>
          </div>
        </ConfigProvider>

        <button onClick={() => { console.log(codeData) }}
      className="p-2 bg-accent text-textAccent rounded fixed bottom-60  right-5">Test</button>

      </div>
    </CodeDataContext.Provider>
  );
};

export default EditCodePage;