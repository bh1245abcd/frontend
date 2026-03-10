import jwt_decode from "jwt-decode";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  // const token = localStorage.getItem("token");
  const token = sessionStorage.getItem("token");

  if (token) {
    const decoded = jwt_decode(token);
    const roles = decoded.roles || [];

    if (roles.includes("ROLE_ADMIN")) {
      return <Navigate to="/admin" replace />;
    }
  }

  return children;
};

export default PublicRoute;
