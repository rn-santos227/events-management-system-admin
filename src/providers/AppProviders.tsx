import type { ReactNode } from 'react'
import { Provider } from 'react-redux'

import { store } from '../app/store'
import { GraphQLProvider } from './GraphQLProvider'
import { DialogProvider, ToastProvider } from '@/components/ui'

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <Provider store={store}>
      <GraphQLProvider>
        <ToastProvider>
          <DialogProvider>{children}</DialogProvider>
        </ToastProvider>
      </GraphQLProvider>
    </Provider>
  )
}
