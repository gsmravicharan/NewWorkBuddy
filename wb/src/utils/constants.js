export const API_BASE = import.meta.env.VITE_REACT_APP_API_BASE_URL || '';

export const ROLES = {
  WORKER: 'WORKER',
  CUSTOMER: 'CUSTOMER',
};

export const ENDPOINTS = {
  AUTH_LOGIN: '/auth/login',
  AUTH_REGISTER: '/auth/register',
  AUTH_FORGOT_PASSWORD: '/auth/forgot-password',
  REQUESTS: '/requests',
  SERVICES: '/services',
};

export default {
  API_BASE,
  ROLES,
  ENDPOINTS,
};
