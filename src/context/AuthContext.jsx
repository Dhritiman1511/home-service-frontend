import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { loginService, registerService } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = () => {
      const storedAuthData = Cookies.get("authData");
      if (storedAuthData) {
        try {
          const parsedData = JSON.parse(storedAuthData);
          setAuthData(parsedData);
          axios.defaults.headers.common["Authorization"] = `Bearer ${parsedData.token}`;
        } catch (error) {
          console.error("Error parsing auth data:", error);
          Cookies.remove("authData");
        }
      }
      setLoading(false);
    };

    initializeAuth();

    // Add axios interceptor for handling 401 errors
    const interceptor = axios.interceptors.response.use(
      response => response,
      error => {
        if (error.response?.status === 401) {
          logout();
        }
        return Promise.reject(error);
      }
    );

    // Cleanup
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const { token, response } = await loginService(email, password);
      const userData = {
        token,
        role: response.data.role,
      };
      
      setAuthData(userData);
      Cookies.set("authData", JSON.stringify(userData), { 
        expires: 7,
        secure: true,
        sameSite: 'strict'
      });
      
      axios.defaults.headers.common["Authorization"] = `Bearer ${userData.token}`;
      navigateToDashboard(response.data.role);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const data = await registerService(userData);
      const registeredData = {
        token: data.token,
        role: data.role,
      };
      
      setAuthData(registeredData);
      Cookies.set("authData", JSON.stringify(registeredData), {
        expires: 7,
        secure: true,
        sameSite: 'strict'
      });
      
      axios.defaults.headers.common["Authorization"] = `Bearer ${registeredData.token}`;
      navigateToDashboard(data.role);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setAuthData(null);
    Cookies.remove("authData");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/login");
  };

  const navigateToDashboard = (role) => {
    if (role === "user") {
      navigate("/user/dashboard");
    } else if (role === "admin") {
      navigate("/admin/dashboard");
    } else if (role === "service_provider") {
      navigate("/provider/dashboard");
    }
  };

  return (
    <AuthContext.Provider value={{ 
      authData, 
      login, 
      register, 
      logout,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);