import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  loginService,
  registerService,
  logoutService,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedAuthData = JSON.parse(localStorage.getItem('authData'));
    
    if (token && storedAuthData) {
      setAuthData(storedAuthData);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  const login = async (email, password) => {
    const data = await loginService(email, password);
    if (data) {
      // Extract role from the nested response
      const userData = {
        token: data.token,
        role: data.response.data.role
      };
      setAuthData(userData);
      localStorage.setItem("authData", JSON.stringify(userData));
      navigateToDashboard(data.response.data.role);
    }
  };

  const register = async (userData) => {
    const data = await registerService(userData);
    if (data) {
      setAuthData(data);
      localStorage.setItem("authData", JSON.stringify(data));
      navigateToDashboard(data.role);
    }
  };
  const logout = () => {
    logoutService();
    setAuthData(null);
    localStorage.removeItem("authData");
    navigate("/login");
  };

  const navigateToDashboard = (role) => {
    console.log("role: " + role);
    if (role === "user") {
      navigate("/user/dashboard");
    } else if (role === "admin") {
      navigate("/admin/dashboard");
    } else if (role === "service_provider") {
      navigate("/provider/dashboard");
    }
  };

  return (
    <AuthContext.Provider value={{ authData, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);