const Router = require('koa-router');
const crypto = require('crypto');
const { User } = require('../model');
const { encode } = require('../utils/base64')
const router = new Router({ prefix: '/user' });

// 用户注册
// done
router.post('/register', async (ctx) => {
    const { body: postData } = ctx.request || {}
    console.log('register data', postData)

    // 用户名是否已注册
    const doc = await User.findOne({ username: postData.username }).exec()
    if (doc) {
        console.log('用户名已注册');
        ctx.response.body = JSON.stringify(
            {
                message: '用户名已注册',
                code: 401,
                data: null
            }
        )
        return
    }
    // 注册
    let uid = Math.random().toString().slice(-10)
    postData.password = crypto.createHash("md5").update(postData.password).digest('hex');
    let user = new User({ uid, ...postData })
    const data = await user.save()
    if (!data) {
        console.log('注册失败');
        ctx.response.body = JSON.stringify(
            {
                message: '注册失败',
                code: 500,
                data: null
            }
        )
        return
    }
    console.log('注册成功');
    ctx.response.body = JSON.stringify(
        {
            msg: '注册成功',
            code: 200,
            data: {}
        }
    )
})

// 用户登录
// done
router.post('/login', async (ctx) => {
    const { body: postData } = ctx.request || {}
    console.log('login data', postData)
    const user = { ...postData }
    user.password = crypto.createHash("md5").update(user.password).digest('hex');
    // findOne返回对象
    const doc = await User.findOne({ username: user.username }).exec()
    console.log('doc', doc);
    // 验证用户名
    if (!doc) {
        console.log('用户名不存在')
        ctx.response.body = (JSON.stringify(
            {
                message: '用户名不存在',
                code: 401,
                data: null
            }
        ))
        return
    }
    // 验证密码
    if (user.password !== doc.password) {
        console.log('密码错误')
        ctx.response.body = (JSON.stringify(
            {
                message: '密码错误',
                code: 401,
                data: null
            }
        ))
        return
    }
    console.log('登录成功');
    // 24小时内有效
    const expire = (new Date()).getTime() + 1000 * 60 * 60 * 24
    const { uid, username } = doc || {}
    const token = { uid, username, expire }
    const data = JSON.stringify({
        message: '登录成功',
        code: 200,
        data: encode(token),
    })
    ctx.response.body = data
    console.log('登录返回信息', data)
})

module.exports = router;
