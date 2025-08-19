import React from "react";
import { useNavigate } from "react-router";
import * as Icon from "@ant-design/icons";
import { Layout, Menu } from "antd";
import SiderMenuConfig from "../config/SiderMenuConfig";
import { useCommonStore } from "../store/common";

//引入权限函数
import { isAdmin } from "../../utils/auth";
const { Sider } = Layout;
import "./commonSider.less";

//动态获取icon
// 动态获取icon，添加类型检查
const iconToElement = (name: string) => {
  const IconComponent = Icon[name as keyof typeof Icon];
  return IconComponent ? React.createElement(IconComponent) : null;
};
//处理菜单的数据
// 处理菜单的数据，添加权限过滤
const items = SiderMenuConfig.filter((item) => {
  // 不需要管理员权限的菜单直接显示
  if (!item.requireAdmin) return true;
  // 需要管理员权限的菜单仅管理员可见
  return isAdmin();
}).map((icon) => {
  return {
    key: icon.path,
    label: icon.label,
    icon: iconToElement(icon.icon),
  };
});

const CommonSider = () => {
  const navigate = useNavigate();
  const { collapsed } = useCommonStore((state) => state);
  const selectMenu = (e) => {
    navigate(e.key);
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <h3 className="app-name">{collapsed ? "织信" : "织信人事系统"}</h3>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["1"]}
        style={{ height: "100%" }}
        items={items}
        onClick={selectMenu}
      />
    </Sider>
  );
};

export default CommonSider;
