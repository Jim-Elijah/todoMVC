import React from 'react'
import Input from './Input'
import List from './List'
import axios from 'axios'

class State extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      completedChanged: false,
      titleUpdated: false,
      // newItemAdded: false,
      // isLocalStorage: true,
      isLocalStorage: false,
      user: { id: '', username: '' },
      list: [
        {
          id: 1,
          title: '标题1',
          completed: false
        }
      ]
    }
  }
  render() {
    return <div>
      <Input addItem={this.addItem}></Input>
      <List list={this.state.list}
        deleteItem={this.deleteItem}
        toggleCompleted={this.toggleCompleted}
        updateListValue={this.updateListValue}
      />
    </div>
  }

  // 新增一项
  addItem = (title) => {
    const list = this.state.list
    let listItem = {
      id: Math.random().toString().slice(-5), // id 累加
      title,
      completed: false
    }
    if (this.state.isLocalStorage) {
      console.log('add todoItem to local', title)
      this.setState({
        // 使用 concat 返回不可变值
        list: list.concat(listItem)
      })
    }
    else {
      console.log('add todoItem to server', title)
      axios({
        method: 'post',
        url: 'todo',
        data: {
          uid: this.state.id,
          ...listItem
        }
      })
        .then(function (response) {
          console.log('res', response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  // 删除一项
  deleteItem = (id) => {
    if (this.state.isLocalStorage) {
      console.log('delete from local', id)
      this.setState({
        // 使用 filter 返回不可变值
        list: this.state.list.filter(item => item.id !== id)
      })
    }
    else {
      console.log('delete from server', id)
      axios({
        method: 'delete',
        url: 'todo',
        data: {
          uid: this.state.id,
          id: id
        }
      })
        .then(function (response) {
          console.log('res', response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  // 切换完成状态
  toggleCompleted = (id) => {
    if (this.state.isLocalStorage) {
      console.log('update completedStatus to local')
      this.setState({
        completedChanged: !this.state.completedChanged,
        // 使用 map 返回不可变值
        list: this.state.list.map(item => {
          const completed = item.id === id
            ? !item.completed
            : item.completed // 切换完成状态
          // 返回新对象
          return {
            ...item,
            completed
          }
        })
      })
    }
    else {
      console.log('update completedStatus to server')
      let newCompleted = this.state.list.find((item) => {
        if(item.id === id){
          return item.completed
        }
      })
      console.log('toggleCompleted', newCompleted)
      axios({
        method: 'patch',
        url: 'todo',
        data: {
          uid: this.state.id,
          id: id,
          completed: newCompleted
        }
      })
        .then(function (response) {
          console.log('res', response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  // 更新title
  updateListValue = (id, val) => {
    // 可执行，视图也更新，但是db不变
    if (this.state.isLocalStorage) {
      console.log('update list value to local')
      this.setState({
        titleUpdated: !this.state.titleUpdated,
        list: this.state.list.map(item => {
          item.title = (item.id === id) ? val : item.title
          return item
        })
      })
    }
    else {
      console.log('update list value to server')
      axios({
        method: 'put',
        url: 'todo',
        data: {
          uid: this.state.id,
          id: id,
          title: val
        }
      })
        .then(function (response) {
          console.log('res', response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  // 读取数据 
  getData = (async) => {
    if (this.state.isLocalStorage) {
      console.log('get data from local')
      var data = localStorage.getItem("todo");
      if (data !== null) {
        // 本地存储里面的数据是字符串格式的 但是我们需要的是对象格式的
        return JSON.parse(data);
      } else {
        return [];
      }
    }
    else {
      console.log('get data from server')
      axios({
        method: 'get',
        url: 'todo',
        data: {
          id: this.state.id
        }
      })
        .then(function (response) {
          console.log('res', response);
          return response.data;
        })
        .catch(function (error) {
          console.log(error);
          return [];
        });
    }
  }

  // 保存数据
  saveData = (data) => {
    if (this.state.isLocalStorage) {
      console.log('save data to local')
      localStorage.setItem("todo", JSON.stringify(data));
    }
    else {
      console.log('save data to server')
    }
  }

  componentDidMount() {
    console.log('didMount', this.props)
    //this.props.location.search 是 ?id=60649e73d11dac31585b67ff&name=jack
    let arr = this.props.location.search.split('&') // ['?id=60649e73d11dac31585b67ff', 'name=jack']
    let uid = arr[0].substr(4)
    let name = arr[1].substr(5)
    console.log(uid, name)
    this.setState({
      list: this.getData(),
      user: {
        id: uid,
        username: name
      }
    }, () => { // 异步更新，回调中拿值
      console.log(this.state.user)
    })

  }

  componentDidUpdate(preProps, preState) {
    console.log('DidUpdate')
    console.log(this.state.list)
    // console.log(this.state.completedChanged, preState.completedChanged)
    if (this.state.list.length !== preState.list.length) {
      console.log('list length changed')
      this.saveData(this.state.list)
    }
    if (this.state.completedChanged !== preState.completedChanged) {
      console.log('completed Changed')
      this.saveData(this.state.list)
    }
    if (this.state.titleUpdated !== preState.titleUpdated) {
      console.log('titleUpdated')
      this.saveData(this.state.list)
    }
  }
}

export default State