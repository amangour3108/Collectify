import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

// Initialize state directly from local storage
const getInitialUser = () => {
  const storedUser = localStorage.getItem("user");
  return storedUser ? JSON.parse(storedUser) : null;
};

const getInitialToken = () => {
  return localStorage.getItem("token");
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getInitialUser);
  const [token, setToken] = useState(getInitialToken);

  // No longer need to re-fetch on mount, as state is already initialized
  useEffect(() => {
    // This effect can now be used for other side effects if needed, but not for initial state.
  }, []);

  const login = (userData, tokenValue) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", tokenValue);
    setUser(userData);
    setToken(tokenValue);
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);