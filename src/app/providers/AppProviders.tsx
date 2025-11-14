import type { ReactNode } from 'react'
import { Provider } from 'react-redux'

import { store } from '../store'
import { DialogProvider } from '@/components/ui'

interface AppProvidersProps {
  children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <Provider store={store}>
      <DialogProvider>{children}</DialogProvider>
    </Provider>
  )
}
