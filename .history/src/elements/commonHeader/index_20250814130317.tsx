import React, { useState } from "react";
import userpic from "../../common/img/user.jpg";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Dropdown, Avatar } from "antd";

const { Header } = Layout;

const CommonHeader: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          个人中心
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          退出账号
        </a>
      ),
    },
  ];

  return (
    <Header className="common-header-container">
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
      <Dropdown menu={{ items }}>
        <Avatar size={36} src={userpic} />
      </Dropdown>
    </Header>
  );
};

export default CommonHeader;
