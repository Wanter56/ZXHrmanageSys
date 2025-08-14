import request from "../request";
//获取用户信息的API
export const getUsers = async () => {
  const res = await request.get("/users");
  return res.data;
};
