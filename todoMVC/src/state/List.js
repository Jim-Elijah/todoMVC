import React from 'react'
import ListItem from './ListItem'

function List({ list = [], deleteItem, toggleCompleted, updateListValue, isLogin }) {
  // if (!isLogin) {
  //   return <div>
  //     <h2>请先登录！</h2>
  //   </div>
  // }
  return <div>
    {list.map(item => <ListItem
      item={item}
      key={item.id}
      deleteItem={deleteItem}
      toggleCompleted={toggleCompleted}
      updateListValue={updateListValue}
    />)}
    </div>
}

export default List
