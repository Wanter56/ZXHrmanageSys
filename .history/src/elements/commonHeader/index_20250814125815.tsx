import React, { useState } from "react";
import userpic from "../../common/img/user.jpg";
import { Avatar, Space } from "antd";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, theme } from "antd";

const { Header } = Layout;

const CommonHeader: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
    </Header>
  );
};

export default CommonHeader;
