import request from "../request";
//获取学生信息的API
export const getStudents = () => {
  return request.request({
    url: "/students",
    method: "get",
  });
};

//学生信息CRUD 的API
export const addStudent = (data: any) => {
  return request.request({
    url: "/students",
    method: "post",
    data,
  });
};

export const updateStudent = (id: number, data: any) => {
  return request.request({
    url: `/students/${id}`,
    method: "put",
    data,
  });
};

export const deleteStudent = (id: number) => {
  return request.request({
    url: `/students/${id}`,
    method: "delete",
  });
};
