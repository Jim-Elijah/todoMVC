import React from 'react'
import axios from 'axios'
import { usernameReg, pswdReg } from './reg'

class login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      pswd: ''
    }
  }
  render() {
    return <div>
      <label htmlFor='username'>用户名:</label>
      <input type="text" value={this.state.username} onChange={this.usernameHandler} id='username' /><br />
      <label htmlFor='password'>密{'   '}码: </label>
      <input type="password" value={this.state.pswd} onChange={this.pswdHandler} id='password' /> <br />
      <button onClick={this.submitHandler}>登录</button>
    </div>
  }
  usernameHandler = (e) => {
    this.setState({
      username: e.target.value
    })
  }
  pswdHandler = (e) => {
    this.setState({
      pswd: e.target.value
    })
  }
  isValid = () => {
    let username = this.state.username, pswd = this.state.pswd
    if (!usernameReg.test(username)) {
      alert('请输入合法的用户名!')
      return false;
    }
    if (!pswdReg.test(pswd)) {
      alert('请输入合法的密码!')
      return false;
    }
    return true
  }

  routeJump = (path) => {
    console.log('jump')
    this.props.history.push(path)
    this.props.history.go()
  }

  submitHandler = () => {
    console.log('submit')
    let that = this;
    console.log('that', that)
    if (!this.isValid()) {
      return;
    }
    axios({
      method: 'post',
      url: 'login',
      data: {
        username: this.state.username,
        password: this.state.pswd
      }
    })
      .then(function (response) {
        console.log('res', response);
        let data = response.data;
        // data格式
        // {
        //   msg: '登录成功！',
        //   code: 1,
        //   data: {
        //     uid: doc[0].uid,
        //     username: doc[0].username
        // }
        if (data.code === 1) {
          let user = data.data;
          console.log('user', user)
          that.props.changeLoginStatus(true)
          that.props.addUser(user)
          alert(data.msg + '请查看Todo')
          // setTimeout(() => {
          //   that.routeJump('/todo');
          // }, 2000);
        }
        else {
          alert(data.msg)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  componentDidMount() {
    console.log('enter login didMount', this.props)
    console.log('isLogin', this.props.isLogin)
  }
}

export default login