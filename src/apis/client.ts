import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import urls from "./urls";

const api = axios.create({
  baseURL: import.meta.env.PUBLIC_API_URL || "http://localhost:3000/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

let accessToken: string | null = localStorage.getItem("accessToken") || null;
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (reason?: any) => void;
  config: InternalAxiosRequestConfig;
}> = [];

function clearSessionAndRedirect() {
  localStorage.removeItem("user");
  localStorage.removeItem("accessToken");
  accessToken = null;

  if (window.location.pathname !== "/login") {
    window.location.href = "/login";
  }
}

// --- REQUEST INTERCEPTOR (attach token) ---
api.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- PROCESS QUEUE (must be defined before use) ---
function processQueue(error: Error | null, token: string | null = null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      if (token) {
        prom.config.headers.Authorization = `Bearer ${token}`;
      }
      prom.resolve(api(prom.config));
    }
  });
  failedQueue = [];
}

// --- RESPONSE INTERCEPTOR (refresh token) ---
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Only handle 401 and avoid infinite loops
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }
    originalRequest._retry = true;

    // If already refreshing, queue this request
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject, config: originalRequest });
      });
    }

    isRefreshing = true;

    try {
      // Attempt to refresh the access token (refresh token is in HttpOnly cookie)
      const refreshResponse = await axios.post(
        `${import.meta.env.PUBLIC_API_URL || "http://localhost:3000/api/v1"}${urls.refreshAccess}`,
        {},
        { withCredentials: true }
      );

      // Extract new access token – adjust property name if needed
      const newAccessToken = refreshResponse.data?.accessToken;
      if (!newAccessToken) {
        throw new Error("No access token in refresh response");
      }

      // Store the new token
      localStorage.setItem("accessToken", newAccessToken);
      accessToken = newAccessToken;

      // Update the original request's Authorization header
      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

      // Process queued requests with the new token
      processQueue(null, newAccessToken);

      // Retry the original request
      return api(originalRequest);
    } catch (refreshError) {
      // If refresh fails, clear session and redirect
      processQueue(refreshError as Error);
      clearSessionAndRedirect();
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default api;