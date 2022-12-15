import React from "react";
import { Button, Checkbox, Input, message } from "antd";
import Api from '../../utils/api'
import PropTypes from "prop-types";

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditable: false,
    };
  }
  render() {
    const { completed, text } = this.props;
    let spanEle = (
      <span
        style={{ textDecoration: completed ? "line-through" : "none" }}
        onDoubleClick={this.dbClickHandler}
      >
        {text}
      </span>
    );
    let inputEle = (
      <Input
        ref={(input) => (this.inputRef = input)}
        defaultValue={text}
        onBlur={this.blurHandler}
        onKeyDown={this.enterHandler}
        style={{ maxWidth: '200px' }}
      />
    );

    return (
      <div style={{ marginTop: "10px", marginLeft: "20px" }}>
        <Checkbox
          style={{ margin: "5px" }}
          checked={completed}
          onChange={this.toggleHandler}
        />
        {this.state.isEditable ? inputEle : spanEle}
        <Button
          style={{ marginLeft: "5px" }}
          onClick={this.deleteHandler}
        >
          删除
        </Button>
      </div>
    );
  }
  deleteHandler = () => {
    const { onDeleteTodo, id } = this.props;
    Api.deleteTodo(id)
      .then((res) => {
        console.log('deleteTodo res', res)
        onDeleteTodo()
        this.setState({ text: "" });
      })
      .catch(err => {
        console.error(err)
      })

  }
  toggleHandler = () => {
    const { onToggleTodo, id, completed } = this.props;
    Api.modifyTodo({ id, completed: !completed })
      .then((res) => {
        console.log('toggleTodo res', res)
        onToggleTodo()
      })
      .catch(err => {
        console.error(err)
      })
  }
  modifyHandler = (text) => {
    const { onModifyTodo, id } = this.props;
    Api.modifyTodo({ id, title: text })
      .then((res) => {
        console.log('modifyTodo res', res)
        onModifyTodo(id, text)
      })
      .catch(err => {
        console.error(err)
      })
  }
  enterHandler = (e) => {
    const value = e.target.value.trim()
    if (!value) {
      message.destroy();
      message.warning('请输入内容!')
      return
    }
    if (e.keyCode === 13) {
      this.setState({
        isEditable: false,
      });
      this.modifyHandler(value)
    }
  };
  dbClickHandler = () => {
    this.setState(
      {
        isEditable: true,
      },
      () => {
        // 双击后选中所有文本，注意要放在回调中，setState异步更新
        this.inputRef.select();
      }
    );
  };
  blurHandler = (e) => {
    const value = e.target.value.trim()
    if (!value) {
      message.destroy();
      message.warning('请输入内容!')
      this.inputRef && this.inputRef.select()
      return
    }
    this.setState({
      isEditable: false,
    });
    this.modifyHandler(value)
  };
}
TodoItem.propTypes = {
  onDeleteTodo: PropTypes.func.isRequired,
  onModifyTodo: PropTypes.func.isRequired,
  onToggleTodo: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};
export default TodoItem;
