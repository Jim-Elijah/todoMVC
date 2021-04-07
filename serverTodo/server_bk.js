const http = require('http');
const url = require('url');
const qs = require('querystring');
const { User, TodoItem } = require('./model/User');
const crypto = require('crypto');
// // const {a, hello, findTodo} = require('./CRUDtest')

const server = http.createServer((req, res) => {
  const { method, body } = req
  console.log(req.url, method)
  res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
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
            res.end('error');
          }
          // 用户名不存在，可以注册
          else if (doc.length === 0) {
            let uid = Math.random().toString().slice(-10) // id 累加;
            let user = new User({ uid, ...u })
            user.save((err1, doc1) => {   //存储数据
              if (err1) {
                console.error('保存失败！ ', err1);
                res.end('保存失败！ ');
                return;
              }
              else {
                console.log(doc1, '注册成功！');
                res.end('success');
                return;
              }
            })
          }
          else {
            console.error('用户名已存在！');
            res.end('用户名已存在！ ');
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
          console.log('登录doc', doc);
          if (err) {
            console.error(err);
            res.end('error');
          }
          else if (doc.length === 0) {
            console.error('用户名不存在！ ')
            res.end('用户名不存在！ ')
          }
          else if (u.password === doc[0].password) {
            console.log('登录成功！');
            let data = JSON.stringify({
              msg: '登录成功！',
              id: doc[0].id,
              username: doc[0].username
            })
            res.end(data)
            console.log('登录data', data)
          }
          else {
            console.log('密码错误！')
            res.end('密码错误！')
          }
        })
      }
      // 添加todo
      else if (req.url === '/todo') {
        let item = JSON.parse(postData);
        console.log('add todoItem', item)
        let todo = new TodoItem(item)
        todo.save((err1, doc1) => {   //存储数据
          if (err1) {
            console.error('保存失败！ ', err1);
            res.end('保存失败！ ');
          }
          else {
            console.log(doc1, '添加todoItem成功！');
            res.end('success')
          }
        })
      }
    })
  }
  else if (method.toUpperCase() == 'GET') {
    console.log('enter get')
    let { pathname, query } = url.parse(req.url, true);
    console.log('path', pathname)
    console.log('query', JSON.stringify(query))
    // 查询todo
    if (pathname === '/todo') {
      TodoItem.find(query, (err, doc) => {
        console.log('doc', doc);
        if (err) {
          console.error(err);
          res.end('error');
        }
        else if (doc.length !== 0) {
          let data = []
          doc.forEach(item => {
            data.push({
              id: item.id,
              title: item.title,
              completed: item.completed
            })
          });
          console.log('查询成功！');
          res.end(JSON.stringify(
            {
              msg: '查询成功！',
              data: data
            }
          ))
        }
        else {
          console.log('没有待办事项！');
          res.end('没有待办事项！ ')
        }
      })
    }
    // res.write('get'+JSON.stringify(query));
    // res.end();
  }
  else {
    res.end('other');
  }
})

server.listen(8080, () => {
  console.log('server is running at 8080...')
})