import React, { useEffect, useState } from "react";
import { getUsers } from "../../api/dataApi/usersApi";
const DashBoard: React.FC = () => {
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    getUsers().then((res) => {
      setUsersList(res);
    });
  }, []);
  return (
    
  );
};

export default DashBoard;
