// src/router/AuthGuard.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// 严格验证登录状态
const isAuthenticated = (): boolean => {
  try {
    // 1. 检查localStorage中是否存在用户信息
    const currentUserStr = localStorage.getItem("currentUser");
    if (!currentUserStr) return false; // 无用户信息 → 未登录

    // 2. 解析并验证用户信息格式
    const currentUser = JSON.parse(currentUserStr);
    console.log(currentUser);
    // 必须包含关键标识字段（根据你的用户结构调整）
    if (
      typeof currentUser === "object" &&
      currentUser !== null &&
      typeof currentUser.accountName === "string" && // 确保账号存在
      currentUser.accountName.trim() !== ""
    ) {
      return true; // 验证通过 → 已登录
    }

    // 格式错误视为未登录
    return false;
  } catch (error) {
    console.error("登录状态验证失败:", error);
    // 任何异常都视为未登录
    return false;
  }
};

// 路由守卫组件
const AuthGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  // 未登录 → 强制跳转到登录页
  if (!isAuthenticated()) {
    // 避免从登录页跳转时陷入循环
    if (location.pathname !== "/users/login") {
      return <Navigate to="/users/login" state={{ from: location.pathname }} replace />;
    }
    // 已在登录页 → 不渲染内容
    return null;
  }
  // 已登录 → 渲染受保护内容
  return <>{children}</>;
};

export default AuthGuard;
