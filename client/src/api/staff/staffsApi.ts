import client from "../client";
//获取用户信息的API
export const getStaffs = () => {
  return client.request({
    url: "/staffs",
    method: "get",
  });
};
