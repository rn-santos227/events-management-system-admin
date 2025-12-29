import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { useAuthState } from '@/hooks'
import { ROUTES } from '@/constants/routes'

interface GuestRouteProps {
  children: ReactNode
  redirectTo?: string
}

export default function GuestRoute({ children, redirectTo = ROUTES.DASHBOARD }: GuestRouteProps) {
  const { status, token } = useAuthState()
  const isAuthenticated = status === 'authenticated' && Boolean(token)

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}
