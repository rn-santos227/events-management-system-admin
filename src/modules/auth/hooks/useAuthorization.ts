import { useCallback, useMemo } from 'react'

import { useAppSelector } from '@/app/hooks'
import type { RolePrivilege } from '@/types/user'

const normalizeRequired = (required?: string | string[]): string[] => {
  if (!required) return []
  return Array.isArray(required) ? required : [required]
}

const hasRequiredPrivileges = (
  privileges: RolePrivilege[],
  required: string[],
  mode: 'all' | 'any',
): boolean => {
  if (!required.length) return true
  if (!privileges.length) return false

  const privilegeSet = new Set(privileges.map((privilege) => privilege.action))

  if (mode === 'any') {
    return required.some((action) => privilegeSet.has(action))
  }

  return required.every((action) => privilegeSet.has(action))
}



