import Koa from 'koa'
import Router from '@koa/router'
import serve from 'koa-static'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs';
import { Sequelize, DataTypes } from 'sequelize';

const hostname = "localhost"
const post = 3001

const app = new Koa()
const router = new Router()

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const staticPath = path.join(__dirname, '/dist')


const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',  // 数据库文件路径
});

// 定义模型
const CodeData = sequelize.define('CodeData', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  data: DataTypes.JSON,
});

// 同步模型到数据库
sequelize.sync();

// 提供静态文件服务
app.use(serve(staticPath));

const frontRoutes = ['/create', '/codes', '/share']
// get
app.use(async (ctx, next) => {
  await next();
  const pathname = ctx.URL.pathname;
  if ((ctx.method === 'GET') && frontRoutes.includes(pathname)) {
    console.log(pathname)
    const indexPath = path.join(staticPath, 'index.html');
    if (fs.existsSync(indexPath)) {
      ctx.type = 'html';
      ctx.body = fs.createReadStream(indexPath);
    } else {
      ctx.status = 404;
      ctx.body = '404 Not Found';
    }
  }
});

// 注册路由
router.get('/api/codedata', async (ctx) => {
  try {
    const users = await CodeData.findAll();
    ctx.body = users;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch users' };
  }
});

router.post('/api/codedata/', async (ctx) => {
  try {
    const { id, data } = ctx.request.body;
    const newUser = await CodeData.create({ id, data });
    ctx.body = newUser;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to create user' };
  }
});

app.use(router.routes())

app.listen(post, hostname, () => {
  console.log(`Server running at http://${hostname}:${post}/`)
})


// const Koa = require('koa')
// const path = require('path')
// const sendfile = require('koa-sendfile')
// const serve = require('koa-static')
// const app = new Koa()

// // static
// app.use(serve(path.join(__dirname, 'public')))

// // 404
// app.use(async (ctx, next) => {
//   await next()

//   if (ctx.status === 404) {
//     await sendfile(ctx, path.resolve(__dirname, 'public/index.html'))
//   }
// })

// app.listen(5000, () => {
//   console.log()
//   console.log('App runing in port 5000...')
//   console.log()
//   console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m5000/\x1b[0m`)
// })




// const Router = require('@koa/router')

// const staticReg = /\/.+\.(svg|png|jpg|png|jpeg|mp4|ogv)$/ // 还可以添加其他格式
// const router = new Router()

// router.get(staticReg, (ctx, next) => {
//   ctx.redirect(`http://localhost:5173${ctx.path}`)
// })

// module.exports = router



// const assets = require('./server/assets-router')
// // assets
// app.use(assets.routes()).use(assets.allowedMethods())