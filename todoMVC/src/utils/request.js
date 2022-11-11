import axios from "axios";
import { message } from "antd";
import storage from "../utils/storage";
// import router from "@/router";

const baseURL = "http://192.168.101.188:8889";

axios.defaults.baseURL = baseURL;
axios.interceptors.request.use(
  (config) => {
    let token = storage.ls.get("token");
    if (token) {
      // 引入Base64
      let Base64 = require("js-base64").Base64;
      // 获取taken中间过期的taken期限
      let a = token.indexOf(".");
      let b = token.lastIndexOf(".");
      let userInfoDate = token.slice(a + 1, b);
      let loginData = Base64.decode(userInfoDate);
      console.log(loginData);
      // 获取token过期期限
      let d = loginData.lastIndexOf(":");
      let e = loginData.lastIndexOf("}");
      let expiration = loginData.slice(d + 1, e);
      console.log("expiration", expiration);
      let newDate = Math.ceil(Date.now() / 1000);
      console.log("newDate", newDate);
      // 当前时间大于token过期时间退出登录
      if (newDate >= expiration) {
        message.warning("登录已过期，请重新登录！");
        // router.replace("/login");
      }
    }

    config.headers = {
      "Content-Type": "application/json",
      ...config.headers,
    };
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log("interceptors response", response);
    if (response.data.Code > 400) {
      console.log("code>400", response.data.Message);
    //   router.replace("/login");
    } else {
      return response;
    }
  },
  (error) => {
    console.log("网络错误");
    if (error.response) {
      console.log(error.response);
      if (error.response.status === 401) {
        console.log("AAAA", location.href);
        storage.ls.remove("token");
        router.replace("/login");
        return Promise.reject(error);
      }
      if (error.response.data) {
        console.log("网络错误1", error.response.data.message);
      }
      console.log("网络错误2", error.response.data.message);
    } else {
      return Promise.reject(error);
    }
  }
);

export default function request(url, params, type = "get") {
  return new Promise((resolve, reject) => {
    const method = type.toLowerCase();
    axios[method](url, { params })
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
