import React, { Component } from "react";
import { Input, Button, message } from "antd";
import { connect } from "react-redux";
import Api from '../../utils/api'
import storage from "../../utils/storage";
import { addTodo, clearTodo } from "../actions";

class AddTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }
  changeHandler = (e) => {
    console.log("e", e.target.value);
    this.setState({ text: e.target.value });
  };
  enterHandler = (e) => {
    if (e.keyCode === 13) {
      this.addHandler();
    }
  };
  addHandler = () => {
    const { text } = this.state;
    const trimed = text.trim();
    if (!trimed) {
      message.warn("内容不能为空!");
      return;
    }
    const token = storage.ls.get("token") || {};
    const { uid } = token || {};
    let listItem = {
      uid,
      id: Math.random().toString().slice(-5), // id 累加
      completed: false,
    };
    Api.addTodo({ ...listItem, title: trimed })
      .then((res) => {
        console.log('login res', res)
        this.props.dispatch(addTodo({ ...listItem, text: trimed }));
        this.setState({ text: "" });
      })
      .catch(err => {
        console.error(err)
      })
  };
  clearHandler = () => {
    this.props.dispatch(clearTodo());
  };
  render() {
    const { text } = this.state;
    console.log("addtodo props", this.props);
    return (
      <div>
        <Input
          value={text}
          maxLength={30}
          placeholder={"请输入内容"}
          style={{ width: "300px" }}
          onChange={this.changeHandler}
          onKeyDown={this.enterHandler}
        />
        <Button
          type={"primary "}
          onClick={this.addHandler}
          style={{ margin: "0 10px" }}
        >
          添加
        </Button>
        <Button onClick={this.clearHandler}>清空缓存</Button>
      </div>
    );
  }
}

export default connect()(AddTodo);
