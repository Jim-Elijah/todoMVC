import React from 'react'
import axios from 'axios'
import {usernameReg, pswdReg} from './reg'
class login extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      username: '',
      pswd: '',
      pswdAgain: ''
    }
  }
  render() {
    return <div>
        <label htmlFor='username'>用户名:</label>
          <input type="text" value={this.state.username} onInput={this.usernameHandler} id='username'/><br />
        <label htmlFor='password'>密{" "}码: </label>
          <input type="password" value={this.state.pswd} onChange={this.pswdHandler} id='password' /> <br />
        <label htmlFor='passwordAgain'>确认密码: </label>
          <input type="password" value={this.state.pswdAgain} onChange={this.pswdAgainHandler} id='passwordAgain' /> <br />
        <button onClick={this.submitHandler}>注册</button>
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
  pswdAgainHandler = (e) => {
    this.setState({
      pswdAgain: e.target.value
    })
  }
  isValid = () => {
    let username = this.state.username, pswd = this.state.pswd, pswdAgain = this.state.pswdAgain;
    if(!usernameReg.test(username)){
      alert('请输入合法的用户名!')
      return false;
    }
    if(!pswdReg.test(pswd) || !pswdReg.test(pswdAgain)){
      alert('请输入合法的密码!')
      return false;
    }
    if(pswd !== pswdAgain){
      alert('请输入相同的密码!')
      return false;
    }
    return true
  }
  submitHandler = () => {
    console.log('submit')
    if(!this.isValid()){
      return;
    }
    let that = this
    axios({
        method: 'post',
        url: 'register',
        data: {
          username: this.state.username,
          password: this.state.pswd
        }
      })
      .then(function (response) {
        console.log(response);
        if(response.data.code === 1){
          alert(response.data.msg + ' 请登录！')
          that.setState({
            username: '',
            pswd: '',
            pswdAgain: ''
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      });
    }
}

export default login