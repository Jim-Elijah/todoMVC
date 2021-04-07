const { TodoItem } = require('.');

addTodo = (item) => {
  console.log('addTodo', item)
  let todo = new TodoItem(item)
  todo.save((err1, doc1) => {   //存储数据
    if (err1) {
      console.error('保存失败！ ', err1);
      // res.end('保存失败！ ', err1);
    }
    else {
      console.log(doc1, '添加待办事项成功！');
      // res.end('success')
    }
  })
}

findTodo = (query) => {
  console.log('findTodo', query)
  TodoItem.find(query, (err, doc) => {
    if (err) {
      console.error('find失败！', err);
      return;
    }
    console.log('doc', doc, Array.isArray(doc));
    if (doc.length !== 0) {
      let data = []
      doc.forEach(item => {
        data.push({
          id: item.id,
          title: item.title,
          competed: item.completed
        })
      })
      console.log('查询成功！', data);
      // res.end(JSON.stringify(
      //   {
      //     msg: '查询成功！',
      //     data: data
      //   }
      // ))
    }
    else {
      console.log('没有待办事项！')
      // res.end('没有待办事项！ ')
    }
  })
}

toggleTodo = (condition) => {
  console.log('toggleTodo', condition)
  let { uid, id, completed } = condition
  TodoItem.updateOne({ 'uid': uid, 'id': id }, { 'completed': completed }, (err, doc) => {
    if (err) {
      return console.error(err)
    }
    console.log('toggle success!')
  })
}

updateListVal = (condition) => {
  console.log('updateListVal', condition)
  let { uid, id, title } = condition
  TodoItem.updateOne({ 'uid': uid, 'id': id }, { 'title': title }, (err, doc) => {
    if (err) {
      return console.error(err)
    }
    console.log('updateListVal success!')
  })
}

deleteTodo = (condition)=> {
  console.log('deleteTodo', condition)
  let { uid, id } = condition
  TodoItem.remove({ 'uid': uid, 'id': id }, (err, doc) => {
    if (err) {
      return console.error(err)
    }
    console.log('deleteTodo success!')
  })
}

// addTodo({ "uid": ""0767511345", "id": "84298", "title": "addtodo1", completed: false })
// addTodo({ "uid": "0767511345", "id": "84278", "title": "addtodo2", completed: false })
// addTodo({ "uid": "0767511345", "id": "84268", "title": "addtodo3", completed: false })
// findTodo({ uid: "0767511345" })
// toggleTodo({ "uid": "0767511345", "id": "84268", completed: true })
// updateListVal({ "uid": "0767511345", "id": "84268", 'title': 'title'})
deleteTodo({ "uid": "0767511345", "id": "84278"})
findTodo({ uid: "0767511345" })

