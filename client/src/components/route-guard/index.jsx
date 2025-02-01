import { Navigate, useLocation } from "react-router-dom";
import { Fragment } from "react";

function RouteGuard({ authenticated, user, element, allowedRoles = [] }) {
  const location = useLocation();
  
  // Redirect to login if not authenticated (except for auth pages)
  if (!authenticated && !location.pathname.includes("/auth")) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // Redirect away from auth pages if already authenticated
  if (authenticated && location.pathname.includes("/auth")) {
    const defaultPath = user?.role === "instructor" ? "/instructor/courses" : "/student/courses";
    return <Navigate to={defaultPath} replace />;
  }

  // Check role-based access if roles are specified
  if (authenticated && allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    const defaultPath = user?.role === "instructor" ? "/instructor/courses" : "/student/courses";
    return <Navigate to={defaultPath} replace />;
  }

  return <Fragment>{element}</Fragment>;
}

export default RouteGuard;
