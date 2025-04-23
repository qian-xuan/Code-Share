import React from 'react';

const AppleDots: React.FC = () => {
  return (
    <div className="inline-flex space-x-2 pr-2">
      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
    </div>
  );
}

export default AppleDots;