import React from "react";
import { getUsers } from "../../api/dataApi/usersApi";

const DashBoard: React.FC = () => {
   getUsers().then((res) => {
     console.log("获取用户数据:", res);
     const users = res;

   },);
   console.log(users);
  return <div>图表界面-dashboard</div>;
};

export default DashBoard;
