import React, { useState } from "react";
import { Outlet } from "react-router";
import { Layout, Menu } from "antd";

import CommonSider from "../elements/commonSider.jsx";
import CommonHeader from "../elements/commonHeader.jsx";

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
