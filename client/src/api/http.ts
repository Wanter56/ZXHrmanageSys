// src/api/http.ts  —— 你现在的内容保持不变
import axios from "axios";

const LOGIN_PATH = "/users/login";

function toLoginOnce() {
  const { pathname, search } = window.location;
  if (pathname.startsWith(LOGIN_PATH)) return;
  const from = encodeURIComponent(pathname + search);
  window.location.replace(`${LOGIN_PATH}?from=${from}`);
}

export const apiClient = axios.create({
  baseURL: "/api",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

apiClient.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const status = err?.response?.status;
    if (status === 401) toLoginOnce();
    return Promise.reject(err?.response?.data || err);
  }
);

export const staffClient = axios.create({
  baseURL: "/staff",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});

staffClient.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err?.response?.data || err)
);

// ✅ 关键：补一个默认导出，兼容旧代码里 `import request from './http'`
export default staffClient;
