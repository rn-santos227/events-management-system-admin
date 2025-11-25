import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

import { GRAPHQL_ENDPOINT } from '@/config/graphql'

export const createGraphQLClient = (authToken?: string | null) => {

}
