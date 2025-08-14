import { createBrowserRouter } from "react-router";
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
import ForgetPassword from "../pages/users/forgetPassword";
import Main from "../pages/main";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Main,
    children: [
      {
        path: "/dashboard",

        element: <Navigate to="/dashboard" />,
      },

      {
        path: "/users/login",
        element: <Login />,
      },
      {
        path: "/users/forgetPassword",
        element: <ForgetPassword />,
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
        path: "/dashboard",
        element: <DashBoard />,
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

      {
        path: "/404",
        element: <NotFound />,
      },
      {
        path: "*",
        element: <Navigate to="/404" />,
      },
    ],
    errorElement: <NotFound />,
  },
]);
