import { useState, useEffect } from 'react';

export const useDebounce = (value: any, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 设置定时器，延迟更新值
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // 清除上一次的定时器（依赖变化时触发）
    return () => clearTimeout(timer);
  }, [value, delay]); // 依赖变化时重新计时

  return debouncedValue;
}