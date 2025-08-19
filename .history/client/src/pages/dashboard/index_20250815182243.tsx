import React from "react";
import { getUsers } from "../../api/dataApi/usersApi";

const DashBoard: React.FC = () => {
  const users = getUsers().then(data => data).catch(err => console.error(err));
  console.log(users);
  return <div>图表界面-dashboard</div>;
};

export default DashBoard;
