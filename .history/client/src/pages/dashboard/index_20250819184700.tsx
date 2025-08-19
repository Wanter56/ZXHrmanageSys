import React, { useEffect } from "react";
import useUserStore from "../../store/userStore";
import "./dashboard.less";
import { Card } from "antd";
import CustomTable from "../../components/Table";
import type { TableProps } from "antd";
import type { TableItem } from "../../api/interface/user";

//引入Echart组件
import Echart from "../../components/Echart";

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
  const { ageMap, constellationList, departmentList, educationList, genderList, marriageList, wordingYearsMaps } =
    analyzeStaffData;
  console.log(departmentList);
  return (
    <div className="dashboard">
      <div className="title">员工分析:</div>
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

      <div style={{ display: "flex", width: "90%", border: "1px solid  ", margin: " 0 auto", marginTop: "30px" }}>
        <Echart
          style={{ height: "300px", width: "45%" }}
          charData={genderList}
          isAxisChart={false}
          chartTitle={{ text: "员工性别占比:", left: "center" }}
        />
        <Echart
          style={{ height: "300px", width: "45%" }}
          charData={marriageList}
          isAxisChart={false}
          chartTitle={{ text: "员工婚姻情况:", left: "center" }}
        />
      </div>
      <div style={{ display: "flex", width: "90%", border: "1px solid  ", margin: " 0 auto", marginTop: "30px" }}>
        <Echart
          style={{ height: "300px", width: "45%" }}
          charData={educationList}
          isAxisChart={false}
          chartTitle={{ text: "员工学历情况:", left: "center" }}
        />
        <Echart
          style={{ height: "300px", width: "45%" }}
          charData={constellationList}
          isAxisChart={false}
          chartTitle={{ text: "员工星座情况:", left: "center" }}
        />
      </div>
      <div style={{ display: "flex", width: "90%", border: "1px solid  ", margin: " 0 auto", marginTop: "30px" }}>
        {ageMap && (
          <Echart
            style={{ height: "300px", width: "45%" }}
            charData={ageMap}
            isAxisChart={true}
            chartTitle={{ text: "员工年龄情况:", left: "center" }}
          />
        )}
        {departmentList && (
          <Echart
            style={{ height: "300px", width: "45%" }}
            charData={departmentList}
            isAxisChart={true}
            chartTitle={{ text: "部门分布:", left: "center" }}
          />
        )}
      </div>

      <CustomTable<TableItem>
        className="table"
        columns={columns}
        // 确保数据结构与TableItem匹配
        dataSource={wordingYearsMaps}
        bordered
        title={() => "工龄最长的十位员工"}
        rowKey="userName" // 建议添加唯一key，避免警告
      />
    </div>
  );
};

export default DashBoard;
