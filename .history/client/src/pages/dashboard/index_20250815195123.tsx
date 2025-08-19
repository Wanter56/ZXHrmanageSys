import React, { useEffect, useState } from "react";
import { getUsers } from "../../api/dataApi/usersApi";
import "./dashboard.less";

import { Card, Col, Row } from "antd";

//员工信息接口定义
interface BigNumberObject {
  low: number;
  high: number;
  unsigned: boolean;
}

interface User {
  _id: string;
  __v: number;
  accountName: string;
  bankNumber: BigNumberObject;
  department: string;
  education: number;
  gender: number;
  graduatedSchool: string;
  idNumber: BigNumberObject;
  identity: number;
  level: number;
  marriage: number;
  mobile: number;
  onboardingTime: string;
  password: string;
  salary: number;
  userName: string;
}
const DashBoard: React.FC = () => {
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    getUsers().then((res) => {
      setUsersList(res.data);
    });
  }, []);

  const countWorkYears = (workerList: User[], targetYear: number, minYear: number = 0) => {
    return workerList.filter((worker) => {
      const workYear = targetYear - new Date(worker.onboardingTime).getFullYear();
      return workYear > minYear;
    }).length;
  };

  console.log(usersList);
  return (
    <div className="dashboard">
      <Card className="card">
        <div>公司共计：</div>
        <div>{usersList.length}人</div>
      </Card>
      <div className="year-card">
        <Row gutter={24}>
          <Col span={8}>
            <Card>
              <div>入职十年以上</div>
              <div>{countWorkYears(usersList, 2024, 10)}</div>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <div>入职三年以上</div>
              <div>{countWorkYears(usersList, 2024, 3)}</div>
            </Card>
          </Col>
          <Col span={8}>
            <Card>
              <div>入职一年以上</div>
              <div>{countWorkYears(usersList, 2024, 5)}</div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DashBoard;
