import client from "../client";
//获取用户信息的API
export const getUsers = () => {
  return client.request({
    url: "/users",
    method: "get",
  });
};
