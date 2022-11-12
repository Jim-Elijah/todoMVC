import axios from "axios";
import { message } from "antd";
import storage from "./storage";
import bus from './bus.js'
import { Base64 } from 'js-base64'

// const baseURL = "http://192.168.56.1:8080";
const baseURL = 'http://localhost:8080'

let globalHistory

console.log('bus', bus)
bus.on('interceptorFn', history => {
  console.log('get', history)
  globalHistory = history
})

axios.defaults.baseURL = baseURL;
axios.interceptors.request.use(
  (config) => {
    let token = storage.ls.get("token");
    console.log('req token', token, config)
    if (token) {
      let info = Base64.decode(token);
      console.log(info, 'type', typeof info);
      const { expire } = JSON.parse(info) || {}
      const ts = new Date().getTime();
      console.log("expire", expire);
      console.log("ts", ts);
      if (expire && ts < expire) { }
      else {
        message.warning("登录已过期，请重新登录！");
        console.log('globalHistory', JSON.stringify(globalHistory))
        // globalHistory.history.push('/login')
        setTimeout(() => {
          globalHistory && globalHistory.push('/login')
        }, 300)
      }
      config.headers.authorization = token;
    } else {
      message.warning("请重新登录！");
      console.log('请重新登录！')
      console.log('globalHistory', JSON.stringify(globalHistory))
      setTimeout(() => {
        globalHistory && globalHistory.push('/login')
      }, 300)
    }
    config.headers = {
      "Content-Type": "application/json",
      ...config.headers,
    };
    return config;
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
    console.log("err", error);
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
    axios[method](url, data)
      .then((res) => {
        console.log(`${method} ${url}:`, res);
        resolve(res.data);
      })
      .catch((err) => {
        console.error(`${method} ${url} error:`, err);
        message.error(err);
        reject(err);
      });
  });
}
