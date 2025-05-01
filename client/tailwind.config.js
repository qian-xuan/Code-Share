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
        line: 'var(--width-line)',
        primary: 'var(--color-primary)',
        bgBase: 'var(--color-bgBase)',
        text: 'var(--color-text)',
      },
    },
  },
  plugins: [],
}