import type { Endpoint } from '../types/endpoints'
import { API_ENDPOINTS } from '@/constants/api'

export type ApiConfig = Record<string, Record<string, Endpoint>>

const defineEndpoint = <T extends Endpoint>(definition: T) => definition

const defineApiConfig = <T extends ApiConfig>(config: T) => config

export const API = defineApiConfig({
  AUTH: {
    LOGIN: defineEndpoint({
      method: 'POST',
      module: 'auth',
      path: API_ENDPOINTS.AUTH.LOGIN,
      description: 'User login',
    }),
  },
})

export type ApiGroup = typeof API
