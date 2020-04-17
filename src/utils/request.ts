import axios from "axios";
import { Notification } from "element-ui";
import { getToken } from "@/utils/auth";

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000, // 超时
});

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    const errMsg = res.msg || "请求失败";
    if (res.code !== 0) {
      Notification({
        title: "请求失败",
        message: errMsg,
        type: "error",
      });
      return Promise.reject(new Error(res.meg || "Error"));
    } else {
      return response.data;
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    const { msg } = error.response.data;
    Notification({
      title: "请求失败",
      message: msg || "网络错误",
      type: "error",
    });
    return Promise.reject(error);
  }
);

export default service;
