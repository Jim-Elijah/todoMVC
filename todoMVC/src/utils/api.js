/* eslint-disable import/no-anonymous-default-export */
import request from "./request.js";

export default {
  login(params) {
    return request("/user/login", params, "POST");
  },
  register(params) {
    return request("/user/register", params, "POST");
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
  deleteTodo(id) {
    return request(`/todo/${id}`, null, "DELETE");
  },
  clearTodo(param) {
    return request(`/todo/clear`, param, "DELETE");
  },
};
