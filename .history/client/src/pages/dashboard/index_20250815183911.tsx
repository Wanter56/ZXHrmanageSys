import React, { useEffect, useState } from "react";
import { getUsers } from "../../api/dataApi/usersApi";

const DashBoard: React.FC = () => {
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    getUsers().then((res) => {
      console.log(res);
      setUsersList(res);
    });
  }, []);
  console.log(usersList);
  return <div>图表界面-dashboard</div>;
};

export default DashBoard;
