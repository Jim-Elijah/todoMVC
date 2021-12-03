import React from 'react'

class ListItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditable: false
    }
  }
  render() {
    const { item } = this.props
    let spanEle = <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}
      onDoubleClick={this.dbClickHandler}>
      {item.title}
    </span>
    let inputEle = <input ref={input => this.inputRef = input} defaultValue={item.title} onBlur={this.blurHandler} onKeyPress={this.enterHandler} />

    return <div style={{ marginTop: '10px' }}>
      <input type="checkbox" style={{ margin: '5px' }} checked={item.completed}
        onChange={this.completedChangeHandler} />
      {this.state.isEditable ? inputEle : spanEle}
      <button style={{ marginLeft: '5px' }} onClick={this.deleteHandler}>删除</button>
    </div>
  }
  enterHandler = (e) => {
    console.log('enter handler', e.target.value)
    const { item, updateListValue } = this.props
    console.log(e.charCode)
    if (e.charCode === 13) {
      this.setState({
        isEditable: false
      })
      updateListValue(item.id, e.target.value)
    }
  }
  dbClickHandler = () => {
    this.setState({
      isEditable: true
    }, () => {
      // 双击后选中所有文本，注意要放在回调中，setState异步更新
      this.inputRef.select()
    })
  }
  blurHandler = (e) => {
    const { item, updateListValue } = this.props
    this.setState({
      isEditable: false
    })
    updateListValue(item.id, e.target.value)
    console.log('new val', e.target.value)
  }
  completedChangeHandler = (e) => {
    const newVal = e.target.checked
    console.log('completed turned to', newVal)
    const { item, toggleCompleted } = this.props
    toggleCompleted(item.id)
  }
  deleteHandler = () => {
    const { item, deleteItem } = this.props
    deleteItem(item.id)
  }
}

export default ListItem
