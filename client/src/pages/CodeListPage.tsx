import React from 'react';

const CodeListPage: React.FC = () => {
  // const id = store.getState().edit.id;
  // TODO: bug
  let datas;
  fetch('/api/get/codedata', {
        method: 'GET',
      })
      .then(res => {
        if (res.ok) return res.json();
      })
      .then(resJson => {
       datas = resJson;
      });

  console.log(datas)
  
  return (
    <>
      <h1>{datas}</h1>
    </>
  );
}

export default CodeListPage;