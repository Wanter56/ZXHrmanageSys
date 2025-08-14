import React from "react";
import * as Icon from "@ant-design/icons";
import { Layout, Menu } from "antd";
import SiderMenuConfig from "../config/SiderMenuConfig";

const { Sider } = Layout;

//动态获取icon
// 动态获取icon，添加类型检查
const iconToElement = (name: string) => {
  const IconComponent = Icon[name as keyof typeof Icon];
  return IconComponent ? React.createElement(IconComponent) : null;
};
//处理菜单的数据
const items = SiderMenuConfig.map((icon) => {
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
    <Sider trigger={null}>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]} style={{ height: "100%" }} items={items} />
    </Sider>
  );
};

export default CommonSider;
