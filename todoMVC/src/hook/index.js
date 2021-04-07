import React, { useState, useEffect } from 'react'
import Input from './Input'
import List from './List'

function Hook() {
  const [flag, setFlag] = useState(false)
  const [list, setList] = useState([])

  // 新增一项
  function addItem(title) {
    // 使用 concat 返回不可变值
    setList(
      list.concat({
        id: Math.random().toString().slice(-5), // id 累加
        title,
        completed: false
      })
    )
  }
  // 删除一项
  function deleteItem(id) {
    console.log('delete', id);
    // 使用 filter 返回不可变值
    setList(list.filter(item => item.id !== id))
  }
  // 切换完成状态
  function toggleCompleted(id) {
    setFlag(!flag)
    setList(list.map(item => {
          const completed = item.id === id ? !item.completed : item.completed // 切换完成状态
          // 返回新对象
          return {
            ...item,
            completed
          }
        })
    )
  }
  // 读取本地存储的数据 
  function getData() {
    console.log('get data')
    var data = localStorage.getItem("todo");
    if (data !== null) {
      // 本地存储里面的数据是字符串格式的 但是我们需要的是对象格式的
      return JSON.parse(data);
    } else {
      return [];
    }
  }
  // 保存本地存储数据
  function saveData(data) {
    console.log('save data')
    localStorage.setItem("todo", JSON.stringify(data));
  }

  // 模拟DidMount
  useEffect(() => {
    console.log('didMount')
    setList(getData())
  }, [])

  // 模拟DidUpdate
  useEffect(() => {
    console.log('DidUpdate')
    saveData(list)
  }, [flag, list])

  return <div>
    <Input addItem={addItem}></Input>
    <List list={list}
      deleteItem={deleteItem}
      toggleCompleted={toggleCompleted}
    />
  </div>
}

export default Hook