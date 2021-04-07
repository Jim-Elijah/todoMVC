import React from 'react'
import Router from '../router'

class Todo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLocalStorage: false,
      isLogin: false,
      user: {}
    }
  }
  render() {
    return <div>
      <Router isLogin={this.state.isLogin} isLocalStorage={this.state.isLocalStorage} user={this.state.user} changeLoginStatus={this.changeLoginStatus} changeStorage={this.changeStorage} addUser={this.addUser}>
      </Router>
    </div>
  }
  addUser = (val) => {
    console.log('set user', val)
    this.setState({
      user: val
    })
  }
  changeStorage = () => {
    console.log('change storage', !this.state.isLocalStorage)
    this.setState({
      isLocalStorage: !this.state.isLocalStorage
    })
  }
  changeLoginStatus = (status) => {
    console.log('set status', status)
    this.setState({
      isLogin: status
    })
  }
}

export default Todo
