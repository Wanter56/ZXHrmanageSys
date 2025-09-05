import request from "../request";
//获取学生信息的API
export const getStudents = () => {
  return request.request({
    url: "/students",
    method: "get",
  });
};

//学生信息CRUD 的API
// studentsApi.tsx
export const addStudent = (data: any) => request.request({ url: "/students", method: "post", data });
export const updateStudent = (id: string, data: any) =>
  request.request({ url: `/students/${id}`, method: "put", data });
export const deleteStudent = (id: string) => request.request({ url: `/students/${id}`, method: "delete" });
