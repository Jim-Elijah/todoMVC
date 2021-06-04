const toggle = (state = [], action) => {
  switch (action.type) {
  case 'TOGGLE_ISLOGIN':
    // 注意，返回不可变数据
    return [
      ...state,
      {
        isLogin: action.isLogin
      }
    ]
  case 'TOGGLE_ISLOCALSTORAGE':
    return [
      ...state,
      {
        isLocalStorage: action.isLocalStorage
      }
    ]
  default:
    return state
  }
}

export default toggle