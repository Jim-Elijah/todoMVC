import React, { Component } from "react";
import { Input, Button, message } from "antd";
import { connect } from "react-redux";
import { addTodo, clearTodo } from "../actions";

// 函数组件，接收 props 参数
// let AddTodo = ({ dispatch }) => {
//   // dispatch 即 props.dispatch
//   let input

//   return (
//     <div>
//       <form
//         onSubmit={e => {
//           e.preventDefault()
//           if (!input.value.trim()) {
//             return
//           }
//           dispatch(addTodo(input.value))
//           input.value = ''
//         }}
//       >
//         <Input
//           ref={node => {
//             input = node
//           }}
//           maxLength={30}
//           placeholder={'请输入内容'}
//         />
//         <button type="submit">
//           Add Todo
//         </button>
//         <button style={{ marginLeft: '10px' }} onClick={() => dispatch(clearTodo())}>清空缓存</button>
//       </form>
//     </div>
//   )
// }

// connect 高阶组件 ，将 dispatch 作为 props 注入到 AddTodo 组件中
// AddTodo = connect()(AddTodo);
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
    this.props.dispatch(addTodo(text));
    this.setState({ text: "" });
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
