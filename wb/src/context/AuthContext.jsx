import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("wb_user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  // persist user in localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem("wb_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("wb_user");
    }
  }, [user]);

  /**
   * payload example:
   * {
   *   id,
   *   username,
   *   email,
   *   role,   // "worker" | "customer" | "admin"
   *   token
   * }
   */
  const login = (payload) => {
    const { id, username, email, role, token } = payload;

    setUser({
      id,
      username,
      email,
      role,
      token,
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("wb_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: Boolean(user?.token),
        role: user?.role || null,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return ctx;
};
