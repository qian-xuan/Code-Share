import HeaderMenu from './components/HeaderMenu'
import './App.css'
import CodeListPage from './pages/CodeListPage'
import CreateCodePage from './pages/CreateCodePage'
import { useMemo, useState } from 'react'
import CardSharePage from './pages/CardSharePage'


function App() {
  // 使用字符串存储当前页面标识符
  const [currentPage, setCurrentPage] = useState('create');

  // 根据当前页面标识符动态渲染组件
  // const renderPage = () => {
  //   if (currentPage === 'codeList') return <CodeListPage />;
  //   if (currentPage === 'cardShare') return <CardSharePage />;
  //   return <CreateCodePage />; // 默认返回创建页面
  // };
  
  const memoizedPage = useMemo(() => {
    if (currentPage === 'codeList') return <CodeListPage />;
    if (currentPage === 'cardShare') return <CardSharePage />;
    return <CreateCodePage />; // 默认返回创建页面
  }, [currentPage]);


  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("themeMode", newTheme);
  };

  return (
    <div className="justify-items-center">
      {/* 将 setCurrentPage 传递给 HeaderMenu */}
      <HeaderMenu selectPage={setCurrentPage} />

      {/* 动态渲染 Page 组件 */}
      <div id="pageBody" className="w-9/12 pt-5">
        {/* {renderPage()} */}
        {memoizedPage}
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
