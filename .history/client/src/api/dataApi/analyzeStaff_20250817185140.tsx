import request from "../request";
//获取用户分析数据的API
export const getUsers = () => {
  return request.request({
    url: "/users",
    method: "get"
  })
};
