const Router = require('koa-router');
const { TodoItem } = require('../model');

const router = new Router({ prefix: '/todo' });

// 添加todo
// done
router.post("/", async (ctx) => {
    const { body: postData } = ctx.request || {}
    console.log('todo data', postData)
    const item = { ...postData }
    const { uid } = ctx.state || {}
    let todo = new TodoItem({ ...item, uid })
    const data = await todo.save()
    console.log('saved data', data)
    if (!data) {
        console.log('添加失败');
        ctx.response.body = JSON.stringify(
            {
                message: '添加失败',
                code: 500,
                data: null
            }
        )
        return
    }
    console.log('添加成功！');
    ctx.response.body = JSON.stringify(
        {
            message: '添加成功',
            code: 200,
            data: {}
        }
    )
});

// 获取todoList
router.get("/", async (ctx) => {
    const { uid } = ctx.state || {}
    const doc = await TodoItem.find({ uid }).exec()
    // console.log('doc', doc)
    if (!doc) {
        console.log('获取todoList失败');
        ctx.status = 500
        ctx.response.body = JSON.stringify(
            {
                message: '获取todoList失败',
                code: 500,
                data: null,
            }
        )
        return
    }
    const data = doc.map(({ id, title, completed }) => ({ id, title, completed }))
    console.log('获取todoList成功');
    ctx.status = 200
    ctx.response.body = JSON.stringify(
        {
            message: '获取todoList成功',
            code: 200,
            data,
        }
    )
})

// 更新todo
// done
router.put('/', async (ctx) => {
    const { body: postData } = ctx.request || {}
    console.log('todo data', postData)
    const item = { ...postData }
    let { id, title, completed } = item
    const updateData = title ? { title } : { completed }
    const doc = await TodoItem.updateOne({ id }, updateData)
    if (!doc) {
        console.log('更新todo失败')
        ctx.response.body = JSON.stringify(
            {
                message: '更新todo失败',
                code: 500,
                data: null,
            }
        )
        return
    }
    console.log('更新todo成功')
    ctx.response.body = JSON.stringify(
        {
            message: '更新todo成功',
            code: 200,
            data: {}
        }
    )
})


// 删除todo
// done
// TODO param参数
router.delete('/:id', async (ctx) => {
    const { params } = ctx.request || {}
    const { id } = params || {}
    console.log('todo data', id, JSON.stringify(params))
    const count = await TodoItem.deleteOne({ id })
    // 删除count成功的返回值 { deletedCount: 1 }
    if (!count) {
        console.log('删除todo失败')
        ctx.response.body = JSON.stringify(
            {
                message: '删除todo失败',
                code: 500,
                data: null
            }
        )
        return
    }
    console.log('删除todo成功')
    ctx.response.body = JSON.stringify(
        {
            message: '删除todo成功',
            code: 200,
            data: {}
        }
    )
})

// 清空todo
// done
router.delete('/clear', async (ctx) => {
    const { uid } = ctx.state || {}
    console.log('todo data', uid)
    const count = await TodoItem.deleteMany({ uid })
    // 删除count成功的返回值 { deletedCount: 1 }
    if (!count) {
        console.log('清空todo失败')
        ctx.response.body = JSON.stringify(
            {
                message: '清空todo失败',
                code: 500,
                data: null
            }
        )
        return
    }
    console.log('清空todo成功')
    ctx.response.body = JSON.stringify(
        {
            message: '清空todo成功',
            code: 200,
            data: {}
        }
    )
})

module.exports = router;