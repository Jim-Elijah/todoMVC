import React from 'react'
import ListItem from './ListItem'

function List({ list = [], deleteItem, toggleCompleted, updateListValue }) {
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
