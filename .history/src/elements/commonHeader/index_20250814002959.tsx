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
      <div className="common-header-container">
        <div className="char">织</div>
        <div className="char">信</div>
        <div className="char">人</div>
        <div className="char">事</div>
        <div className="char">管</div>
        <div className="char">理</div>
        <div className="char">系</div>
        <div className="char">统</div>
      </div>
    </Header>
  );
};

export default CommonHeader;
