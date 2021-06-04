import React from 'react'
import ListItem from './ListItem'

function List({ list = [], deleteItem, toggleCompleted, updateListValue }) {
  console.log('List', list)
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
