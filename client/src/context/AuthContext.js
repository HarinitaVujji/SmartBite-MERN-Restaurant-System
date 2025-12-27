// client/src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("sb_user")) || null;
    } catch (e) {
      return null;
    }
  });
  const [token, setToken] = useState(() => localStorage.getItem("sb_token") || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // set axios default header when token changes
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [token]);

  const signup = async ({ name, email, password }) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/auth/register`, { name, email, password });
      setLoading(false);
      return res.data;
    } catch (err) {
  // pick the best message we can from axios error object
  const msg =
    err?.response?.data?.message || // server message field
    err?.response?.data?.error ||   // sometimes server uses 'error'
    err?.response?.data ||          // fallback: whole body (may be object)
    err?.message ||                 // generic error message
    "Request failed";

  // If the server body is an object, convert to string sensibly:
  const messageString = typeof msg === "string" ? msg : JSON.stringify(msg);

  // throw a proper Error (so the overlay prints the message not [object Object])
  throw new Error(messageString);
}
  };

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/auth/login`, { email, password });
      const { token: t, user: u } = res.data;
      setToken(t);
      setUser(u);
      localStorage.setItem("sb_token", t);
      localStorage.setItem("sb_user", JSON.stringify(u));
      setLoading(false);
      return res.data;
    } catch (err) {
  // pick the best message we can from axios error object
  const msg =
    err?.response?.data?.message || // server message field
    err?.response?.data?.error ||   // sometimes server uses 'error'
    err?.response?.data ||          // fallback: whole body (may be object)
    err?.message ||                 // generic error message
    "Request failed";

  // If the server body is an object, convert to string sensibly:
  const messageString = typeof msg === "string" ? msg : JSON.stringify(msg);

  // throw a proper Error (so the overlay prints the message not [object Object])
  throw new Error(messageString);
}
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("sb_token");
    localStorage.removeItem("sb_user");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
