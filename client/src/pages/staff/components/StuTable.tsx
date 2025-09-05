import React from "react";
import { Table, Button, Popconfirm } from "antd";
import type { TableColumnsType } from "antd";
import { Student } from "@api/dataApi/studentsApi";

interface StudentTableProps {
  dataSource: Student[];
  loading: boolean;
  onEdit: (rowData: Student) => void;
  onDelete: (rowData: Student) => void;
}

const StuTable: React.FC<StudentTableProps> = ({
  dataSource,
  loading,
  onEdit,
  onDelete,
}) => {
  const columns: TableColumnsType<Student> = [
    {
      title: "姓名",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "年龄",
      dataIndex: "age",
      width: 150,
    },
    {
      title: "联系方式",
      dataIndex: "phone",
      width: 150,
    },
    {
      title: "学历",
      dataIndex: "education",
      width: 150,
    },
    {
      title: "毕业院校",
      dataIndex: "graduationschool",
      width: 150,
    },
    {
      title: "职业",
      dataIndex: "profession",
      width: 150,
    },
    {
      title: "操作",
      width: 200,
      render: (_, rowData) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button 
            style={{ marginRight: "10px" }} 
            onClick={() => onEdit(rowData)}
            disabled={loading}
          >
            详情
          </Button>
          <Popconfirm
            title="提示"
            description="此操作将删除该用户，是否继续？"
            okText="确认"
            cancelText="取消"
            onConfirm={() => onDelete(rowData)}
          >
            <Button 
              type="primary" 
              danger 
              disabled={loading}
            >
              删除
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="table-container">
      <Table 
        columns={columns} 
        dataSource={dataSource} 
        pagination={{ pageSize: 10,  showTotal: (total) => `共 ${total} 条` ,showSizeChanger: false,size:"default"}} 
        rowKey="id" 
        loading={loading}
      />
    </div>
  );
};

export default StuTable;
