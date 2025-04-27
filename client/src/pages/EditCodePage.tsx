import React, { useMemo, useState } from 'react';
import EditCodeBox from '../components/create/EditCodeBox';
import { CodeDataContext } from '../contexts/CodeDataContext';
import { CodeData } from '../types/CodeData';
import CodeSettingBox from '../components/create/CodeSettingBox';
import { Collapse, ConfigProvider } from 'antd';

const EditCodePage: React.FC = () => {
  const ceateCodeCache = useMemo(() => new CodeData(), []);
  const [fcName, setFcName] = useState("");
  
  return (
    <CodeDataContext.Provider value={ceateCodeCache}>
      <div className='flex-row space-y-4'>


        {/* 代码编辑区域 */}
        <EditCodeBox fcName={fcName} />

        {/* 编辑设置区域 */}
        <ConfigProvider
          theme={{
            components: {
              Collapse: {
                headerBg: "var(--color-AC-3)",
                colorTextHeading: "var(--color-text)",
                contentBg: "var(--color-AC-2)",
                colorBorder: "var(--color-border)",
                borderRadiusLG: 0,
              },
            },
          }}
        >

          <Collapse size="small" defaultActiveKey={['1']}
          items={ [{
              key: "1",
              label: "更多设置",
              children: <CodeSettingBox setFcName={setFcName} />,
              // headerClass: "items-start",
            }] }
           />

        </ConfigProvider>
        

      </div>
    </CodeDataContext.Provider>
  );
};

export default EditCodePage;