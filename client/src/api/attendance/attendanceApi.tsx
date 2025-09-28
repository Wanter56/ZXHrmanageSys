import request from "../client";
//获取用户信息的API
export const getAttendance = () => {
  return request.request({
    url: "/attendances",
    method: "get",
  });
};
