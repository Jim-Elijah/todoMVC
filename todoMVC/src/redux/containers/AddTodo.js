import React, { Component } from "react";
import { Input, Button, message, Popconfirm } from "antd";
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
      message.destroy()
      message.warn("内容不能为空!");
      return;
    }
    let listItem = {
      id: Math.random().toString().slice(-5), // id 累加
      completed: false,
    };
    Api.addTodo({ ...listItem, title: trimed })
      .then((res) => {
        console.log('addTodo res', res)
        this.props.dispatch(addTodo({ ...listItem, text: trimed }));
        this.setState({ text: "" });
      })
      .catch(err => {
        console.error(err)
      })
  };
  clearHandler = () => {
    const { todos } = this.props
    if (Array.isArray(todos) && !todos.length) {
      message.destroy();
      message.warning('已经清空啦！')
      return
    }
    Api.clearTodo()
      .then((res) => {
        console.log('clearTodo res', res)
        this.props.dispatch(clearTodo());
      })
      .catch(err => {
        console.error(err)
      })
  };
  render() {
    const { text } = this.state;
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
        <Popconfirm
          title="确定要清空吗?"
          placement="top"
          onConfirm={this.clearHandler}
          okText="确定"
          cancelText="取消"
        >
          <Button>清空</Button>
        </Popconfirm>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos
  }
}
export default connect(mapStateToProps)(AddTodo);
