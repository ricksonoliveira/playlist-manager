import axios, { AxiosInstance } from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Include cookies for session auth
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to get CSRF token from cookies
const getCsrfToken = (): string | undefined => {
  return document.cookie
    .split('; ')
    .find((row) => row.startsWith('csrftoken='))
    ?.split('=')[1];
};

// Add request interceptor to include CSRF token
api.interceptors.request.use((config) => {
  const csrfToken = getCsrfToken();

  if (csrfToken) {
    config.headers['X-CSRFToken'] = csrfToken;
  }

  return config;
});

// Initialize CSRF token by making a GET request to any endpoint
const initializeCsrfToken = async () => {
  try {
    await api.get('/auth/me/').catch(() => {
      // It's okay if this fails, we just want to get the CSRF cookie
    });
  } catch (error) {
    console.error('Error initializing CSRF token:', error);
  }
};

// Initialize on module load
initializeCsrfToken();

export default api;

