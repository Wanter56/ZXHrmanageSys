import React, { useEffect } from "react";
import useUserStore from "../../store/userStore";
import "./dashboard.less";
import { Card, Table } from "antd";
import type { TableProps } from "antd";
import type { TableItem } from "../../api/interface/user";

const columns: TableProps<TableItem>["columns"] = [
  {
    title: "姓名",
    dataIndex: "userName",
  },
  {
    title: "薪水",
    dataIndex: "salary",
    align: "right",
  },
  {
    title: "手机号",
    dataIndex: "mobile",
  },
];

const DashBoard: React.FC = () => {
  const { otherUserData, fetchUsers, getUserStats, error, isloading } = useUserStore();

  // 在渲染部分添加
  if (isloading) return <div>加载中...</div>;
  if (error) return <div className="error">错误：{error}</div>;
  // 组件挂载时初始化数据
  useEffect(() => {
    const loadData = async () => {
      // 1. 先获取用户列表
      await fetchUsers();
      // 2. 再计算统计数据（使用当前年份）
      getUserStats(new Date().getFullYear());
    };
    loadData();
  }, [fetchUsers, getUserStats]); // 依赖项添加方法

  return (
    <div className="dashboard">
      <Card className="card">
        <div>公司共计：</div>
        <div>{otherUserData.total}人</div>
      </Card>

      <Card className="year-card">
        {/* 修正属性名，去掉多余的"other"前缀 */}
        <Card.Grid>入职十年以上:{otherUserData.over10Years}人</Card.Grid>
        <Card.Grid>入职三年以上:{otherUserData.over3Years}人</Card.Grid>
        <Card.Grid>入职一年以内:{otherUserData.within1Year}人</Card.Grid>
      </Card>

      <Table<TableItem>
        className="table"
        columns={columns}
        // 确保数据结构与TableItem匹配
        dataSource={otherUserData.tenWorkersLongest}
        bordered
        title={() => "工龄最长的十位员工"}
        rowKey="userName" // 建议添加唯一key，避免警告
      />
    </div>
  );
};

export default DashBoard;
