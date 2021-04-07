import React from 'react'

function ListItem(props) {
  const { item, toggleCompleted, deleteItem } = props

  function completedChangeHandler(e) {
    const newVal = e.target.checked
    console.log('completed turned to', newVal)
    toggleCompleted(item.id)
  }
  function deleteHandler() {
      deleteItem(item.id)
  }

  return <div style={{ marginTop: '10px' }}>
  <input type="checkbox" style={{margin: '5px'}}  checked={item.completed} onChange={completedChangeHandler} />
    <span style={{ textDecoration: item.completed ? 'line-through' : 'none' }}>
        {item.title}
    </span>
    <button style={{marginLeft: '5px'}} onClick={deleteHandler}>删除</button>
</div>
}

export default ListItem
