import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import * as Icon from "@ant-design/icons";
import { Layout, Menu } from "antd";
import SiderMenuConfig from "../config/SiderMenuConfig";
import { useCommonStore } from "../store/common";

// 引入权限函数
import { isAdmin } from "../../utils/auth";
const { Sider } = Layout;
import "./commonSider.less";

// 动态获取icon，添加类型检查
const iconToElement = (name: string) => {
  const IconComponent = Icon[name as keyof typeof Icon];
  return IconComponent ? React.createElement(IconComponent) : null;
};

const CommonSider = () => {
  const navigate = useNavigate();
  const { collapsed } = useCommonStore((state) => state);
  // 新增：使用状态存储菜单数据，确保角色变化时重新渲染
  const [menuItems, setMenuItems] = useState([]);

  // 新增：根据当前角色计算菜单数据的函数
  const calculateMenuItems = () => {
    return SiderMenuConfig.filter((item) => {
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
  };

  // 新增：监听角色变化并更新菜单
  useEffect(() => {
    // 初始计算菜单
    setMenuItems(calculateMenuItems());

    // 监听localStorage中用户信息变化（处理登出登录场景）
    const handleStorageChange = () => {
      setMenuItems(calculateMenuItems());
    };

    window.addEventListener("storage", handleStorageChange);

    // 清理函数
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []); // 空依赖数组确保只执行一次，但会响应storage事件

  const selectMenu = (e) => {
    navigate(e.key);
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <h3 className="app-name">{collapsed ? "织信" : "织信人事系统"}</h3>
      <Menu
        theme="dark"
        mode="inline"
        // 优化：使用当前路径作为默认选中项，而不是固定的"1"
        defaultSelectedKeys={[window.location.pathname]}
        style={{ height: "100%" }}
        items={menuItems} // 使用状态中的菜单数据
        onClick={selectMenu}
      />
    </Sider>
  );
};

export default CommonSider;
