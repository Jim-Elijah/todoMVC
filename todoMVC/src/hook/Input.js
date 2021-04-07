import React, { useState } from 'react'

function Input(props) {
  const { addItem } = props
  const [title, setTitle] = useState('')

  function enterHandler(e) {
    if (e.charCode === 13) {
      addHandler();
    }
  }
  function changeHandler(e) {
    setTitle(e.target.value)
  }
  function addHandler(e) {
    console.log('add')
    addItem(title)
    setTitle('')
  }

  return <div>
      <input value={title} onChange={changeHandler} onKeyPress={enterHandler} />
      <button onClick={addHandler}>添加</button>
    </div>
}

export default Input