import request from "./request.js";

export default {
  login(params) {
    return request("/api/login", params, "POST");
  },
  register(params) {
    return request("/api/register", params, "POST");
  },
  logout(param) {
    return request("/api/logout", param, "POST");
  },
  userInfo(id) {
    return request(`/api/user/${id}`, null, "GET");
  },

  //   todoList
  addTodo(param) {
    return request(`/api/todo`, param, "POST");
  },
};
