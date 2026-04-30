import { createContext, useContext, useState } from "react";
import { setClerkUserId as setAxiosUser } from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
    setAxiosUser(userData.clerkUserId);
  };

  const logout = () => {
    setUser(null);
    setAxiosUser("");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);