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
    // 1. Валидация входных параметров
    if (!accessToken || !refreshToken) {
      throw new Error("Access token and refresh token are required");
    }

    // 2. Декодирование токена с обработкой ошибок
    let decoded;
    try {
      decoded = jwtDecode(accessToken);
    } catch (decodeError) {
      console.error('Token decode failed:', decodeError);
      throw new Error("Invalid token format");
    }

    // 3. Проверка срока действия токена
    if (decoded.exp * 1000 <= Date.now()) {
      throw new Error("Token has expired");
    }

    // 4. Обновление состояния
    setUser(decoded);
    setToken(accessToken);

    // 5. Сохранение токенов с обработкой ошибок
    try {
      await storeTokens(accessToken, refreshToken);
    } catch (storageError) {
      console.error('Failed to store tokens:', storageError);
      // Откатываем состояние, если не удалось сохранить токены
      setUser(null);
      setToken("");
      throw new Error("Failed to save authentication data");
    }

    return true; // Успешный логин
  } catch (error) {
    console.error('Login error:', error);
    // Перебрасываем ошибку для обработки в компоненте
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