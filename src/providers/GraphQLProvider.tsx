import { ApolloProvider } from '@apollo/client'
import type { ReactNode } from 'react'
import { useMemo } from 'react'

import { useAuthToken } from '@/hooks'
import { createGraphQLClient } from '@/services/graphql'

interface GraphQLProviderProps {
  children: ReactNode
}

export function GraphQLProvider({ children }: GraphQLProviderProps) {
  const authToken = useAuthToken()
  const client = useMemo(() => createGraphQLClient(authToken), [authToken])
  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
