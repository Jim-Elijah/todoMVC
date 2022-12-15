const Koa = require("koa");
const bodyParser = require("koa-bodyparser");
const { decode, } = require('./utils/base64')
const { connect } = require('./model')
const routing = require('./routes');
const { isProd } = require('./utils/config')
const { log, errLogger, resLogger } = require('./utils/log4js')

connect()

const app = new Koa();


// 通过log4js记录访问日志
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const end = new Date() - start
  // 生产环境下，使用中间件记录日志，使用console.log打印消息。
  // 其他环境下，使用log4js的console打印信息。
  console.log('isProd', isProd, process.env.NODE_ENV)
  if (isProd) {
    resLogger(ctx, end)
    console.log((`${ctx.method} ${ctx.url} - ${end}ms`))
  } else {
    log.info(`${ctx.method} ${ctx.url} - ${end}ms`)
  }
})

// error-handling
app.on('error', (err, ctx) => {
  if (isProd) {
    errLogger(ctx, err);
    log.error(`${ctx.method} ${ctx.url}`, err)
  } else {
    console.error(`${ctx.method} ${ctx.url}`, err)
  }
})

app.use(bodyParser())
app.use(async (ctx, next) => {
  const { body, url, header, method } = ctx.request || {}
  const { authorization } = header || {}

  ctx.set({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': '*',
    'Access-Control-Allow-Headers': 'Content-Type, token, authorization',
    'Access-Control-Expose-Headers': '*',
    'Content-Type': 'application/json;charset=utf-8',
  })
  ctx.status = 200

  console.log(`${method} ${url} ${authorization}`)
  let token = authorization ? JSON.parse(decode(authorization)) : {}
  console.log('token', token);
  const { uid, expire } = token
  ctx.state.uid = uid
  console.log('ctx.state', ctx.state);
  const cur = (new Date()).getTime()
  if (cur >= expire) {
    ctx.status = 500
    ctx.response.set('Content-Type', 'application/json;charset=utf-8')
    ctx.response.body = JSON.stringify(
      {
        msg: 'token已过期, 请重新登录!',
        code: 505,
        data: null
      }
    )
    console.log('重新登录')
    return
  }
  await next()
})

routing(app)


app.listen(8080, () => {
  console.log('server is running at 8080...')
});
