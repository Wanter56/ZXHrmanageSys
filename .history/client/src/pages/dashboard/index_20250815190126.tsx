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
        <h1>公司总人数为：</h1>
        <h2>{usersList.length} 人</h2>
      </Card>
    </div>
  );
};

export default DashBoard;
