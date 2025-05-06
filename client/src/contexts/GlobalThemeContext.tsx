import { ConfigProvider, ThemeConfig } from "antd";
import { createContext, ReactNode, useMemo, useState } from "react";


// 定义主题色类型
export type ThemeMode = 'light' | 'dark';
const defaultThemeMode:ThemeMode = 'light';

// 定义各主题色色值
const themeColors: Record<ThemeMode, ThemeConfig['token']> = {
  light: {
    colorBgBase: '#8ecae6',
    colorPrimary: '#023e8a',
    colorTextBase: '#000000',
  },
  dark: {
    colorBgBase: '#6c757d',
    colorPrimary: '#E3FA43',
    colorTextBase: '#F5F5F5',
  },
};

// antd config 默认主题, 包括颜色和其余配置
const defaultTheme:ThemeConfig = {
  token: {
    ...themeColors[defaultThemeMode],
    borderRadius: 3,
    lineWidth: 2,
  },
}
document.documentElement.style.setProperty('--width-line', defaultTheme.token!.lineWidth!.toString());

// themeContext 属性接口
export interface GlobalThemeContextProps {
  themeMode: ThemeMode,
  setThemeMode: (newTheme: ThemeMode) => any,
  themeConfig?: ThemeConfig,
}

// 设置全局 css 变量，tailwind config 对其引用，实现 tailwind 自定义颜色变量与 antd 协同使用
const setGlobalColorCSS = (t: ThemeMode) => {
  // Test sample
  document.documentElement.style.setProperty('--color-bgBase', themeColors[t]!.colorBgBase!);
  document.documentElement.style.setProperty('--color-primary', themeColors[t]!.colorPrimary!);
  document.documentElement.style.setProperty('--color-text', themeColors[t]!.colorTextBase!);
}
// 初始化变量
setGlobalColorCSS(defaultThemeMode);

// 全局主题 Context
export const GlobalThemeContext = createContext<GlobalThemeContextProps | undefined>(undefined);

export const GlobalThemeProvider: (props: { children: ReactNode }) => ReactNode = ({ children }) => {
  const [globalThemeMode, setGlobalThemeMode] = useState<ThemeMode>(defaultThemeMode);

  // // 获取 antd default token
  // const token = theme.useToken().token;
  // // 拼接 SEEDTOKEN
  // const SEEDTOKEN = useMemo(() => {return {...token, ...defaultTheme.token}}, []);
  // // 使用SEEDTOKEN
  // const globalThemeConfig = useMemo<ThemeConfig>(() =>
  //   { return {token: { ...SEEDTOKEN, ...themeColors[globalThemeMode] }} }, [globalThemeMode]);


  const globalThemeConfig = useMemo<ThemeConfig>(() =>
    { return {token: { ...defaultTheme.token, ...themeColors[globalThemeMode] }} }, [globalThemeMode]);


  // 主题色模式改变时逻辑链
  const themeModeChangeTo = (t: ThemeMode) => {
    setGlobalColorCSS(t);
    setGlobalThemeMode(t);
  }
  
  const newThemeContext: GlobalThemeContextProps = {
    themeMode: globalThemeMode,
    setThemeMode: themeModeChangeTo,
  }

  return (
    <GlobalThemeContext.Provider value={ newThemeContext }>
      <ConfigProvider theme={ globalThemeConfig }>
        { children }
      </ConfigProvider>
    </GlobalThemeContext.Provider>
  );
}