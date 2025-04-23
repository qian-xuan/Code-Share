import Koa from 'koa'
import Router from '@koa/router'
import serve from 'koa-static'
import { fileURLToPath } from 'url'
import path from 'path'

const hostname = "localhost"
const post = 3001

const app = new Koa()
const router = new Router()

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const staticPath = path.join(__dirname, '/dist')
app.use(serve(staticPath))

// get
router.get('/codes', (ctx) => {
  ctx.body = 'Hello World!'
})

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