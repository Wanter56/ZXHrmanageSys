import React from "react";
import { Table as AntdTable } from "antd"; // 别名导入 antd Table，避免冲突
import type { TableColumnsType, TableProps } from "antd";
import { createStyles } from "antd-style";

// 样式定义保持不变
const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

// // 定义数据类型接口（根据实际需求调整）
// interface DataType {
//   key: React.Key;
//   name: string;
//   age: number;
//   address: string;
// }

// 自定义组件：接收 props 并指定类型
const CustomTable: React.FC<TableProps> = (props) => {
  const { styles } = useStyle(); // 此时在正确的函数组件中使用 Hook
  return (
    <AntdTable<DataType> // 使用 antd 的 Table 组件（通过别名）
      className={styles.customTable}
      pagination={{ pageSize: 50 }}
      scroll={{ y: 55 * 5 }}
      {...props} // 将外部传入的 props（columns、dataSource 等）透传
    />
  );
};

export default CustomTable;
