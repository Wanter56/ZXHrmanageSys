import React from "react";
import { Table } from "antd";
import type { TableColumnsType } from "antd";
import { createStyles } from "antd-style";

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const Table: React.FC = (columns,dataSource) => {
  const { styles } = useStyle();
  return (
    <Table<DataType>
      className={styles.customTable}
      columns={columns}
      dataSource={dataSource}
      scroll={{ x: "max-content", y: 55 * 5 }}
    />
  );
};

export default Table;
