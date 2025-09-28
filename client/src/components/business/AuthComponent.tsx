import React from "react";
import { isAdmin } from "../../utils/auth";

interface AuthComponentProps {
  children: React.ReactNode;
  requireAdmin?: boolean; // 是否需要管理员权限
}

/**
 * 权限控制组件，根据用户角色决定是否渲染子组件
 */
const AuthComponent: React.FC<AuthComponentProps> = ({ children, requireAdmin = false }) => {
  // 未登录状态不渲染
  const hasLogin = !!localStorage.getItem("currentUser");
  if (!hasLogin) return null;

  // 需要管理员权限但不是管理员时不渲染
  if (requireAdmin && !isAdmin()) return null;

  // 满足权限条件，渲染子组件
  return <>{children}</>;
};

export default AuthComponent;
