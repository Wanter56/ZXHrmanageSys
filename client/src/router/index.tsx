import { createBrowserRouter, Navigate } from "react-router";

import AuthGuard from "@router/AuthGuard";
import { isAdmin } from "@utils/auth";

import NotFound from "@pages/404Page";
import AccessMent from "@pages/accessment";
import Attendance from "@pages/attendance";
import AttendanceInfo from "@pages/attendanceInfo";
import DashBoard from "@pages/dashboard";
import Department from "@pages/department";
import Level from "@pages/level";
import RewardRecord from "@pages/rewardRecord";
import Salary from "@pages/salary";
import Staff from "@pages/staff";
import Login from "@pages/users/login";
import Main from "@pages/main";
import Modal from "@pages/staff/component/Modal";

// 创建带权限的路由组件
const ProtectedRoute = ({ element, requireAdmin = false }) => {
  // 未登录状态跳转登录页
  if (!localStorage.getItem("currentUser")) {
    return <Navigate to="/users/login" replace />;
  }
  // 需要管理员权限但不是管理员时跳转考勤管理
  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/attendance" replace />;
  }

  return element;
};
// 新增：根据用户角色返回不同的首页
const getHomePage = () => {
  // 未登录状态不处理，由ProtectedRoute处理跳转
  if (!localStorage.getItem("currentUser")) {
    return null;
  }
  // 管理员显示管理员首页，普通用户显示用户首页
  return isAdmin() ? <Navigate to="/dashboard" replace /> : <Navigate to="/attendance" replace />;
};

export const router = createBrowserRouter([
  {
    path: "/users/login",
    Component: Login,
  },
  {
    path: "/404",
    element: <NotFound />,
  },
  {
    path: "*",
    element: <Navigate to="/404" />,
  },
  {
    path: "/",
    element: (
      <AuthGuard>
        <Main />
      </AuthGuard>
    ),
    children: [
      {
        path: "/",
        // 修改：根据用户角色动态决定跳转页面
        element: getHomePage(),
      },
      {
        path: "/dashboard",
        element: <ProtectedRoute element={<DashBoard />} requireAdmin={true} />,
      },
      {
        path: "/accessment",
        element: <ProtectedRoute element={<AccessMent />} requireAdmin={false} />,
      },
      {
        path: "/attendance",
        element: <ProtectedRoute element={<Attendance />} requireAdmin={false} />,
      },
      {
        path: "/attendanceInfo",
        element: <ProtectedRoute element={<AttendanceInfo />} requireAdmin={false} />,
      },
      {
        path: "/department",
        // 修改：部门页面通常需要管理员权限
        element: <ProtectedRoute element={<Department />} requireAdmin={false} />,
      },
      {
        path: "/level",
        element: <ProtectedRoute element={<Level />} requireAdmin={false} />,
      },
      {
        path: "/rewardRecord",
        element: <ProtectedRoute element={<RewardRecord />} requireAdmin={false} />,
      },
      {
        path: "/salary",
        element: <ProtectedRoute element={<Salary />} requireAdmin={false} />,
      },
      {
        path: "/staff",
        // 修改：员工管理通常需要管理员权限
        element: <ProtectedRoute element={<Staff />} requireAdmin={false} />,
      },
    ],
  },
]);
