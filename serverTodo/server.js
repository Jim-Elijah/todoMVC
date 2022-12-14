const Koa = require("koa");
const Router = require("koa-router");
const bodyParser = require("koa-bodyparser");
const crypto = require('crypto');
const { User, TodoItem } = require('./model');
const { encode, decode, } = require('./utils/base64')

const app = new Koa();
const router = new Router();

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
  console.log('token', token, typeof token);
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


router.get('/', async (ctx, next) => {
  ctx.type = 'html';
  ctx.body = '<h1>hello world!</h1>';
  await next()
})
router.get("/users", async (ctx, next) => {
  ctx.set('Content-Type', 'application/json;charset=utf-8')
  ctx.response.body = JSON.stringify({
    msg: '出现故障！',
    code: 0,
    data: '12332'
  });
  await next()
})

// 用户注册
router.post('/register', async (ctx, next) => {
  const { body: postData } = ctx.request || {}
  console.log('reg request', postData, typeof postData)
  postData.password = crypto.createHash("md5").update(postData.password).digest('hex');
  // const doc = await User.findOne({ username: postData.username })
  User.find({ username: postData.username })
    .then(async (doc) => {
      console.log('doc', doc);
      //   // 用户名已存在
      if (Array.isArray(doc) && doc.length) {
        console.error('用户名已存在！');
        ctx.response.body = JSON.stringify(
          {
            msg: '用户名已存在！',
            code: 0,
            data: []
          }
        )
        await next()
        return
      }
      // 用户名不存在，可以注册
      let uid = Math.random().toString().slice(-10) // id 累加;
      let user = new User({ uid, ...postData })
      const data = await user.save()
      if (data) {
        console.log('注册成功！', data);
        ctx.response.body = JSON.stringify(
          {
            msg: '注册成功！',
            code: 1,
            data: []
          }
        )
        await next()
        return
      }
      console.error('保存失败！ ', err1);
      ctx.response.body = JSON.stringify(
        {
          msg: '保存失败！',
          code: 0,
          data: []
        }
      )
      console.log('end reg');
      await next()
      return
    })
    .catch(err => {
      console.log('err', err)
      ctx.response.body = JSON.stringify(
        {
          msg: '出现故障！',
          code: 0,
          data: []
        }
      )
      return
    })
})

// 用户登录
router.post('/login', async (ctx, next) => {
  const { body: postData } = ctx.request || {}
  console.log('reg request', postData, typeof postData)
  const user = { ...postData }
  user.password = crypto.createHash("md5").update(user.password).digest('hex');
  console.log('login ', user)
  // find查询的doc是数组
  await User.find({ username: user.username }, (err, doc) => {
    if (err) {
      console.error(err);
      ctx.response.body = (JSON.stringify(
        {
          msg: '出现故障！',
          code: 0,
          data: []
        }
      ))
    }
    else if (doc.length === 0) {
      console.error('用户名不存在！')
      ctx.response.body = (JSON.stringify(
        {
          msg: '用户名不存在！',
          code: 0,
          data: []
        }
      ))
    }
    else if (user.password === doc[0].password) {
      console.log('登录成功！');
      // 8小时内有效
      const expire = (new Date()).getTime() + 1000 * 60 * 60 * 8
      const { uid, username } = doc[0] || {}
      const token = { uid, username, expire }
      let data = JSON.stringify({
        msg: '登录成功！',
        code: 1,
        data: encode(token),
      })
      ctx.response.body = data
      console.log('用户信息，', data)
    }
    else {
      console.log('密码错误！')
      ctx.response.body = (JSON.stringify(
        {
          msg: '密码错误！',
          code: 0,
          data: []
        }
      ))
    }
  })
  await next()
})

// 添加todo
router.post("/todo", async (ctx, next) => {
  const { body: postData } = ctx.request || {}
  console.log('reg request', postData, typeof postData)
  const item = { ...postData }
  const { uid } = ctx.state || {}
  let todo = new TodoItem({ ...item, uid })
  await todo.save((err1, doc1) => {   //存储数据
    if (err1) {
      console.error('出现故障 ', err1);
      ctx.response.body = (JSON.stringify(
        {
          msg: '出现故障',
          code: 0,
          data: []
        }
      ))
    }
    else {
      console.log('添加成功！');
      ctx.response.body = (JSON.stringify(
        {
          msg: '添加成功！',
          code: 1,
          data: []
        }
      ))
      console.log('添加todoItem', doc1)
    }
  })
  await next()
});

// 获取todoList
router.get("/todo", async (ctx, next) => {
  const { uid } = ctx.state || {}
  await TodoItem.find({ uid }, (err, doc) => {
    if (err) {
      console.error(err);
      ctx.status = 500
      ctx.response.body = JSON.stringify(
        {
          msg: '出现故障',
          code: 0,
          data: []
        }
      )
      return
    }
    console.log('doc', doc)
    let data = []
    doc.forEach(item => {
      data.push({
        uid: item.uid,
        id: item.id,
        title: item.title,
        completed: item.completed
      })
    });
    console.log('查询成功！');
    ctx.status = 200
    ctx.response.body = JSON.stringify(
      {
        msg: '查询成功！',
        code: 1,
        data: data
      }
    )
  })
  await next()
});

// 更新todo text
router.put('/todo', async (ctx, next) => {
  const { body: postData } = ctx.request || {}
  console.log('reg request', postData, typeof postData)
  const item = { ...postData }
  console.log('updateListVal', item)
  let { id, title } = item
  await TodoItem.updateOne({ 'id': id }, { 'title': title }, (err, doc) => {
    if (err) {
      console.error('updateListVal失败', err)
      ctx.response.body = (JSON.stringify(
        {
          msg: 'updateListVal失败',
          code: 0,
          data: []
        }
      ))
    }
    console.log('updateListVal success!')
    ctx.response.body = (JSON.stringify(
      {
        msg: 'updateListVal success',
        code: 1,
        data: []
      }
    ))
  })
  await next()
})

// 切换todo状态
router.patch('/todo', async (ctx, next) => {
  const { body: postData } = ctx.request || {}
  console.log('reg request', postData, typeof postData)
  const item = { ...postData }
  let { id, completed } = item
  await TodoItem.updateOne({ 'id': id }, { 'completed': completed }, (err, doc) => {
    if (err) {
      console.error('出现故障！', err)
      ctx.response.body = (JSON.stringify(
        {
          msg: '出现故障！',
          code: 0,
          data: []
        }
      ))
      return
    }
    console.log('toggleCompleted success!')
    ctx.response.body = (JSON.stringify(
      {
        msg: 'toggleCompleted success',
        code: 1,
        data: []
      }
    ))
  })
  await next()
})

router.delete('/todo', async (ctx, next) => {
  const { query } = ctx.request || {}
  const { id } = query || {}
  await TodoItem.deleteOne({ 'id': id }, (err, doc) => {
    if (err) {
      console.error('出现故障', err)
      ctx.response.body = (JSON.stringify(
        {
          msg: '出现故障',
          code: 0,
          data: []
        }
      ))
      return
    }
    console.log('delete success!')
    ctx.response.body = (JSON.stringify(
      {
        msg: 'delete success!',
        code: 1,
        data: []
      }
    ))
  })
  await next()
})

router.delete('/clear', async (ctx, next) => {
  const { uid } = ctx.state || {}
  await TodoItem.remove({ uid }, (err, doc) => {
    if (err) {
      console.error('出现故障', err)
      ctx.response.body = JSON.stringify(
        {
          msg: '出现故障',
          code: 0,
          data: []
        }
      )
      return
    }
    console.log('clear success!')
    ctx.response.body = JSON.stringify(
      {
        msg: 'clear success!',
        code: 1,
        data: []
      }
    )
  })
  await next()
})
app.use(router.routes()).use(router.allowedMethods());

app.listen(8080, () => {
  console.log('server is running at 8080...')
});
