import { ApolloProvider } from '@apollo/client'
import type { ReactNode } from 'react'
import { useMemo } from 'react'

import { useAppSelector } from '../hooks'
import { createGraphQLClient } from '@/services/graphql'


