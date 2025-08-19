import React from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { createStyles } from "antd-style";

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

const App: React.FC = (columns, dataSource) => {
  return (
    <Table<DataType>
      columns={columns}
      dataSource={dataSource}
      bordered
      size="middle"
      scroll={{ x: "calc(700px + 50%)", y: 47 * 5 }}
    />
  );
};

export default App;
