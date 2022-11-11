import React, { Component } from "react";
// import { login } from "../utils/api";
import storage from "../utils/storage";
export default class UserInfo extends Component {
  constructor(props) {
    super(props);
    const token = storage.ls.get("token") || {};
    const { username, uid, expire } = token || {};
    console.log("userinfo", token);
    this.state = {
      user: {
        uid,
        username,
      },
      expire,
    };
  }
  componentDidMount() {
    const { expire } = this.state;
    const ts = new Date().getTime();
    if (expire && ts < expire) {
      return;
    }
    console.log("登录已过期, 请重新登录");
    this.props.history.push("/login");
  }

  render() {
    const {
      user: { username },
    } = this.state;
    console.log(" userinfo render", username);
    return <div>{username || "UserInfo"}</div>;
  }
}
