import React, { useEffect, useState } from "react";
import { getUsers } from "../../api/dataApi/usersApi";
import "./dashboard.less";

import { Card, Col, Row } from "antd";
const DashBoard: React.FC = () => {
  const [usersList, setUsersList] = useState([]);
  useEffect(() => {
    getUsers().then((res) => {
      setUsersList(res);
    });
  }, []);

  const countWorkYears = (workerList: any[], targetYear: number, minYear: number = 0) => {
    return workerList.filter((worker) => {
      const workYear = targetYear - new Date(worker.onboardingTime).getFullYear();
      return workYear >= targetYear && workYear > minYear;
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
              <div>{countWorkYears(usersList,2024,5)}</div>
            </Card>
          </Col>
          <Col span={8}>
            <Card>Card content</Card>
          </Col>
          <Col span={8}>
            <Card>Card content</Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DashBoard;
