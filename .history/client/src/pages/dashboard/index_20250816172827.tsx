import React, { useEffect, useState } from "react";
import { userStore } from "../../store/userStore";
import "./dashboard.less";
import { Card, Table } from "antd";
import type { TableProps } from "antd";

// 引入接口定义
import type { User, TableItem } from "../../api/interface/user";

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

  const state = userStore(state=>state.otherUserData);
  // 添加加载状态，避免数据未加载时的无效计算
  const [loading, setLoading] = useState<boolean>(true);

  if (loading) {
    return <div className="loading">加载中...</div>; // 加载状态提示
  }

  return (
    <div className="dashboard">
      <Card className="card">
        <div>公司共计：</div>
        <div>{state.otherUserData.total}人</div>
      </Card>

      <Card className="year-card">
        <Card.Grid>入职十年以上:{state.otherover10Years}人</Card.Grid>
        <Card.Grid>入职三年以上:{state.otherover3Years}人</Card.Grid>
        <Card.Grid>入职一年以内:{state.otherwithin1Year}人</Card.Grid>
      </Card>

      <Table<TableItem>
        className="table"
        columns={columns}
        dataSource={state.othertenWorkersLongest}
        bordered
        title={() => "工龄最长的十位员工"}
      />
    </div>
  );
};

export default DashBoard;
