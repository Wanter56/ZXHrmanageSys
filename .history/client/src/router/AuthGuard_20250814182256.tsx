// src/router/AuthGuard.tsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// 验证登录状态：检查localStorage中是否有有效的用户信息
const isAuthenticated = (): boolean => {
  try {
    const currentUser = localStorage.getItem("currentUser");
    // 不仅要判断是否存在，还要简单验证格式是否正确
    if (currentUser) {
      const user = JSON.parse(currentUser);
      return !!user?.accountName; // 确保用户信息包含关键字段
    }
    return false;
  } catch (error) {
    console.error("登录状态验证失败:", error);
    return false;
  }
};

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const location = useLocation();

  // 未登录时，重定向到登录页，并记录当前路径（登录后可返回）
  if (!isAuthenticated()) {
    // 避免从登录页跳转时陷入循环
    if (location.pathname !== "/users/login") {
      return <Navigate to="/users/login" state={{ from: location.pathname }} replace />;
    }
    // 如果已经在登录页，不做跳转
    return null;
  }

  // 已登录则渲染子组件
  return <>{children}</>;
};

export default AuthGuard;
