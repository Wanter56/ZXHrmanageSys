import React from "react";
import { getUsers } from "../../api/dataApi/usersApi";

const DashBoard: React.FC = () => {
  const users = getUsers().then(data => data).catch(err => console.error(err));
  // 这里可以处理获取到的用户数据
  console.log(users);
  return <div>图表界面-dashboard</div>;
};

export default DashBoard;
