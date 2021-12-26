import React from "react";
import { Redirect, Route } from "react-router-dom";
import Loading from "../Helper/Loading";
import { useAuth } from "./AuthProvider";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  const { currentUser, loading } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (loading) return <Loading property="auth state..." />;

        return currentUser ? (
          <RouteComponent />
        ) : (
          <Redirect to={`/login?redirect_to=${location.pathname}`} />
        );
      }}
    />
  );
};

export default PrivateRoute;
