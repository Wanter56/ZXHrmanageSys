import React, { useEffect } from "react";
import useUserStore from "@store/userStore";
import { Card } from "antd";
import MyTable from "@components/Table";
import type { TableProps } from "antd";
import type { User } from "@api/interface/user";
import Echart from "@components/Echart";

const columns: TableProps<User>["columns"] = [
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
  const { otherUserData, fetchUsers, getUserStats, analyzeStaffData, fetchAnalyzeStaff } = useUserStore();

  useEffect(() => {
    const loadData = async () => {
      await fetchUsers();
      getUserStats(new Date().getFullYear());
      await fetchAnalyzeStaff();
    };
    loadData();
  }, [fetchUsers, getUserStats, fetchAnalyzeStaff]);

  const { ageMap, constellationList, departmentList, educationList, genderList, marriageList, wordingYearsMaps } =
    analyzeStaffData;

  return (
    <div className="dashboard p-6 bg-body min-h-screen">
      {/* 标题区域 */}
      <div className="title text-heading-1 text-[clamp(1.5rem,3vw,2rem)] font-bold py-4 mb-6 text-center">
        员工分析:
      </div>

      {/* 总人数卡片 */}
      <Card className="card !mb-6 border border-box-border bg-box-bg text-center" hoverable>
        <div className="text-heading-2 text-lg mb-2">公司共计：</div>
        <div className="text-heading-1 text-3xl font-bold">{otherUserData.total}人</div>
      </Card>

      {/* 入职年限卡片组 */}
      <Card className="year-card !mb-6 border border-box-border bg-box-bg text-center font-bold " hoverable>
        <Card.Grid className="border-r border-box-border last:border-r-0 p-4 text-heading-2">
          入职十年以上:{otherUserData.over10Years}人
        </Card.Grid>
        <Card.Grid className="border-r border-box-border last:border-r-0 p-4 text-heading-2">
          入职三年以上:{otherUserData.over3Years}人
        </Card.Grid>
        <Card.Grid className="p-4 text-heading-2">
          入职一年以内:{otherUserData.within1Year}人
        </Card.Grid>
      </Card>

      {/* 图表区域 - 性别与婚姻状况 */}
      <div className="flex flex-col md:flex-row gap-6 w-[90%] mx-auto border border-box-border bg-box-bg rounded-lg p-4 mb-6">
        <Echart
          style={{ height: "300px", width: "100%", md: { width: "45%" } }}
          charData={genderList}
          isAxisChart={false}
          charTitle={{ text: "员工性别占比:", left: "center" }}
        />
        <Echart
          style={{ height: "300px", width: "100%", md: { width: "45%" } }}
          charData={marriageList}
          isAxisChart={false}
          charTitle={{ text: "员工婚姻情况:", left: "center" }}
        />
      </div>

      {/* 图表区域 - 学历与星座 */}
      <div className="flex flex-col md:flex-row gap-6 w-[90%] mx-auto border border-box-border bg-box-bg rounded-lg p-4 mb-6">
        <Echart
          style={{ height: "300px", width: "100%", md: { width: "45%" } }}
          charData={educationList}
          isAxisChart={false}
          charTitle={{ text: "员工学历情况:", left: "center" }}
        />
        <Echart
          style={{ height: "300px", width: "100%", md: { width: "45%" } }}
          charData={constellationList}
          isAxisChart={false}
          charTitle={{ text: "员工星座情况:", left: "center" }}
        />
      </div>

      {/* 图表区域 - 年龄与部门 */}
      <div className="flex flex-col md:flex-row gap-6 w-[90%] mx-auto border border-box-border bg-box-bg rounded-lg p-4 mb-6">
        {ageMap && (
          <Echart
            style={{ height: "300px", width: "100%", md: { width: "45%" } }}
            charData={ageMap}
            isAxisChart={true}
            charTitle={{ text: "员工年龄情况:", left: "center" }}
          />
        )}
        {departmentList && (
          <Echart
            style={{ height: "300px", width: "100%", md: { width: "45%" } }}
            charData={departmentList}
            isAxisChart={true}
            charTitle={{ text: "部门分布:", left: "center" }}
          />
        )}
      </div>

      {/* 工龄最长员工表格 */}
      <div className="table w-full max-w-5xl mx-auto mt-6 border border-box-border bg-box-bg rounded-lg p-4">
        <MyTable
          columns={columns}
          dataSource={wordingYearsMaps}
          bordered
          title={() => <span className="text-heading-1 font-medium">工龄最长的十位员工</span>}
          rowKey="userName"
        />
      </div>
    </div>
  );
};

export default DashBoard;