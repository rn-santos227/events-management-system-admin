import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { ROUTES } from '@/constants/routes'
import { useAuthorization } from '../hooks/useAuthorization'

interface PrivilegeGuardProps {
  children: ReactNode
  required: string | string[]
  mode?: 'all' | 'any'
  redirectTo?: string
  fallback?: ReactNode
}

