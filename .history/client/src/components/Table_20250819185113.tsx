import React from "react";
import { Table as AntdTable } from "antd";
import type { TableProps } from "antd";
import { createStyles, useStyles } from "antd-style";

// 定义样式
const useCustomTableStyles = createStyles(({ css, token }) => {
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

// 通用数据类型接口，可根据实际需求扩展
interface DataType {
  key: React.Key;
  [key: string]: any; // 允许其他任意字段
}

// 自定义表格组件
const CustomTable: React.FC<TableProps<DataType>> = (props) => {
  // 使用样式 - 确保在组件内部正确调用
  const { styles } = useStyles(useCustomTableStyles);
  
  return (
    <AntdTable<DataType>
      className={styles.customTable}
      pagination={{ pageSize: 50 }}
      scroll={{ y: 275 }} // 55*5的计算结果，直接写数值更清晰
      {...props}
    />
  );
};

export default CustomTable;
