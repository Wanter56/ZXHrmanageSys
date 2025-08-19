import React, { useEffect, useState } from "react";
import { getUsers } from "../../api/dataApi/usersApi";
import "./dashboard.less";

import { Card, Col, Row, Spin } from "antd"; // 引入Spin加载组件

// 定义员工数据类型接口，增强类型安全
interface User {
  onboardingTime: string; // 入职时间，假设是字符串格式
  [key: string]: any; // 其他属性
}

const DashBoard: React.FC = () => {
  const [usersList, setUsersList] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // 加载状态
  const [error, setError] = useState<string | null>(null); // 错误状态

  useEffect(() => {
    // 获取数据时设置加载状态
    setLoading(true);
    getUsers()
      .then((res) => {
        setUsersList(res.data || []); // 确保数据是数组
        setError(null); // 清除错误
      })
      .catch((err) => {
        console.error("获取用户数据失败:", err);
        setError("获取数据失败，请稍后重试");
        setUsersList([]); // 错误时清空数据
      })
      .finally(() => {
        // 无论成功失败，都结束加载状态
        setLoading(false);
      });
  }, []);

  // 修复工作年限计算逻辑
  const countWorkYears = (workerList: User[], targetYear: number, minYear: number = 0) => {
    return workerList.filter((worker) => {
      try {
        // 处理可能的日期格式错误
        const onboardYear = new Date(worker.onboardingTime).getFullYear();
        const workYear = targetYear - onboardYear;
        // 修正判断条件：工作年限 >= 最小要求年限
        return workYear >= minYear;
      } catch (err) {
        console.warn("无效的入职时间格式:", worker.onboardingTime, err);
        return false;
      }
    }).length;
  };

  // 加载中显示Spinner
  if (loading) {
    return (
      <div className="loading-container" style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" tip="正在加载数据..." />
      </div>
    );
  }

  // 错误状态显示
  if (error) {
    return (
      <div className="error-container" style={{ textAlign: 'center', padding: '50px', color: 'red' }}>
        {error}
      </div>
    );
  }

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
              {/* 这里修正参数，获取10年以上的员工 */}
              <div>{countWorkYears(usersList, 2024, 10)}</div>
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
    