import request from "../client";
//获取用户信息的API
export const getUsers = () => {
  return request.request({
    url: "/users",
    method: "get",
  });
};
