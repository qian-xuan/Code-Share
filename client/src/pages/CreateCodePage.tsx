import React, { useContext } from 'react';
import EditCodeBox from '../components/create/EditCodeBox';
import { Input } from 'antd';
import { CodeDataContext } from '../contexts/CodeDataContext';

const CreateCodePage: React.FC = () => {
  const [codeData, setCodeData] = useContext(CodeDataContext);
  
  return (
    <div className='flex-row space-y-4'>
      {/* 代码编辑器 */}
      <EditCodeBox />

      {/* 编辑设置 */}
      <div className='h-20 border-[1px] border-gray-600'>
        <input type="text"  className='bg-gray-600' 
        onChange={(e) => codeData.setting.title = e.target.value} />
      </div>

      <Input
        // className='bg-AC-0 text-textAccent'
        placeholder='请输入代码片段标题'
        onChange={(e) => setCodeData({...codeData, setting: {...codeData.setting, title: e.target.value}})}
        />
    </div>
  );
};

export default CreateCodePage;