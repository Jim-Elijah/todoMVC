import React from 'react'
import { connect } from 'react-redux'
import Api from '../utils/api'
import TodoApp from './components'
import { setTodoList } from "./actions";

class TodoList extends React.Component {
  componentDidMount() {
    Api.getTodoList()
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