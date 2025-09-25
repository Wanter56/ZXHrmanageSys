// src/components/Require.tsx
import React from "react";
import { useAuth } from "../auth/AuthProvider";

export const RequireRole: React.FC<{ role: string; children: React.ReactNode }> = ({ role, children }) => {
  const { user, loading } = useAuth();
  if (loading) return null; // 等待 /api/me
  if (!user) return null; // 未登录的走上层 AuthGuard 重定向
  return user.roles?.includes(role) ? <>{children}</> : null;
};

export const RequirePerm: React.FC<{ perm: string; children: React.ReactNode }> = ({ perm, children }) => {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return null;
  return user.perms?.includes(perm) ? <>{children}</> : null;
};
