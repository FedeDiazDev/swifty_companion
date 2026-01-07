import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { refreshAccessToken } from './authService';

const TOKEN_KEY = 'swifty_access_token';
const REFRESH_TOKEN_KEY = 'swifty_refresh_token';

const api = axios.create({
    baseURL: 'https://api.intra.42.fr/v2',
});

api.interceptors.request.use(
    async (config) => {
        const token = await SecureStore.getItemAsync(TOKEN_KEY);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

type TokenListener = (token: string | null) => void;
let listeners: TokenListener[] = [];

export const onTokenUpdate = (callback: TokenListener) => {
    listeners.push(callback);
    return () => {
        listeners = listeners.filter(l => l !== callback);
    };
};

const notifyListeners = (token: string | null) => {
    listeners.forEach(l => l(token));
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
                if (!refreshToken) throw new Error("No refresh token available");

                const data = await refreshAccessToken(refreshToken);

                await SecureStore.setItemAsync(TOKEN_KEY, data.access_token);
                if (data.refresh_token) {
                    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, data.refresh_token);
                }

                notifyListeners(data.access_token);
                originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
                return api(originalRequest);

            } catch (refreshError) {
                console.error("Session expired, please login again", refreshError);
                await SecureStore.deleteItemAsync(TOKEN_KEY);
                await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);
                notifyListeners(null);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;
