import React, { Component } from 'react';
// import { HashRouter as Router, Route, Switch} from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import { createBrowserHistory } from 'history'

import Login from './common/Login'
import Register from './common/Register'
import Home from './common/Home';
import Logout from './common/Logout';
// import Todo from './state/storage/LocalStorage'
import Todo from './state/storage/DBStorage'

class router extends Component {
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
          <span style={{ marginRight: '8px', color: '#0000f0', cursor: "pointer" }}
            onClick={this.props.changeStorage}>{this.props.isLocalStorage ? '本地存储' : '远程存储'}</span>
          <span style={{ marginRight: '8px', textDecoration: 'none' }}>{this.props.isLogin ? '已登陆' : '未登录'}</span>
        </nav>
        <hr />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/Home" component={Home}></Route>
          <Route exact path="/Register" render={(routeProps) => {
            return <Register {...routeProps} isLogin={that.props.isLogin} />
          }}></Route>
          <Route exact path="/Login" render={(routeProps) => {
            return <Login {...routeProps} isLogin={that.props.isLogin} isLocalStorage={that.props.isLocalStorage}
              changeLoginStatus={that.props.changeLoginStatus} addUser={that.props.addUser} />
          }}></Route>
          <Route exact path="/Todo" render={(routeProps) => {
            return <Todo {...routeProps} isLogin={that.props.isLogin} user={that.props.user}
              isLocalStorage={that.props.isLocalStorage} />
          }}></Route>
          <Route exact path="/Logout" render={(routeProps) => {
            return <Logout {...routeProps} changeLoginStatus={that.props.changeLoginStatus}/>
          }}></Route>
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