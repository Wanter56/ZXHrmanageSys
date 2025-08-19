import React, { useEffect } from "react";
import { getUsers } from "../../api/dataApi/usersApi";

const DashBoard: React.FC = () => {
  useEffect(() => {
    getUsers().then((res) => {
      console.log(res);
    });
  }, []);
  return <div>图表界面-dashboard</div>;
};

export default DashBoard;
