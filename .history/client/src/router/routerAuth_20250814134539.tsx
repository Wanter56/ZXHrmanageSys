import { Navigate } from "react-router-dom";
export const RouterAuth = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/users/login" replace />;
  } else {
    return children;
  }
};
