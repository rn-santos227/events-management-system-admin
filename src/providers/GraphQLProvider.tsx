import { ApolloProvider } from '@apollo/client'
import type { ReactNode } from 'react'
import { useMemo } from 'react'

import { useAppSelector } from '../app/hooks'
import { createGraphQLClient } from '@/services/graphql'

interface GraphQLProviderProps {
  children: ReactNode
}

export function GraphQLProvider({ children }: GraphQLProviderProps) {
  const authToken = useAppSelector((state) => state.auth.token)

  const client = useMemo(() => createGraphQLClient(authToken), [authToken])

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}
