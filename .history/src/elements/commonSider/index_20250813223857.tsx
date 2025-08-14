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

const CommonSider = () => {
  return (
    <Sider trigger={null} collapsed={collapsed}>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} style={{ height: "100%" }} items={items} />
    </Sider>
  );
};

export default CommonSider;
