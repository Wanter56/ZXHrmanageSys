import React, { useState } from "react";
import { Outlet } from "react-router";
import { Layout, Menu } from "antd";

import { createBrowserRouter } from "react-router";
import { Navigate } from "react-router";

import NotFound from "404Page";
import AccessMent from "accessment";
import Attendance from "attendance";
import AttendanceInfo from "attendanceInfo";
import DashBoard from "dashboard";
import Department from "department";
import Level from "level";
import RewardRecord from "rewardRecord";
import Salary from "salary";
import Staff from "staff";
import Login from "users/login";
import ForgetPassword from "users/forgetPassword";

const { Header, Content, Sider } = Layout;
const Main: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline" items={items} />
      </Sider>
      <Layout>
        <Header />
        <Content>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Main;
