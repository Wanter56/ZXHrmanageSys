import request from "../request";
//获取用户信息的API
export const getUsers = () => {
  return request.request({
    url: "/users",
    method: "get"
  })
};
