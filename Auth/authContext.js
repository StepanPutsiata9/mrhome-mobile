import React, { createContext, useContext, useState, useEffect } from 'react';
import { getTokens, clearTokens } from './authStorage';
import jwtDecode from 'jwt-decode';

const AuthContext = createContext();

export  const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkTokenExpiration = (token) => {
    if (!token) return false;
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  };

  const loadUser = async () => {
    setIsLoading(true);
    try {
      const tokens = await getTokens();
      if (tokens && tokens.accessToken && checkTokenExpiration(tokens.accessToken)) {
        const decoded = jwtDecode(tokens.accessToken);
        setUser(decoded);
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

  const login = (accessToken, refreshToken) => {
    const decoded = jwtDecode(accessToken);
    setUser(decoded);
    storeTokens(accessToken, refreshToken);
  };

  const logout = async () => {
    await clearTokens();
    setUser(null);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthContext};