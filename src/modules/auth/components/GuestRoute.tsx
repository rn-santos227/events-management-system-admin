import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

import { useAppSelector } from '@/app/hooks'
import { ROUTES } from '@/constants/routes'

interface GuestRouteProps {
  children: ReactNode
  redirectTo?: string
}

export default function GuestRoute({ children, redirectTo = ROUTES.DASHBOARD }: GuestRouteProps) {
  const { status, token } = useAppSelector((state) => state.auth)
  const isAuthenticated = status === 'authenticated' && Boolean(token)

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />
  }

  return <>{children}</>
}
