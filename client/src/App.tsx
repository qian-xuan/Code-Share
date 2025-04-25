import './App.css'
import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HeaderMenu from './components/HeaderMenu'
import EditCodePage from './pages/EditCodePage'
import CodeListPage from './pages/CodeListPage'
import CardSharePage from './pages/CardSharePage'

// const MemoizedCreateCodePage = React.memo(CreateCodePage);

function App() {
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("themeMode", newTheme);
  };

  return (
    <div id="app" className="justify-items-center text-text pt-[2rem]">
      {/* 顶部菜单 */}
      <HeaderMenu />

      {/* 动态渲染 Page 组件 */}
      <div id="pageBody" className="w-9/12 pt-5">
        <Routes>
          <Route path="/" element={<Navigate to ="/codes" />} />
          {/* <Route path="/create" element={<MemoizedCreateCodePage />} /> */}
          <Route path="/create" element={<EditCodePage key="create" />} />
          <Route path="/codes" element={<CodeListPage />} />
          <Route path="/share" element={<CardSharePage />} />
        </Routes>
      </div>

      {/* 主题切换按钮 */}
      <div>
        <button
          onClick={toggleTheme}
          className="p-2 bg-accent text-textAccent rounded"
        >
          切换主题
        </button>
      </div>
    
    </div>
  );
}

export default App;
