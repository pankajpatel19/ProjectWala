import { useCurrentUser } from "@/hooks/useAuth";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoute() {
  const { data } = useCurrentUser();
  console.log(data);

  if (!data?.user) {
    <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
