import React, { useEffect, useState } from "react";
import { getUsers } from "../../api/dataApi/usersApi";

import { Card } from "antd";
const DashBoard: React.FC = () => {
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    getUsers().then((res) => {
      setUsersList(res);
    });
  }, []);
  return (
    <div className="dashboard" style={{ position: "relative" }}>
      <Card style={{ width: 1500,height: 300, 
        position: 'absolute',
        top: '50%',
        left: '50%',
      }}>
        <p>Card content</p>
        <p>Card content</p>
        <p>Card content</p>
      </Card>
    </div>
  );
};

export default DashBoard;
