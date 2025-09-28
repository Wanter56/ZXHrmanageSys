import axios from "axios";
const client = axios.create({
  baseURL: "http://localhost:3000/staff", //基础路径
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 5000, //超时时间
});

// 请求拦截器
client.interceptors.request.use(
  (config) => {
    // 在发送请求之前做些什么
    return config;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
// 响应拦截器
client.interceptors.response.use(
  (response) => {
    // 对响应数据做点什么
    return response.data;
  },
  (error) => {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default client;
