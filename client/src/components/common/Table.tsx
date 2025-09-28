import React from "react";
import { Table, type TableProps } from "antd";
import { User } from "src/types/user";

type MyTableProps = TableProps<User>;

const MyTable: React.FC<MyTableProps> = (props) => {
  return <Table<User> {...props} bordered size="middle" scroll={{ y: 47 * 5 }} />;
};

export default MyTable;
