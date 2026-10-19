import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../../service/authService";

function ProtectedRoute({ children, allowedRoles = [] }) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
