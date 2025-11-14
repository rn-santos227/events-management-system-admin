import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useAppSelector } from '@/app/hooks'

interface ProtectedRouteProps {
  children: ReactNode
  redirectTo?: string
}

export default function ProtectedRoute({ children, redirectTo = '/' }: ProtectedRouteProps) {
  const authState = useAppSelector((state) => state.auth)
  const userProfile = useAppSelector((state) => state.user.profile)
  const location = useLocation()

  const isAuthenticated = authState.status === 'authenticated' && Boolean(authState.token && userProfile)

  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace state={{ from: location }} />
  }

  return <>{children}</>
}
