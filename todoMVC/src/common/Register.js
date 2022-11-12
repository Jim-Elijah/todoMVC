import React from 'react'
import { Form, Input, Button, message } from 'antd'
import Api from '../utils/api'
import WithModalHOC from './WithModalHOC'
import { usernameReg, pswdReg } from './reg'
class register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      pswd: '',
      pswdAgain: '',
      modalConfig: {
        title: <div style={{ textAlign: 'center' }}>请注册</div>,
        closable: false,
        footer: null,
        // maskClosable: true,
      },
    }
  }
  render() {
    const { username, pswd, pswdAgain } = this.state
    return (
      <Form
        name="register"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={this.submitHandler}
        autoComplete="off"
        style={{ width: '400px' }}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input value={username} placeholder='请输入用户名' maxLength={20} onChange={this.changeHandler('username')} />
        </Form.Item>

        <Form.Item
          label="密码"
          name="pswd"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password value={pswd} placeholder='请输入密码' maxLength={20} onChange={this.changeHandler('pswd')} />
        </Form.Item>

        <Form.Item
          label="确认密码"
          name="passwordAgain"
          rules={[{ required: true, message: '请再次输入密码!' }]}
        >
          <Input.Password value={pswdAgain} placeholder='请再次输入密码' maxLength={20}
            onChange={this.changeHandler('pswdAgain')} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            注册
          </Button>
          <span style={{ fontSize: '12px', color: 'blue', marginLeft: '10px', cursor: 'pointer' }} onClick={this.jump2Login}>已有账号?点此登录</span>
        </Form.Item>
      </Form>
    )
  }
  changeHandler = (field) => (e) => {
    this.setState({
      [field]: e.target.value,
    });
  }
  jump2Login = () => {
    this.props.history.push('/login')
  }
  isValid = () => {
    const { username, pswd, pswdAgain } = this.state
    console.log('valid', username, pswd, pswdAgain)
    if (!usernameReg.test(username)) {
      message.warning('请输入合法的用户名!')
      return false;
    }
    if (!pswdReg.test(pswd) || !pswdReg.test(pswdAgain)) {
      message.warning('请输入合法的密码!')
      return false;
    }
    if (pswd !== pswdAgain) {
      message.warning('请输入相同的密码!')
      return false;
    }
    return true
  }
  submitHandler = () => {
    console.log('submit')
    if (!this.isValid()) {
      return;
    }
    const { username, pswd } = this.state
    Api.register({ username, password: pswd })
      .then(res => {
        console.log('register res', res)
        if (res.code === 1) {
          message.success('注册成功, 即刻登陆吧!')
          setTimeout(() => {
            this.props.history.push('/login')
          }, 300);
          this.setState({
            username: '',
            pswd: '',
            pswdAgain: ''
          })
        } else {
          message.warning(res.msg);
        }
      }).catch(err => {
        console.error(err)
      })
  }
}

const withRegister = WithModalHOC(register);

export default withRegister