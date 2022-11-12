export const setTodoList = (payload) => {
  return {
    type: "SET_TODOLIST",
    payload,
  };
};
export const addTodo = (payload) => {
  return {
    type: "ADD_TODO",
    ...payload,
  };
};
export const deleteTodo = (id) => {
  return {
    type: "DELETE_TODO",
    id,
  };
};
export const ModifyTodo = (id, text) => {
  return {
    type: "MODIFY_TODO",
    id,
    text,
  };
};
export const toggleTodo = (id) => {
  return {
    type: "TOGGLE_TODO",
    id,
  };
};
export const clearTodo = () => {
  return {
    type: "CLEAR_TODO",
  };
};
export const toggleIsLogin = (isLogin) => {
  return {
    type: "TOGGLE_ISLOGIN",
    isLogin,
  };
};
export const toggleIsLocalStorage = (isLocalStorage) => {
  return {
    type: "TOGGLE_ISLOCALSTORAGE",
    isLocalStorage,
  };
};
// // 设置完成状态
export const setVisibilityFilter = (filter) => {
  return {
    type: "SET_VISIBILITY_FILTER",
    filter,
  };
};
