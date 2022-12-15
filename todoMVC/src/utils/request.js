import axios from "axios";
import { message } from "antd";
import storage from "./storage";
import bus from './bus.js'
import { Base64 } from 'js-base64'

// const baseURL = "http://192.168.56.1:8080";
const baseURL = 'http://localhost:8080'

let globalHistory

bus.on('interceptorFn', history => {
  globalHistory = history
})

axios.defaults.baseURL = baseURL;
axios.interceptors.request.use(
  (request) => {
    console.log("interceptors request", request);
    let token = storage.ls.get("token");
    if (token) {
      let info = Base64.decode(token);
      const { expire } = JSON.parse(info) || {}
      const ts = new Date().getTime();
      if (expire && ts < expire) { }
      else {
        message.destroy()
        message.warning("登录已过期，请重新登录！");
        setTimeout(() => {
          globalHistory && globalHistory.push('/login')
        }, 300)
      }
      request.headers.authorization = token;
    }
    else {
      const { url } = request || {}
      const arr = ['/user/register', '/user/login']
      if (!arr.includes(url)) {
        message.destroy()
        message.warning("请重新登录！");
        setTimeout(() => {
          globalHistory && globalHistory.push('/login')
        }, 300)
      }

    }
    request.headers = {
      "Content-Type": "application/json",
      ...request.headers,
    };
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log("interceptors response", response);
    return response;
  },
  (error) => {
    console.log("response err", error);
    if (error.response) {
      console.log(error.response);
    } else {
      return Promise.reject(error);
    }
  }
);

export default function request(url, params, type = "get") {
  return new Promise((resolve, reject) => {
    const method = type.toLowerCase();
    const arr = ['get', 'delete']
    const data = arr.includes(method) ? { params } : params
    console.log(`${method} ${url} data:`, data);
    axios[method](url, data)
      .then((res) => {
        console.log(`${method} ${url} res:`, res);
        resolve(res.data);
      })
      .catch((err) => {
        console.error(`${method} ${url} error:`, err);
        message.error(err);
        reject(err);
      });
  });
}
