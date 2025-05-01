import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import HeaderMenu from './components/HeaderMenu'
import EditCodePage from './pages/EditCodePage'
import CodeListPage from './pages/CodeListPage'
import CardSharePage from './pages/CardSharePage'
import { Button } from 'antd'
import { SunOutlined } from '@ant-design/icons'
import { useContext } from 'react'
import { GlobalThemeContext } from './contexts/GlobalThemeContext'


function App() {
  const { setThemeMode, themeMode } = useContext(GlobalThemeContext)!;

  const toggleTheme = () => {
    setThemeMode(themeMode === 'dark' ? 'light' : 'dark');
    // console.log(getComputedStyle(document.documentElement).getPropertyValue('--color-pageBg').trim());
  };

  return (
    <div className='flex justify-around min-h-screen'>
      <div id="app" className='justify-items-center text-text pt-[2rem] pb-[2rem] w-full min-w-[1080px] max-w-[1280px]'>
        
        {/* 顶部菜单 */}
        <HeaderMenu />

        {/* 动态渲染 Page 组件 */}
        <div className="w-9/12 pt-5">
          <Routes>
            <Route path="/" element={<Navigate to ="/codes" />} />
            <Route path="/create" element={<EditCodePage key="create" />} />
            <Route path="/codes" element={<CodeListPage />} />
            <Route path="/share" element={<CardSharePage />} />
          </Routes>
        </div>

        {/* 主题切换按钮 */}
        <Button size='large' shape='circle' icon={<SunOutlined />} onClick={toggleTheme} 
        className='fixed bottom-5 right-5'/>
      
      </div>
    </div>
  );
}

export default App;
