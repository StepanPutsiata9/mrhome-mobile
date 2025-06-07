import axios from 'axios';
import { getTokens, storeTokens, clearTokens } from '../../Auth/authStorage';
import { router } from 'expo-router';

const api = axios.create({
  baseURL: 'https://testyandex.onrender.com/scenarios/',
  headers: {
    'Content-Type': 'application/json' 
  }
});

// Система очереди для обработки параллельных запросов
let isRefreshing = false;
let failedRequests = [];

const processQueue = (error, token = null) => {
  failedRequests.forEach(prom => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedRequests = [];
};


api.interceptors.request.use(async config => {
  try {
    const tokens = await getTokens();
    
    if (tokens?.accessToken) {
      config.headers.Authorization = `Bearer ${tokens.accessToken.trim()}`;
    }
    

    config.headers['Content-Type'] = 'application/json';
    
    return config;
  } catch (error) {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
});
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if ([401, 403].includes(error.response?.status) && !originalRequest._retry) {
      
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedRequests.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const tokens = await getTokens();
        if (!tokens?.refreshToken) {
          throw new Error('No refresh token available');
        }

        console.log('Attempting to refresh tokens...');
        
        const { data } = await axios.post(
          'https://testyandex.onrender.com/auth/refresh',
          { refreshToken: tokens.refreshToken },
          {
            headers: { 'Content-Type': 'application/json' },
          }
        );
        console.log('====================================');
        console.log("Токены ",data.accessToken);
        console.log('====================================');
        if (!data?.accessToken) {
          console.error('Invalid server response:', data);
          throw new Error('Server returned invalid token format');
        }
        await storeTokens(
          data.accessToken, 
          data.refreshToken || tokens.refreshToken
        );

        // 5. Обновляем заголовки
        api.defaults.headers.Authorization = `Bearer ${data.accessToken}`;
        processQueue(null, data.accessToken);
        
        return api(originalRequest);

      } catch (refreshError) {
        console.error('Refresh token failed:', {
          error: refreshError.message,
          response: refreshError.response?.data
        });
        
        await clearTokens();
        router.push('/');
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;