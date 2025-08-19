import { useMemo } from "react";
import type { User } from "../../../api/interface/user"; // 假设从类型文件导入User接口

// 正确定义自定义Hook（函数名必须以use开头）
export default function useWorkerStats() {
  // 计算工作年限符合条件的员工数量
  const countWorkYears = useMemo(() => {
    // 封装计算逻辑为纯函数
    return (workerList: User[], targetYear: number, minYear: number = 0) => {
      return workerList.filter((worker) => {
        try {
          const onboardYear = new Date(worker.onboardingTime).getFullYear();
          const workYear = targetYear - onboardYear;
          return workYear > minYear;
        } catch (error) {
          console.warn("无效的入职时间格式:", worker.onboardingTime, error);
          return false;
        }
      }).length;
    };
  }, []); // 依赖为空，函数只会创建一次

  // 获取入职时间最早的N名员工
  const getLongestServingWorkers = useMemo(() => {
    return (workerList: User[], workerNum: number) => {
      // 复制数组后排序（避免修改原数组）
      return [...workerList]
        .sort((a, b) => {
          return new Date(a.onboardingTime).getTime() - new Date(b.onboardingTime).getTime();
        })
        .filter((_, index) => index < workerNum);
    };
  }, []); // 依赖为空，函数只会创建一次

  // 必须返回封装的函数，供组件使用
  return {
    countWorkYears,
    getLongestServingWorkers,
  };
}
