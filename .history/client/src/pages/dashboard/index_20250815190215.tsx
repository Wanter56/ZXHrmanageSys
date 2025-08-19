import React, { useEffect, useState } from "react";
import { getUsers } from "../../api/dataApi/usersApi";
import "./dashboard.less";

import { Card } from "antd";
const DashBoard: React.FC = () => {
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    getUsers().then((res) => {
      setUsersList(res);
    });
  }, []);
  return (
    <div className="dashboard">
      <Card className="card">
        <div>公司总人数为：</div>
        <div>{usersList.length}</div>
      </Card>
    </div>
  );
};

export default DashBoard;
