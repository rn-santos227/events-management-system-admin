export const THUNKS = {
  AUTH: {
    LOGIN: 'auth/login',
    LOGOUT: 'auth/logout',
  },

  AUDIT_LOGS: {
    FETCH: 'auditLogs/fetch',
  },

  PRIVILEGES: {
    FETCH: 'privileges/fetch',
    UPDATE_STATUS: 'privileges/updateStatus',
  },
} as const
