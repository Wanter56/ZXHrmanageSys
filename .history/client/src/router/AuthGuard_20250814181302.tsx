import React from "react";
import { Navigate, useLocation } from "react-router-dom";

// 验证用户是否已登录
const isAuthenticated = (): boolean => {
  try {
    // 检查localStorage中是否有当前用户信息
    const currentUser = localStorage.getItem("currentUser");
    return !!currentUser; // 有值则返回true，否则返回false
  } catch (error) {
    console.error("验证登录状态失败:", error);
    return false;
  }
};

interface AuthGuardProps {
  children: React.ReactNode; // 需要保护的路由组件
}

// 路由守卫组件
const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const location = useLocation();

  // 如果未登录，重定向到登录页，并记录当前位置以便登录后返回
  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  // 已登录则渲染受保护的组件
  return <>{children}</>;
};

export default AuthGuard;
