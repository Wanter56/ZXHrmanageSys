import { useState } from "react";

export const useRequest = (apiFn: (...args: any[]) => Promise<any>) => {
  // 存储接口返回的数据
  const [data, setData] = useState(null);
  // 标记请求是否正在加载
  const [loading, setLoading] = useState(false);

  // 封装请求方法，支持动态传入参数
  const fetchData = async (...args: any[]) => {
    setLoading(true); // 开始请求，置为加载中
    try {
      const res = await apiFn(...args); // 调用传入的API函数（如getStudents）
      setData(res); // 存储接口返回的data字段（适配后端响应格式）
    } catch (err) {
      console.error(err); // 错误捕获并打印日志
    } finally {
      setLoading(false); // 请求结束（无论成功/失败），关闭加载状态
    }
  };

  // 返回数据、加载状态和请求方法
  return { data, loading, fetchData };
};
