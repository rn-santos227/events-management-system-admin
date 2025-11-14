export const API = {
  AUTH: {
    LOGIN: {
      method: 'POST',
      module: 'auth',
      path: '/api/auth/login',
      description: 'User login',
    } as const,
  },
} as const;

export type ApiGroup = typeof API
