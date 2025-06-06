import axios from 'axios';
import { getTokens, storeTokens, clearTokens } from '../../Auth/authStorage'; 


const scenariiApi = axios.create({
  baseURL: 'https://testyandex.onrender.com/scenarios/',
});


scenariiApi.interceptors.request.use(async (config) => {
  const tokens = await getTokens();
  if (tokens?.accessToken) {
    config.headers.Authorization = `Bearer ${tokens.accessToken.trim()}`;
  }
  config.headers['Content-Type'] = 'application/json';
  return config;
});


scenariiApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const tokens = await getTokens();

    if (
      error.response?.status === 401 &&
      tokens?.refreshToken &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {

        const response = await axios.post(
          'https://testyandex.onrender.com/refresh',
          { refreshToken: tokens.refreshToken }
        );

        const { accessToken, refreshToken } = response.data;
        await storeTokens(accessToken, refreshToken);

        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return scenariiApi(originalRequest);
      } catch (refreshError) {

        await clearTokens();

        console.log("Не удалось обновить токен, перенаправляем на логин...");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default scenariiApi;