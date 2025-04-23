import React, { useState } from 'react';
import EditCodeBox from '../components/create/EditCodeBox';

const CreateCodePage: React.FC = () => {
  const [FCName, setFCName] = useState('');

  return (
    <div className='flex-row space-y-4'>
      <EditCodeBox FCName={FCName} />
      <div className='h-20 border-[1px] border-gray-600'>
        <input type="text"  className='bg-gray-600' 
        onChange={(e) => setFCName(e.target.value)}/>
      </div>
    </div>
  );
};

export default CreateCodePage;