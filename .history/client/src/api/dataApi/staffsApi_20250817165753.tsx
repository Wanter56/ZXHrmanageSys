import request from "../request";
//获取用户信息的API
export const getStaffs = () => {
  return request.request({
    url: "/staffs",
    method: "get"
  })
};
