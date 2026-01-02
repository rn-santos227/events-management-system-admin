import type { Endpoint } from '../types/endpoints'
import { API_ENDPOINTS, BASE_API_PREFIX } from '@/constants/api'

export type ApiConfig = Record<string, Record<string, Endpoint>>

const defineEndpoint = <T extends Endpoint>(definition: T) => definition

const defineApiConfig = <T extends ApiConfig>(config: T) => config

export const API = defineApiConfig({
  AUDIT_LOGS: {
    LIST: defineEndpoint({
      method: 'GET',
      module: 'audit',
      path: BASE_API_PREFIX + API_ENDPOINTS.AUDIT_LOGS.ROOT,
      description: 'Audit log list',
    }),

    SEARCH: defineEndpoint({
      method: 'GET',
      module: 'audit',
      path: BASE_API_PREFIX + API_ENDPOINTS.AUDIT_LOGS.SEARCH,
      description: 'Search audit logs',
    }),

    BY_USER: defineEndpoint({
      method: 'GET',
      module: 'audit',
      path: BASE_API_PREFIX + API_ENDPOINTS.AUDIT_LOGS.BY_USER,
      description: 'Audit logs for user',
    }),
  },

  AUTH: {
    LOGIN: defineEndpoint({
      method: 'POST',
      module: 'auth',
      path: BASE_API_PREFIX + API_ENDPOINTS.AUTH.LOGIN,
      description: 'User login',
    }),

    LOGOUT: defineEndpoint({
      method: 'POST',
      module: 'auth',
      path: BASE_API_PREFIX + API_ENDPOINTS.AUTH.LOGOUT,
      description: 'User logout',
    }),
  },

  PRIVILEGES: {

  },
})

export type ApiGroup = typeof API
