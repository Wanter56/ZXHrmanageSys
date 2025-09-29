import request from "../client";
import type { Student, ApiResponse } from "../../types/index";

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
