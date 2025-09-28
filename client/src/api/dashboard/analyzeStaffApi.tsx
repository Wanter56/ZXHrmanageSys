import request from "../client";
//获取用户分析数据的API
export const getAnalyzeStaff = () => {
  return request.request({
    url: "/analyzeStaff",
    method: "get",
  });
};
