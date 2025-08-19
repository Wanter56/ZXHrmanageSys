import { createBrowserRouter } from "react-router";
import AuthGuard from "../router/AuthGuard";
import { Navigate } from "react-router";

import { isAdmin } from "../utils/auth";

import NotFound from "../pages/404Page";
import AccessMent from "../pages/accessment";
import Attendance from "../pages/attendance";
import AttendanceInfo from "../pages/attendanceInfo";
import DashBoard from "../pages/dashboard";
import Department from "../pages/department";
import Level from "../pages/level";
import RewardRecord from "../pages/rewardRecord";
import Salary from "../pages/salary";
import Staff from "../pages/staff";
import Login from "../pages/users/login";
import Main from "../pages/main";

// 创建带权限的路由组件
const ProtectedRoute = ({ element, requireAdmin = false }) => {
  // 未登录状态跳转登录页
  if (!localStorage.getItem("currentUser")) {
    return <Navigate to="/users/login" replace />;
  }

  // 需要管理员权限但不是管理员时跳转404
  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/404" replace />;
  }

  return element;
};

export const router = createBrowserRouter([
  {
    path: "/users/login",
    Component: Login,
  },
  {
    path: "/404",
    element: <NotFound />, // 直接渲染404，不做保护
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
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "/dashboard",
        element: <ProtectedRoute element={<DashBoard />} requireAdmin={true} />,
      },

      {
        path: "/accessment",
        element: <AccessMent />,
      },
      {
        path: "/attendance",
        element: <Attendance />,
      },
      {
        path: "/attendanceInfo",
        element: <AttendanceInfo />,
      },
      {
        path: "/department",
        element: <Department />,
      },
      {
        path: "/level",
        element: <Level />,
      },
      {
        path: "/rewardRecord",
        element: <RewardRecord />,
      },
      {
        path: "/salary",
        element: <Salary />,
      },
      {
        path: "/staff",
        element: <Staff />,
      },
    ],
  },
]);
