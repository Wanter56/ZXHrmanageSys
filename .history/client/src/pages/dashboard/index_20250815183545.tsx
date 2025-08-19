import React from "react";
import { getUsers } from "../../api/dataApi/usersApi";

const DashBoard: React.FC = () => {
  async function getList() {
    try {
      const res = await getUsers();
    } catch (error) {
      console.error("获取用户列表失败：", error);
    }
  }
  const usersList = res || [];
  console.log(usersList);
  return <div>图表界面-dashboard</div>;
};

export default DashBoard;
