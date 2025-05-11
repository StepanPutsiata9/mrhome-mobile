import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTokens, clearTokens, storeTokens } from './authStorage';
import { jwtDecode } from 'jwt-decode'; // Используем именованный импорт

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token,setToken]=useState("");
  const checkTokenExpiration = (token) => {
    if (!token) return false;
    try {
      const decoded = jwtDecode(token);
      return decoded.exp * 1000 > Date.now();
    } catch (error) {
      console.error('Token decode error:', error);
      return false;
    }
  };

  const loadUser = async () => {
    setIsLoading(true);
    try {
      const tokens = await getTokens();
      if (tokens?.accessToken && checkTokenExpiration(tokens.accessToken)) {
        const decoded = jwtDecode(tokens.accessToken);
        setUser(decoded);
        setToken(tokens.accessToken);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error loading user:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (accessToken, refreshToken) => {
    try {
      const decoded = jwtDecode(accessToken);
      console.log('Decoded token:', decoded);
      setUser(decoded);
      await storeTokens(accessToken, refreshToken);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await clearTokens();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user,token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };