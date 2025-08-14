import React, { useState } from "react";
import "./CommonHeader.less";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Avatar, Dropdown } from "antd";
const { Header } = Layout;
const CommonHeader = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Header className="header-container">
      <Button
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        type="text"
        style={{
          fontSize: "16px",
          width: 64,
          height: 32,
          background: "#fff",
        }}
        onClick={() => setCollapsed(!collapsed)}
      />
    </Header>
  );
};

export default CommonHeader;
