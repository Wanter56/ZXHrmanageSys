import request from "../request";
//获取用户信息的API
export const getUsers =  () => {
  const res =  request.get("/users");
  return res;
};
