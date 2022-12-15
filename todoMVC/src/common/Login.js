import React from "react";
import { Form, Input, Button, message } from 'antd'
import WithModalHOC from './WithModalHOC'
import storage from "../utils/storage";
import Api from '../utils/api'
import { usernameReg, pswdReg } from "./reg";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      pswd: "",
      modalConfig: {
        title: <div style={{ textAlign: 'center' }}>请登录</div>,
        closable: false,
        footer: null,
        // maskClosable: true,
      },
    };
  }
  render() {
    console.log('login render', this.props)
    const { username, pswd } = this.state
    return (
      <Form
        name="login"
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

        {/* <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }} >
          <Button type="primary" htmlType="submit">
            登录
          </Button>
          <span style={{ fontSize: '12px', color: 'blue', marginLeft: '10px', cursor: 'pointer' }} onClick={this.jump2Register}>没有账号?点此注册</span>
        </Form.Item>
      </Form>
    );
  }
  changeHandler = (field) => (e) => {
    this.setState({
      [field]: e.target.value,
    });
  }
  jump2Register = () => {
    this.props.history.push('/register')
  }
  isValid = () => {
    const { username, pswd } = this.state
    console.log('isValid', username, pswd)
    if (!usernameReg.test(username)) {
      message.destroy()
      message.warning("请输入合法的用户名!");
      return false;
    }
    if (!pswdReg.test(pswd)) {
      message.destroy()
      message.warning("请输入合法的密码!");
      return false;
    }
    return true;
  };

  submitHandler = () => {
    if (!this.isValid()) {
      return;
    }
    const { username, pswd } = this.state
    Api.login({ username, password: pswd })
      .then((res) => {
        console.log('login res', res)
        if (res.code === 200) {
          let user = res.data;
          console.log("user", user);
          storage.ls.set("token", user);
          message.destroy()
          message.success('登录成功, 请查看待办事项!');
          this.props.setIsOpen(false)
          setTimeout(() => {
            this.props.history.push('/todolist')
          }, 500)
        }
        else {
          message.destroy()
          message.warning(res.message);
        }
      })
      .catch(err => {
        console.error(err)
      })
  };
}

const withLogin = WithModalHOC(Login);

export default withLogin