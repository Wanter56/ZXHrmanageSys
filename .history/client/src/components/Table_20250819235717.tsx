import React from "react";
import { Table } from "antd";
import { User } from "../api/interface/user";

const MyTable: React.FC = (props) => {
  return <Table<User> {...props} bordered size="middle" scroll={{ y: 47 * 5 }} />;
};

export default MyTable;
