/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // 启用暗黑模式
  theme: {
    extend: {
      // 定义颜色配置，使用 CSS 变量实现动态主题切换
      // ./pages/index.css 中定义 CSS 变量
      colors: {
        pageBg: 'var(--color-pageBg)',           // 页面背景色
        accent: 'var(--color-accent)',           // 强调色
        text: 'var(--color-text)',               // 文字颜色
        textAccent: 'var(--color-text-accent)',  // 强调文字颜色
        textDisabled: 'var(--color-text-disabled)',  // 禁用文字颜色
        menuText: 'var(--color-menuText)',       // 菜单文字颜色
        border: 'var(--color-border)',           // 边框颜色
        // Area Colors
        AC: {
          0: 'var(--color-AC-0)',
          1: 'var(--color-AC-1)',
          2: 'var(--color-AC-2)',
          3: 'var(--color-AC-3)',
          4: 'var(--color-AC-4)',
        },
        testMark: 'var(--color-testMark)',        // 测试标记颜色
      },
    },
  },
  plugins: [],
}