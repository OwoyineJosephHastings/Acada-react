import React, { useContext } from "react";

export const AuthContext = React.createContext({
  currentUser: null,
  loading: true,
});

export const useAuth = () => {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};

export const AuthProvider = ({ children, auth }) => {
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};
