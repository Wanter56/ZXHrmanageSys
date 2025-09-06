import React from "react";

import { useThemeStore } from "@store/ThemeStore";

// 引入权限函数
import { isAdmin } from "../../utils/auth";
import adminpic from "../../common/img/user.jpg";
import userpic from "../../common/img/default_avatar.png";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Dropdown, Avatar } from "antd";
import { useCommonStore } from "../store/common";
import { useNavigate } from "react-router";

const { Header } = Layout;

const CommonHeader: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
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
    <Header className="flex justify-between items-center h-16 px-5 bg-box-bg! border-b border-box-border">
      <Button
        className="text-lg w-16 h-8"
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
      />
      <div className="min-w-max flex items-center gap-x-3">
        <button
          onClick={toggleTheme}
          className="outline-none flex relative text-heading-2 rounded-full p-2 lg:p-3 border border-box-border cursor-pointer"
        >
          {theme === "dark" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              />
            </svg>
          )}
        </button>
      </div>
      <Dropdown menu={{ items }} className="cursor-pointer border-b">
        <Avatar size={36} src={isAdmin() ? adminpic : userpic} className="border border-box-border cursor-pointer" />
      </Dropdown>
    </Header>
  );
};

export default CommonHeader;
