import Koa from 'koa'
import Router from '@koa/router'
import serve from 'koa-static'
import bodyParser from 'koa-bodyparser';
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs';
import { Sequelize, DataTypes, json } from 'sequelize';

const hostname = "localhost"
const post = 3001

const app = new Koa()
const router = new Router()

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const staticPath = path.join(__dirname, '/dist')

app.use(bodyParser({
  enableTypes: ['json', 'form', 'text'],
}));

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',  // 数据库文件路径
});

// CodeData 模型
const CodeData = sequelize.define('CodeData', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  data: {
    type: DataTypes.JSON,
    allowNull: false,
  }
});
// 加密数据模型
const Encrypted = sequelize.define('Encrypted', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  data: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

// 同步模型到数据库
sequelize.sync();

// 提供静态文件服务
app.use(serve(staticPath));

// 交由前端 Routes 处理的页面
const frontRoutes = ['/create', 'edit', '/codes', '/share', '/display']
app.use(async (ctx, next) => {
  await next();
  const pathname = ctx.URL.pathname;
  console.log(pathname)
  if ((ctx.method === 'GET') && frontRoutes.includes(pathname)) {
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
router.get('/api/get/codedata', async (ctx) => {
  try {
    const id = Number(ctx.query.id); // 获取查询参数 id
    console.log('Received ID:', id);

    if (id) {
      // 如果提供了 id 参数，则查询特定记录
      const user = await CodeData.findByPk(id); // 使用主键查询
      if (user) {
        ctx.body = {
          // 返回数据模型
          codedata: user.dataValues.data,
          id: user.dataValues.id,
          encrypted: false,
          createdAt: user.dataValues.createdAt,
        };
      } else {
        ctx.status = 404;
        ctx.body = { error: 'Record not found' };
      }
    } else {
      // TODO: 统一逻辑至↑
      // 如果未提供 id 参数，则返回所有记录
      const users = await CodeData.findAll();
      ctx.body = users;
    }
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch users' };
  }
});

router.get('/api/get/codedata/encrypted', async (ctx) => {
  try {
    const id = Number(ctx.query.id); // 获取查询参数 id
    console.log('Received ID:', id);

    if (id) {
      // 如果提供了 id 参数，则查询特定记录
      const user = await Encrypted.findByPk(id); // 使用主键查询
      console.log(user);
      if (user) {
        ctx.body = user;
      } else {
        ctx.status = 404;
        ctx.body = { error: 'Record not found' };
      }
    }
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to fetch users' };
  }
});

router.post('/api/post/codedata', async (ctx) => {
  try {
    const data = ctx.request.body;
    const newCode = await CodeData.create({ data: data });
    // console.log(newCode)
    ctx.body = { id: newCode.dataValues.id, createdAt: newCode.dataValues.createdAt };
  } catch (err) {
    console.error('Error creating record:', err);
    ctx.status = 500;
    ctx.body = { error: 'Failed to create' };
  }
});

router.post('/api/post/codedata/encrypted', async (ctx) => {
  try {
    const encrypted = ctx.request.body;
    console.log(encrypted)
    const newCode = await Encrypted.create({ data: encrypted });
    ctx.body = { id: newCode.dataValues.id, createdAt: newCode.dataValues.createdAt };
  } catch (err) {
    console.error('Error creating record:', err);
    ctx.status = 500;
    ctx.body = { error: 'Failed to create' };
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