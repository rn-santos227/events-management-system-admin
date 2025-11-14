import type { Endpoint } from '../types/endpoints'

export type ApiConfig = Record<string, Record<string, Endpoint>>

const defineEndpoint = <T extends Endpoint>(definition: T) => definition

const defineApiConfig = <T extends ApiConfig>(config: T) => config

export const API = defineApiConfig({
  AUTH: {
    LOGIN: defineEndpoint({
      method: 'POST',
      module: 'auth',
      path: '/api/auth/login',
      description: 'User login',
    }),
  },
})

export type ApiGroup = typeof API
