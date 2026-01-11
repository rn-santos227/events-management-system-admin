import type { ReactNode } from 'react'
import { Provider } from 'react-redux'

import { store } from '../app/store'
import { GraphQLProvider } from './GraphQLProvider'
import { UserSettingsProvider } from './UserSettingsProvider'
import { DialogProvider, ToastProvider } from '@/components/ui'

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <Provider store={store}>
      <GraphQLProvider>
        <UserSettingsProvider>
          <ToastProvider>
            <DialogProvider>{children}</DialogProvider>
          </ToastProvider>
        </UserSettingsProvider>
      </GraphQLProvider>
    </Provider>
  )
}
