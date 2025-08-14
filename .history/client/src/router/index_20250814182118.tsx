import { createBrowserRouter } from "react-router";
import AuthGuard from "../router/AuthGuard";
import { Navigate } from "react-router";

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
    Component: Main,
    children: [
      {
        path: "/",
        element: (
          <AuthGuard>
            <DashBoard />
          </AuthGuard>
        ),
        index: true,
      },
      {
        path: "/dashboard",
        element: (
          <AuthGuard>
            <DashBoard />
          </AuthGuard>
        ),
      },

      {
        path: "/accessment",
        element: (
          <AuthGuard>
            <AccessMent />
          </AuthGuard>
        ),
      },
      {
        path: "/attendance",
        element: (
          <AuthGuard>
            <Attendance />
          </AuthGuard>
        ),
      },
      {
        path: "/attendanceInfo",
        element: (
          <AuthGuard>
            <AttendanceInfo />
          </AuthGuard>
        ),
      },
      {
        path: "/department",
        element: (
          <AuthGuard>
            <Department />
          </AuthGuard>
        ),
      },
      {
        path: "/level",
        element: (
          <AuthGuard>
            <Level />
          </AuthGuard>
        ),
      },
      {
        path: "/rewardRecord",
        element: (
          <AuthGuard>
            <RewardRecord />
          </AuthGuard>
        ),
      },
      {
        path: "/salary",
        element: (
          <AuthGuard>
            <Salary />
          </AuthGuard>
        ),
      },
      {
        path: "/staff",
        element: (
          <AuthGuard>
            <Staff />
          </AuthGuard>
        ),
      },
    ],
  },
]);
