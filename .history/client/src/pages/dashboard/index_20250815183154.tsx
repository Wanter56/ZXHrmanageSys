import React from "react";
import { getUsers } from "../../api/dataApi/usersApi";

const DashBoard: React.FC = () => {
  const users = getUsers()
    .then((res) => {
      const usersList = res || [];
    })
    .catch((error) => {
      console.error("获取用户数据失败:", error);
    });
  return <div>图表界面-dashboard</div>;
};

export default DashBoard;
