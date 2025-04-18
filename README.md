# Code-Share

## 项目简介
Code-Share 是一个基于 React 和 Koa 的全栈项目，前端使用 Vite 构建，后端使用 Koa 提供 API 和静态文件服务。该项目支持前后端分离的开发模式，并通过代理解决跨域问题。

---

## 脚本命令

### 根目录脚本
- **`npm run build`**  
  打包前端代码，生成生产环境的静态文件，输出到 `server/dist` 目录。

- **`npm start`**  
  打包前端代码后，启动后端 Koa 服务器，默认运行在 [http://localhost:3001](http://localhost:3001)。

- **`npm run dev`**  
  同时启动前端开发服务器（Vite）和后端开发服务器（Koa）。  
  - 前端运行在 [http://localhost:3000](http://localhost:3000)。  
  - 后端运行在 [http://localhost:3001](http://localhost:3001)。

---