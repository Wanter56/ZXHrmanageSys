import React, { useEffect } from "react";
import useUserStore from "../../store/userStore";
import "./dashboard.less";
import { Card, Table } from "antd";
import type { TableProps } from "antd";
import type { TableItem } from "../../api/interface/user";
import { getAnalyzeStaff } from "../../api/dataApi/analyzeStaffApi";

const columns: TableProps<TableItem>["columns"] = [
  {
    title: "姓名",
    dataIndex: "userName",
  },
  {
    title: "部门",
    dataIndex: "department",
  },
];

const DashBoard: React.FC = () => {
  // 解构所需状态和方法
  const { otherUserData, fetchUsers, getUserStats, analyzeStaffData, fetchAnalyzeStaff } = useUserStore();

  // 组件挂载时初始化数据
  useEffect(() => {
    const loadData = async () => {
      // 1. 先获取用户列表
      await fetchUsers();
      // 2. 再计算统计数据（使用当前年份）
      getUserStats(new Date().getFullYear());
      //3.获取员工分析数据
      await fetchAnalyzeStaff();
    };
    loadData();
  }, [fetchUsers, getUserStats, fetchAnalyzeStaff]); // 依赖项添加方法
 console.log(analyzeStaffData);

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
