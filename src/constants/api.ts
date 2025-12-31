export const BASE_API_PREFIX = "/api/v1/"
export const API_ENDPOINTS = {
  AUDIT_LOGS: {
    ROOT: 'audit-logs',
    SEARCH: 'audit-logs/search',
    BY_USER: 'audit-logs/:id',
  },
 
  AUTH: {
    ROOT: 'auth',
    LOGIN: 'auth/login',
    LOGOUT: 'auth/logout',
  },
} as const
