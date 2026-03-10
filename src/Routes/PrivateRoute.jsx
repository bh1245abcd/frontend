// import { Navigate } from "react-router-dom";
// import jwt_decode from "jwt-decode";

// const PrivateRoute = ({ children, allowedRoles }) => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   try {
//     const decoded = jwt_decode(token);
//     const userRoles = decoded.roles || [];

//     const hasAccess = allowedRoles.some(role =>
//       userRoles.includes(`ROLE_${role}`)
//     );

//     if (!hasAccess) {
//       return <Navigate to="/" replace />;
//     }

//     return children;
//   } catch (err) {
//     return <Navigate to="/login" replace />;
//   }
// };

// export default PrivateRoute;



import { Navigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const PrivateRoute = ({ children, allowedRoles }) => {
  // const token = localStorage.getItem("token");
  const token = sessionStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwt_decode(token);
    const roles = decoded.roles || [];

    const isAllowed = allowedRoles.some(role =>
      roles.includes(`ROLE_${role}`)
    );

    if (!isAllowed) {
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
