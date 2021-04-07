import React, { Component } from 'react';
// import { HashRouter as Router, Route, Switch} from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history'

import Login from './login'
import Register from './register'
// import Todo from './state/index'
import Todo from './state/indexWithDB'

const Home = () => (
  <div>
    <h2>welcome to this todoMVC!</h2>
  </div>
)

const Logout = () => (
  <div>
    <h2>Logout</h2>
  </div>
)

class router extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    let that = this
    console.log('router render', this)
    return (
      <Router history={createBrowserHistory()}>
        <nav>
          <Link style={{ marginRight: '8px', textDecoration: 'none' }} to="/Home" >Home</Link>
          <Link style={{ marginRight: '8px', textDecoration: 'none' }} to="/Register">Register</Link>
          <Link style={{ marginRight: '8px', textDecoration: 'none' }} to="/Login">Login</Link>
          <Link style={{ marginRight: '8px', textDecoration: 'none' }} to='/Todo'>Todo</Link>
          <Link style={{ marginRight: '8px', textDecoration: 'none' }} to="/Logout">Logout</Link>
          <a style={{ marginRight: '8px', color: '#0000f0', cursor: "pointer" }}
            onClick={this.props.changeStorage}>{this.props.isLocalStorage ? '本地存储' : '远程存储'}</a>
          <span style={{ marginRight: '8px', textDecoration: 'none' }}>{this.props.isLogin ? '已登陆' : '未登录'}</span>
        </nav>
        <hr />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/Home" component={Home}></Route>
          <Route exact path="/Register" component={Register}></Route>
          <Route exact path="/Login" render={(routeProps) => {
            return <Login {...routeProps} isLogin={that.props.isLogin}
              changeLoginStatus={that.props.changeLoginStatus} addUser={that.props.addUser} />
          }}></Route>
          <Route exact path="/Todo" render={(routeProps) => {
            return <Todo {...routeProps} isLogin={that.props.isLogin} isLocalStorage={that.props.isLocalStorage}
              user={that.props.user} />
          }}></Route>
          <Route exact path="/Logout" component={Logout}></Route>
        </Switch>
      </Router>
    );
  }

  componentDidUpdate() {
    console.log('router didUpdate', this.props)
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log('enter scu')
    if (nextProps.isLogin !== this.props.isLogin || nextProps.isLocalStorage !== this.props.isLocalStorage) {
      console.log('update')
      return true // 可以渲染
    }
    return false // 不重复渲染
  }
}

export default router;