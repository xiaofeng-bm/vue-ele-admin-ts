import axios from "axios";
import { Notification, MessageBox } from "element-ui";
import { getToken } from "@/utils/auth";
import { removeToken } from './auth';

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000, // 超时
});

// service.defaults.retry = 4;


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
      if (res.message) {
        Notification({
          title: "成功",
          message: res.message,
          type: "success",
        });
      }
      return response.data;
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    let msg = "网络错误";
    let status;
    if (error.response && error.response.data) {
      msg = error.response.data;
      status = error.response.status;
    }
    if(status === 401) {
      MessageBox.alert('登录过期，请返回重新登录', '提示', {
        confirmButtonText: '确定',
        callback: action => {
          removeToken();
          location.href="/login"
        }
      })
    } else {
      Notification({
        title: "请求失败",
        message: msg || "网络错误",
        type: "error",
      });
    }
    

    // 401重定向到登录页
    console.log(error.response.status)
    return Promise.reject(error);
  }
);

export default service;
