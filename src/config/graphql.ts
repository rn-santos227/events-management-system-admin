const normalizeEndpoint = (value?: string | null) => value?.trim() || undefined

const DEFAULT_GRAPHQL_ENDPOINT = '/graphql'

export const GRAPHQL_ENDPOINT = (() => {
  if (import.meta.env.DEV) {
    const devEndpoint = normalizeEndpoint(import.meta.env.VITE_GRAPHQL_DEV_ENDPOINT)
    if (devEndpoint) {
      return devEndpoint
    }
  }

  return normalizeEndpoint(import.meta.env.VITE_GRAPHQL_ENDPOINT) ?? DEFAULT_GRAPHQL_ENDPOINT
})()
