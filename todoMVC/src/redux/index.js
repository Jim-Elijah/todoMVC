import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import TodoApp from './components'

let store

export default class TodoList extends React.Component {
  constructor(props) {
    super(props)
    store = createStore(reducer, this.getState())
  }
  // 读取本地存储的数据 
  getState = () => {
    const data = localStorage.getItem("todo");
    return data ? JSON.parse(data) : {};
  }
  // 保存本地存储数据
  saveState = (data) => {
    console.log('save', data)
    localStorage.setItem("todo", JSON.stringify(data));
  }
  componentDidMount() {
    window.onbeforeunload = () => {
      this.saveState(store.getState());
    };
  }
  render() {
    return <Provider store={store}>
      <TodoApp />
    </Provider>
  }
}