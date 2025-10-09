// src/utils/lazyLoad.tsx
import { lazy, Suspense } from "react";
import { Spin } from "antd";

// 封装懒加载组件，自动处理加载状态
export const LazyComponent = (importFunc: () => Promise<any>) => {
  const Lazy = lazy(importFunc);
  return () => (
    <Suspense fallback={<Spin tip="加载中..." size="large" />}>
      <Lazy />
    </Suspense>
  );
};
