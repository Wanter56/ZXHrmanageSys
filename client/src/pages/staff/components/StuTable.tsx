import React from "react";
import { Table, Button, Popconfirm, Spin, Skeleton } from "antd";
import type { TableColumnsType } from "antd";
import { Student } from "@api/dataApi/studentsApi";

interface StudentTableProps {
  dataSource: Student[];
  loading: boolean;
  onAction: (action: "edit" | "delete", rowData: Student) => void;
}

const StuTable: React.FC<StudentTableProps> = ({ dataSource, loading, onAction }) => {
  const columns: TableColumnsType<Student> = [
    // 你的列定义完全不变...
    { title: "姓名", dataIndex: "name", width: 150 },
    { title: "年龄", dataIndex: "age", width: 150 },
    { title: "联系方式", dataIndex: "phone", width: 150 },
    { title: "学历", dataIndex: "education", width: 150 },
    { title: "毕业院校", dataIndex: "graduationschool", width: 150 },
    { title: "职业", dataIndex: "profession", width: 150 },
    {
      title: "操作",
      width: 200,
      render: (_, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Button
            style={{ marginRight: "10px" }}
            onClick={() => { onAction("edit", record); console.log(record); }}
            disabled={loading}
          >
            详情
          </Button>
          <Popconfirm
            title="提示"
            description="此操作将删除该用户，是否继续？"
            okText="确认"
            cancelText="取消"
            onConfirm={() => onAction("delete", record)}
          >
            <Button type="primary" danger disabled={loading}>
              删除
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  // 核心新增：加载时显示表格骨架屏（模拟表格结构，提升感知）
  const renderTableContent = () => {
    // 场景1：加载中且无数据（首次加载/强制刷新时）→ 显示骨架屏
    if (loading && dataSource.length === 0) {
      return (
        <div style={{ border: "1px solid #f0f0f0", borderRadius: "4px" }}>
          {/* 表头骨架屏（和列数对应） */}
          <div style={{ display: "flex", borderBottom: "1px solid #f0f0f0", padding: "8px 16px"}}>
            {columns.map((col, idx) => (
              <div key={idx} style={{ width: col.width || "auto", flex: col.width ? 0 : 1 }}>
                <Skeleton.Input style={{ width: "60%", height: "20px" }} />
              </div>
            ))}
          </div>
          {/* 表体骨架屏（显示10行，和分页大小一致） */}
          {Array.from({ length: 10 }).map((_, rowIdx) => (
            <div key={rowIdx} style={{ display: "flex", borderBottom: rowIdx < 9 ? "1px solid #f0f0f0" : "none" }}>
              {columns.map((col, colIdx) => (
                <div key={colIdx} style={{ width: col.width || "auto", flex: col.width ? 0 : 1, padding: "16px" }}>
                  {/* 操作列特殊处理：显示两个按钮骨架 */}
                  {col.title === "操作" ? (
                    <div style={{ display: "flex", gap: "10px" }}>
                      <Skeleton.Input style={{ width: "80px", height: "32px" }} />
                      <Skeleton.Input style={{ width: "80px", height: "32px" }} />
                    </div>
                  ) : (
                    <Skeleton.Input style={{ width: "80%", height: "20px" }} />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      );
    }

    // 场景2：非加载中/已有数据 → 显示正常表格
    return (
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ 
          pageSize: 10, 
          showTotal: (total) => `共 ${total} 条`, 
          showSizeChanger: false, 
          size: "default" 
        }}
        rowKey="id"
        locale={{ emptyText: "暂无学生数据" }}
        // 加载态已通过骨架屏处理，关闭Table自身loading
        loading={false}
      />
    );
  };

  return (
    <div className="table-container">
      {/* 保留Spin，但仅在骨架屏加载时显示“加载中”文字（可选） */}
      <Spin spinning={loading} tip="加载中...">
        {renderTableContent()}
      </Spin>
    </div>
  );
};

export default StuTable;