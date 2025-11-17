import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useAppSelector } from '@/app/hooks'
import { ROUTES } from '@/constants/routes'

interface ProtectedRouteProps {
  children: ReactNode
  redirectTo?: string
}

export default function ProtectedRoute({ children, redirectTo = ROUTES.LOGIN }: ProtectedRouteProps) {
  const authState = useAppSelector((state) => state.auth)
  const location = useLocation()

  const isAuthenticated = authState.status === 'authenticated' && Boolean(authState.token)

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />
  }

  return <>{children}</>
}
