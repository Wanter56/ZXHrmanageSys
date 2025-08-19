import React from "react";

// 引入权限函数
import { isAdmin } from "../../utils/auth";
import adminpic from "../../common/img/user.jpg";
import userpic from "../../common/img/default_avatar.png";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Dropdown, Avatar } from "antd";
import "./commonHeader.less";
import { useCommonStore } from "../store/common";
import { useNavigate } from "react-router";

const { Header } = Layout;

const CommonHeader: React.FC = () => {
  const { collapsed, setCollapsed } = useCommonStore((state) => state);
  const navigate = useNavigate();
  //登出
  const logout = () => {
    //清除local storage的currentUser
    localStorage.removeItem("currentUser");
    localStorage.removeItem("userRole");
    navigate("/users/login");
    // 强制刷新页面（可选，确保所有组件重新初始化）
    window.location.reload();
  };
  const items = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={logout}>
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
          height: 32,
          background: "#fff",
        }}
      />
      <Dropdown menu={{ items }}>
        <Avatar size={36} src={adminpic} />
      </Dropdown>
    </Header>
  );
};

export default CommonHeader;
