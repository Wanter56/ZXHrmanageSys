import React from "react";
import { Table } from "antd";
// interface DataType {
//   key: React.Key;
//   name: string;
//   age: number;
//   street: string;
//   building: string;
//   number: number;
//   companyAddress: string;
//   companyName: string;
//   gender: string;
// }

const MyTable: React.FC = (props) => {
  return <Table<DataType> {...props} bordered size="middle" scroll={{  y: 47 * 5 }} />;
};

export default MyTable;
