import React from 'react'
import { connect } from 'react-redux'
import Api from '../utils/api'
import storage from "../utils/storage";

import TodoApp from './components'
import { setTodoList } from "./actions";

class TodoList extends React.Component {
  componentDidMount() {
    const token = storage.ls.get("token") || {};
    const { uid } = token || {};
    console.log('todoapp m')
    Api.getTodoList({ uid })
      .then(res => {
        console.log('getTodoList', res)
        this.props.dispatch(setTodoList(res.data));
      }).catch(err => {
        console.error(err)
      })
  }
  render() {
    return <TodoApp />
  }
}

export default connect()(TodoList);