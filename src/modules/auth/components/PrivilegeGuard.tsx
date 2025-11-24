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

const DefaultUnauthorized = () => (
  <div className="flex min-h-[60vh] items-center justify-center bg-slate-50 px-4 py-12">
    <div className="max-w-md rounded-xl border border-slate-200 bg-white p-6 text-center shadow-sm">
      <p className="text-sm font-semibold text-slate-900">Access restricted</p>
      <p className="mt-2 text-sm text-slate-600">
        You don't have permission to view this content. Contact an administrator if you believe this is an error.
      </p>
    </div>
  </div>
)
