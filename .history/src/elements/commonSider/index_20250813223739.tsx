import React from "react";
import { Layout, Menu } from "antd";
import SiderMenuConfig from "../config/sideMenuConfig";

const { Sider } = Layout;

//动态获取icon
const iconToElement = (name) => React.createElement(Icon[name]);

//处理菜单的数据
const items = MenuConfig.map((icon) => {
  //没有子菜单
  const child = {
    key: icon.path,
    label: icon.label,
    icon: iconToElement(icon.icon),
  };
  return child;
});

const Sider = () => {
  return (
    <Sider trigger={null} collapsed={collapsed}>
      <h3 className="app-name">{collapsed ? "后台" : "通用后台管理系统"}</h3>
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

export default Sider;
