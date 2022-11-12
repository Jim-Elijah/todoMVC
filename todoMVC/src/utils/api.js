import request from "./request.js";

export default {
  login(params) {
    return request("/login", params, "POST");
  },
  register(params) {
    return request("/register", params, "POST");
  },
  logout(param) {
    return request("/logout", param, "POST");
  },
  getUserInfo(id) {
    return request(`/user/${id}`, null, "GET");
  },

  // todoList
  // getTodoList(uid) {
  //   return request(`/todo/uid=${uid}`, null, "GET");
  // },
  getTodoList(param) {
    return request(`/todo`, param, "GET");
  },
  addTodo(param) {
    return request(`/todo`, param, "POST");
  },
  modifyTodo(param) {
    return request(`/todo`, param, "PUT");
  },
  toggleTodo(param) {
    return request(`/todo`, param, "PATCH");
  },
  deleteTodo(param) {
    return request(`/todo`, param, "DELETE");
  },
};
