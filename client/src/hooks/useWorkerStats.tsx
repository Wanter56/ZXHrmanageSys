import type { User } from "src/types/user"; // 导入User类型

/**
 * 计算工作年限超过指定值的员工数量
 * @param workerList 员工列表
 * @param targetYear 目标年份
 * @param minYear 最小工作年限（默认0）
 * @returns 符合条件的员工数量
 */
export const countWorkYears = (workerList: User[], targetYear: number, minYear: number = 0): number => {
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
