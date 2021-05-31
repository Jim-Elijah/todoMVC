import React from 'react'
import Router from '../router'

class TodoState extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLocalStorage: false,
      isLogin: false,
      user: {}
    }
    console.log('index constructor')
  }
  render() {
    console.log('state index render')
    return <div>
      {/* isLogin={this.state.isLogin} isLocalStorage={this.state.isLocalStorage} user={this.state.user}  */}
      <Router {...this.state} changeLoginStatus={this.changeLoginStatus} changeStorage={this.changeStorage}
        addUser={this.addUser}>
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
    alert('请勿频繁切换存储方式！')
    console.log('change storage', !this.state.isLocalStorage)
    console.log(this)
    let cache = JSON.parse(sessionStorage.getItem('cache'))
    cache.isLocalStorage = !this.state.isLocalStorage
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
  componentWillMount() {
    console.log('index willMount')
    let cache = sessionStorage.getItem('cache')
    cache = cache !== null ? JSON.parse(cache) : {}
    console.log('cache', cache)
    this.setState({
      ...cache
    })
  }
}

export default TodoState