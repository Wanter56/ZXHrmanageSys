// 1. 首先定义明确的类型（避免any，提升可维护性）
export interface Student {
  id: number; // 学生唯一标识（从之前数据看存在字符串ID，如"d119"）
  name: string;
  age: string | number; // 兼容之前数据中age的字符串/数字格式
  phone: string;
  email: string;
  education: string;
  graduationschool: string; // 注意：建议统一为驼峰式 graduationSchool（需和接口对齐）
  profession: string;
  profile: string;
}
