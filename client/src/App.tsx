import HeaderMenu from './components/HeaderMenu'
import './App.css'
import CodeListPage from './pages/CodeListPage'
import CreateCodePage from './pages/CreateCodePage'
import { useState } from 'react'


function App() {
  const [currentPage, setCurrentPage] = useState(<CreateCodePage />);

  // 根据当前 Menu 组件选择渲染不同的 Page 组件
  const selectPage = (s:string) => {
    switch (s) {
      case 'codeList':
        setCurrentPage(<CodeListPage />);
        return;
      case 'create':
        setCurrentPage(<CreateCodePage />);
        return;
      default:
        setCurrentPage(<CreateCodePage />);
        return;
    }
  };



  return (
    <div className='justify-items-center text-[#F5F5F5]'>
      <HeaderMenu selectPage={selectPage}/>

      {/* 动态渲染 Page 组件 */}
      <div id='pageBody' className='w-9/12 pt-5'>
        {currentPage}
      </div>

    </div>
  )
}

export default App
