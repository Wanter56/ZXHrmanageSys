import axios from "axios";
import { setupCache } from "axios-cache-interceptor";
import { message } from "antd"; // 引入提示组件（业务代码已用antd）

// 创建实例并启用缓存
const client = setupCache(
  axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 8000,
  }),
  {
    ttl: 5 * 60 * 1000, // 默认缓存 5 分钟
    cacheKey: (req) => `${req.method}-${req.url}-${JSON.stringify(req.params)}-${JSON.stringify(req.data)}`,
    enabledByDefault: false, // 默认不缓存
  }
);

// 重复请求拦截（保留你的核心逻辑）
const pendingRequests = new Map();
client.interceptors.request.use((config) => {
  const key = `${config.method}-${config.url}-${JSON.stringify(config.params)}-${JSON.stringify(config.data)}`;
  if (pendingRequests.has(key)) {
    pendingRequests.get(key).cancel();
  }
  const controller = new AbortController();
  config.signal = controller.signal;
  pendingRequests.set(key, { cancel: () => controller.abort() });
  return config;
});

// 响应拦截器：补充数据提取和错误处理（关键适配点）
client.interceptors.response.use(
  (response) => {
    // 清除重复请求记录（保留你的逻辑）
    const key = `${response.config.method}-${response.config.url}-${JSON.stringify(
      response.config.params
    )}-${JSON.stringify(response.config.data)}`;
    pendingRequests.delete(key);

    // 提取后端返回的 data 字段（适配 { success: true, data: [...] } 格式）
    const { success, data, message: resMsg } = response.data;
    if (success) {
      return data; // 业务组件直接拿到 data 数组
    } else {
      message.error(resMsg || "操作失败");
      return Promise.reject(new Error(resMsg));
    }
  },
  (error) => {
    // 失败时清除记录
    if (error.config) {
      const key = `${error.config.method}-${error.config.url}-${JSON.stringify(error.config.params)}-${JSON.stringify(
        error.config.data
      )}`;
      pendingRequests.delete(key);
    }

    // 错误提示（避免业务组件重复处理）
    if (axios.isCancel(error)) {
      console.log("请求已取消（重复请求）");
    } else {
      message.error(error.response?.data?.message || "网络错误");
    }
    return Promise.reject(error);
  }
);

export default client;
