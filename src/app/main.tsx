import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import './index.css'
import { router } from './router'
import { AppLayout } from './layouts'
import { AppProviders } from './providers'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProviders>
      <AppLayout>
        <RouterProvider router={router} />
      </AppLayout>
    </AppProviders>
  </React.StrictMode>,
)
