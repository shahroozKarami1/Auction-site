import axios from "axios";
import {
  getAccessToken,
  setAccessToken,
  getRefreshToken,
} from "@/app/utils/token";

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
});

api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Get the refresh token
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        try {
          const response = await axios.post("/api/refresh", {
            token: refreshToken,
          });
          const newAccessToken = response.data.access_token;

          setAccessToken(newAccessToken); // Store the new access token

          // Retry the original request with the new token
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return api(originalRequest);
        } catch (refreshError) {
          // Handle refresh token failure (e.g., logout)
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
