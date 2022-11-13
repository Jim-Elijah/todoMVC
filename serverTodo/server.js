const http = require('http');
const url = require('url');
const qs = require('querystring');
const { User, TodoItem } = require('./model');
const { encode, decode, } = require('./utils/base64')
const crypto = require('crypto');

const server = http.createServer((req, res) => {
  const { method, body } = req
  console.log("get", req.headers, method)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, token, authorization");
  res.setHeader("Access-Control-Expose-Headers", "*");
  res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });

  const { authorization } = req.headers || {}
  let token = authorization ? JSON.parse(decode(authorization)) : {}
  console.log('token', token, typeof token);
  const { uid, expire } = token
  const cur = (new Date()).getTime()
  if (cur >= expire) {
    res.writeHead(505, { 'Content-Type': 'text/plain;charset=utf-8' });
    res.end(JSON.stringify(
      {
        msg: '',
        code: 505,
        data: null
      }
    ))
    console.log('重新登录')
  }
  if (method.toUpperCase() == 'POST') {
    console.log('enter post')
    let postData = "";
    req.on("data", (data) => { postData += data });
    req.on('end', () => {
      console.log('postdata', postData, typeof (postData))
      // 注册
      if (req.url === '/register') {
        let u = JSON.parse(postData);
        u.password = crypto.createHash("md5").update(u.password).digest('hex');
        console.log('reg ', u)
        User.find({ username: u.username }, (err, doc) => {
          if (err) {
            console.error(err);
            res.end(JSON.stringify(
              {
                msg: '出现故障！',
                code: 0,
                data: []
              }
            ))
          }
          // 用户名不存在，可以注册
          else if (doc.length === 0) {
            let uid = Math.random().toString().slice(-10) // id 累加;
            let user = new User({ uid, ...u })
            user.save((err1, doc1) => {   //存储数据
              if (err1) {
                console.error('保存失败！ ', err1);
                res.end(JSON.stringify(
                  {
                    msg: '保存失败！',
                    code: 0,
                    data: []
                  }
                ))
              }
              else {
                console.log(doc1, '注册成功！');
                res.end(JSON.stringify(
                  {
                    msg: '注册成功！',
                    code: 1,
                    data: []
                  }
                ))
              }
            })
          }
          else {
            console.error('用户名已存在！');
            res.end(JSON.stringify(
              {
                msg: '用户名已存在！',
                code: 0,
                data: []
              }
            ))
          }
        })
      }
      // 登录
      else if (req.url === '/login') {
        let u = JSON.parse(postData);
        u.password = crypto.createHash("md5").update(u.password).digest('hex');
        console.log('login ', u)
        // find查询的doc是数组
        User.find({ username: u.username }, (err, doc) => {
          if (err) {
            console.error(err);
            res.end(JSON.stringify(
              {
                msg: '出现故障！',
                code: 0,
                data: []
              }
            ))
          }
          else if (doc.length === 0) {
            console.error('用户名不存在！')
            res.end(JSON.stringify(
              {
                msg: '用户名不存在！',
                code: 0,
                data: []
              }
            ))
          }
          else if (u.password === doc[0].password) {
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
            res.end(data)
            console.log('用户信息，', data)
          }
          else {
            console.log('密码错误！')
            res.end(JSON.stringify(
              {
                msg: '密码错误！',
                code: 0,
                data: []
              }
            ))
          }
        })
      }
      // 添加todo
      else if (req.url === '/todo') {
        let item = JSON.parse(postData);
        console.log('add todoItem', item)
        let todo = new TodoItem({ ...item, uid })
        todo.save((err1, doc1) => {   //存储数据
          if (err1) {
            console.error('出现故障 ', err1);
            res.end(JSON.stringify(
              {
                msg: '出现故障',
                code: 0,
                data: []
              }
            ))
          }
          else {
            console.log('添加成功！');
            res.end(JSON.stringify(
              {
                msg: '添加成功！',
                code: 1,
                data: []
              }
            ))
            console.log('添加todoItem', doc1)
          }
        })
      }
    })
  }
  else if (method.toUpperCase() === 'GET') {
    console.log('enter get')
    let { pathname, query } = url.parse(req.url, true);
    console.log('path', pathname)
    console.log('query', JSON.stringify(query))
    // 查询todo
    if (pathname === '/todo') {
      TodoItem.find({ uid }, (err, doc) => {
        console.log('doc', doc);
        if (err) {
          console.error(err);
          res.end(JSON.stringify(
            {
              msg: '出现故障',
              code: 0,
              data: []
            }
          ))
        }
        else if (doc.length !== 0) {
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
          res.end(JSON.stringify(
            {
              msg: '查询成功！',
              code: 1,
              data: data
            }
          ))
        }
        else {
          console.log('没有待办事项！');
          res.end(JSON.stringify(
            {
              msg: '没有待办事项！',
              code: 0,
              data: []
            }
          ))
        }
      })
    }
    else if (pathname === '/user') {
      // 待完成
    }
  }
  // 更新listVal 或 更改密码
  else if (method.toUpperCase() === 'PUT') {
    console.log('enter put')
    let putData = "";
    req.on("data", (data) => { putData += data });
    req.on('end', () => {
      // console.log('postdata', putData, typeof (putData))
      // 更新listVal
      if (req.url === '/todo') {
        let item = JSON.parse(putData);
        console.log('updateListVal', item)
        let { id, title } = item
        TodoItem.updateOne({ 'id': id }, { 'title': title }, (err, doc) => {
          if (err) {
            console.error('updateListVal失败', err)
            res.end(JSON.stringify(
              {
                msg: 'updateListVal失败',
                code: 0,
                data: []
              }
            ))
          }
          else {
            console.log('updateListVal success!')
            res.end(JSON.stringify(
              {
                msg: 'updateListVal success',
                code: 1,
                data: []
              }
            ))
          }
        })
      }
      else if (req.url === '/user') {

      }
    })
  }
  // toggleCompleted
  else if (method.toUpperCase() === 'PATCH') {
    console.log('enter patch')
    let putData = "";
    req.on("data", (data) => { putData += data });
    req.on('end', () => {
      console.log('patchdata', putData)
      if (req.url === '/todo') {
        let item = JSON.parse(putData);
        console.log('new todoItem', item)
        let { id, completed } = item
        TodoItem.updateOne({ 'id': id }, { 'completed': completed }, (err, doc) => {
          if (err) {
            console.error('出现故障！', err)
            res.end(JSON.stringify(
              {
                msg: '出现故障！',
                code: 0,
                data: []
              }
            ))
          }
          else {
            console.log('toggleCompleted success!')
            res.end(JSON.stringify(
              {
                msg: 'toggleCompleted success',
                code: 1,
                data: []
              }
            ))
          }
        })
      }
      else if (req.url === '/user') {

      }
    })
  }
  // 删除todoItem
  else if (method.toUpperCase() === 'DELETE') {
    console.log('enter delete')
    let { pathname, query } = url.parse(req.url, true);
    console.log('path', pathname)
    console.log('query', JSON.stringify(query))
    if (pathname === '/todo') {
      const { id } = query || {}
      TodoItem.deleteOne({ 'id': id }, (err, doc) => {
        if (err) {
          console.error('出现故障', err)
          res.end(JSON.stringify(
            {
              msg: '出现故障',
              code: 0,
              data: []
            }
          ))
        }
        else {
          console.log('delete success!')
          res.end(JSON.stringify(
            {
              msg: 'delete success!',
              code: 1,
              data: []
            }
          ))
        }
      })
    }
    if (pathname === '/clear') {
      TodoItem.remove({ uid }, (err, doc) => {
        if (err) {
          console.error('出现故障', err)
          res.end(JSON.stringify(
            {
              msg: '出现故障',
              code: 0,
              data: []
            }
          ))
        }
        else {
          console.log('clear success!')
          res.end(JSON.stringify(
            {
              msg: 'clear success!',
              code: 1,
              data: []
            }
          ))
        }
      })
    }
  }
  else {
    // console.log(typeof(req), req)
    res.write('not match')
    res.end();
  }
})

server.listen(8080, () => {
  console.log('server is running at 8080...')
})