// src/utils/buildSortedURL.ts
/**
 * 构建排序后的 URL（替代 Axios 内部的 buildURL）
 * 功能：将参数排序后拼接到 URL 上，确保相同参数组合生成相同 URL（便于缓存等场景）
 */
export default function buildSortedURL(url: string, params?: Record<string, any>): string {
  if (!params || Object.keys(params).length === 0) {
    return url; // 无参数时直接返回原 URL
  }

  // 1. 对参数的 key 进行排序（确保参数顺序一致）
  const sortedKeys = Object.keys(params).sort((a, b) => a.localeCompare(b));

  // 2. 拼接参数为 query string（处理数组、特殊字符等）
  const queryParams = sortedKeys
    .map((key) => {
      const value = params[key];
      // 处理数组参数（如 { ids: [1,2] } → "ids=1&ids=2"）
      if (Array.isArray(value)) {
        return value.map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`).join("&");
      }
      // 处理普通参数（编码特殊字符，如空格、中文等）
      return `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`;
    })
    .join("&");

  // 3. 拼接 URL 和参数（处理 URL 中已有的 ? 符号）
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}${queryParams}`;
}
