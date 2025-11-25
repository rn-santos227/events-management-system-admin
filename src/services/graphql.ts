import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { GRAPHQL_ENDPOINT } from '@/config/graphql'

export const createGraphQLClient = (authToken?: string | null) => {
  const httpLink = createHttpLink({
    uri: GRAPHQL_ENDPOINT,
    credentials: 'include',
  })

  const authLink = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
    },
  }))

  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
    connectToDevTools: import.meta.env.DEV,
  })
}
