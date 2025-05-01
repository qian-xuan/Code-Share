import { ConfigProvider, ThemeConfig } from "antd";
import { createContext, useState } from "react";


// 定义主题色类型
export type ThemeMode = 'light' | 'dark';

// 定义各主题色色值
const themeColors: Record<ThemeMode, ThemeConfig['token']> = {
  light: {
    colorPrimary: '#E3FA43',
  },
  dark: {
    
  },
};

// antd config 默认主题色
const defaultTheme:ThemeConfig = {
  token: {
    ...themeColors.light
  },
}

// themeContext 属性接口
export interface GlobalThemeContextProps {
  getThemeMode: ThemeMode,
  setThemeMode: (newTheme: ThemeMode) => any,
  themeConfig?: ThemeConfig,
}

// 设置全局 css 变量，tailwind config 对其引用，实现 tailwind 自定义颜色变量与 antd 协同使用
const setGlobalColorCSS = (t: ThemeMode) => {
  // Test sample
  document.documentElement.style.setProperty('--color-accent', themeColors[t]!.colorPrimary!);
}

export const GlobalThemeContext = createContext<GlobalThemeContextProps | undefined>(undefined);

// !忽略这个 any , 先这样之后会改
export const GlobalThemeProvider: (props: any) => any = ({ children }) => {
  const [globalThemeMode, setGlobalThemeMode] = useState<ThemeMode>('light');
  const [globalThemeConfig, setGlobalThemeConfig] = useState<ThemeConfig>(defaultTheme);

  // 主题色模式改变时逻辑链
  const themeModeChangeTo = (t: ThemeMode) => {
    setGlobalColorCSS(t);
    setGlobalThemeMode(t);
    setGlobalThemeConfig({...defaultTheme, token: { ...themeColors[t] }});
  }
  
  const newThemeContext: GlobalThemeContextProps = {
    getThemeMode: globalThemeMode,
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