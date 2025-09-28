// 定义API通用响应类型：后端所有接口都返回该结构
export interface ApiResponse<T> {
  success: boolean; // 接口是否成功（true/false）
  data: T; // 实际业务数据（学生列表、单个学生等）
  message?: string; // 提示信息（如“添加成功”“id不存在”）
  code?: number; // 状态码（可选，如200、404、500）
}
// 学历枚举：限制可选值，避免非法数据
export enum EducationLevel {
  UNDERGRADUATE = "本科",
  MASTER = "硕士",
  DOCTOR = "博士",
}

// 学生类型：完全对齐后端字段，id为number
export interface Student {
  id?: number; // 新增时后端自动生成，故为可选
  name: string; // 必选：姓名
  age: number; // 必选：年龄（后端通常用number）
  phone: string; // 必选：电话号码（用string避免截断）
  email: string; // 必选：邮箱
  education: string; // 必选：学历（用枚举限制值）
  graduationschool: string; // 必选：毕业院校
  profession: string; // 必选：职业
  profile?: string; // 可选：个人简介（非必填）
}
import request from "../client";

// 1. 获取学生列表（支持分页）
export const getStudents = (params?: { page?: number; limit?: number }) => {
  return request.request<ApiResponse<Student[]>>({
    // 响应数据是“学生数组”
    url: "/students",
    method: "get",
    params, // 分页参数（page/limit）通过URL查询串传递
  });
};

// 2. 根据ID获取单个学生（id为number）
export const getStudentById = (id: number) => {
  return request.request<ApiResponse<Student>>({
    // 响应数据是“单个学生”
    url: `/students/${id}`,
    method: "get",
  });
};

// 3. 新增学生（排除id，响应返回新增的学生数据）
export const addStudent = (data: Omit<Student, "id">) => {
  // Omit排除id（后端生成）
  return request.request<ApiResponse<Student>>({
    // 响应返回“新增的学生”（带id）
    url: "/students",
    method: "post",
    data, // 新增数据通过请求体传递
  });
};

// 4. 更新学生（id为number，data为部分学生字段）
export const updateStudent = (id: number, data: Partial<Student>) => {
  // Partial：允许只传部分字段
  return request.request<ApiResponse<Student>>({
    // 响应返回“更新后的学生”
    url: `/students/${id}`,
    method: "put",
    data,
  });
};

// 5. 删除学生（id为number，响应返回提示信息）
export const deleteStudent = (id: number) => {
  return request.request<ApiResponse<{ message: string }>>({
    // 响应返回“提示信息”
    url: `/students/${id}`,
    method: "delete",
  });
};
