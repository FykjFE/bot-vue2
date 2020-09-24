import Vue from "vue";
import axios from "axios";
import baseUrl from "@/utils/index";

/**
 * http封装请求
 * @param method
 * @param url
 * @param request
 * @param options
 */
const http = axios.create({
  baseURL: baseUrl,
  timeout: 10000,
  headers: { "Content-Type": "application/json;charset=UTF-8" }
});
http.interceptors.request.use(
  config => {
    config.headers.Authorization = sessionStorage.getItem("token")
      ? `Bearer ${sessionStorage.getItem("token")}`
      : "";
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);
http.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    // Do something with response error
    return Promise.reject(error);
  }
);
Vue.prototype.$http = http;
export default http;
