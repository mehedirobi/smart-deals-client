import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { Authcontext } from "../../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(Authcontext);
  const location = useLocation();

  if (loading) {
    return <span className="loading loading-dots loading-xs"></span>;
  }

  if (user) {
    return children;
  }

  return (
    <Navigate
      to="/login"
      state={{ from: location }}
      replace
    />
  );
};

export default PrivateRoute;