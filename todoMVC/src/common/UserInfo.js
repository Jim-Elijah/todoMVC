import React, { Component } from "react";
import { message, Button } from 'antd'
import { Base64 } from 'js-base64'
import storage from "../utils/storage";


export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    let token = storage.ls.get("token");
    let initialState = {}
    if (token) {
      let info = Base64.decode(token);
      const { username, expire } = JSON.parse(info) || {};
      Object.assign(initialState, { username, expire })
    }
    this.state = {
      ...initialState
    };
  }
  componentDidMount() {
    const { expire } = this.state;
    const ts = new Date().getTime();
    if (expire && ts < expire) {
      return;
    }
    message.warning("登录已过期, 请重新登录");
    this.props.history.push("/login");
  }

  logoutHandler = () => {
    storage.ls.remove('token')
    message.warning("请重新登录");
    this.props.history.push("/login");
  }
  render() {
    const { username } = this.state;
    console.log(" userinfo render", username);
    return <div className='user-info' style={{ display: 'flex', justifyContent: 'space-between' }}>
      <div>{username || "UserInfo"}</div>
      <Button onClick={this.logoutHandler}>退出登录</Button>
    </div >;
  }
}
