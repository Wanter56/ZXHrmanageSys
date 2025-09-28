import { Navigate } from "react-router-dom";
import { useAuth } from "@auth/AuthProvider";

export default function HomeRedirect() {
  const { user, loading } = useAuth();
  if (loading) return null;
  if (!user) return <Navigate to="/users/login" replace />;
  const isAdmin = user.roles?.includes("admin");
  return <Navigate to={isAdmin ? "/dashboard" : "/attendance"} replace />;
}
