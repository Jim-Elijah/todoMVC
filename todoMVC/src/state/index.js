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
    console.log('state index constructor')
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
    if (cache) {
      cache.isLocalStorage = !this.state.isLocalStorage
      sessionStorage.setItem('cache', JSON.stringify(cache))
    }
    else {
      let cache = {
        user: this.state.user,
        isLogin: this.state.isLogin,
        isLocalStorage: !this.state.isLocalStorage
      }
      sessionStorage.setItem('cache', JSON.stringify(cache));
    }
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
    console.log('state index willMount')
    let cache = sessionStorage.getItem('cache')
    cache = cache !== null ? JSON.parse(cache) : {}
    console.log('cache', cache)
    this.setState({
      ...cache
    })
  }
  componentDidMount() {
    console.log('state index did mount');
  }
  componentDidUpdate() {
    console.log('state index didUpdate', this.state)
  }
  componentWillUnmount() {
    console.log('state index unmount');
  }
}

export default TodoState