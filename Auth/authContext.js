import React, { createContext, useState, useEffect } from 'react';
import { getTokens, clearTokens, storeTokens } from './authStorage';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState("");
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
        setToken(null);
      }
    } catch (error) {
      console.error('Error loading user:', error);
      setUser(null);
      setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (accessToken, refreshToken) => {
    try {
      // 1. Валидация входных параметров
      if (!accessToken || !refreshToken) {
        throw new Error("Access token and refresh token are required");
      }
      try {
        await storeTokens(accessToken, refreshToken);
      } catch (storageError) {
        console.error('Failed to store tokens:', storageError);
        throw new Error("Failed to save authentication data");
      }
      try {
        const tokens = await getTokens();
        if (tokens?.accessToken && checkTokenExpiration(tokens.accessToken)) {
          const decoded = jwtDecode(tokens.accessToken);
          setUser(decoded);
          setToken(tokens.accessToken);
        } else {
          setUser(null);
          setToken(null);
        }
      } catch (error) {
        console.error('Login error:', error);
        setUser(null);
        setToken(null);
      }
      return true;
    } catch (error) {
      console.error('Login error:', error);
      // Сбрасываем состояние при ошибке
      setUser(null);
      setToken(null);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await clearTokens();
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  useEffect(() => {
    // loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };