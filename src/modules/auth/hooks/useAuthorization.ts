import { useCallback, useMemo } from 'react'

import { useUserProfile } from '@/hooks'
import type { RolePrivilege } from '@/@types/user'

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

export function useAuthorization() {
  const userProfile = useUserProfile()

  const privileges = useMemo(
    () => userProfile?.role.privileges ?? [],
    [userProfile?.role.privileges],
  )

  const hasPrivilege = useCallback(
    (action: string) =>
      hasRequiredPrivileges(privileges, normalizeRequired(action), 'all'),
    [privileges],
  )

  const hasAnyPrivilege = useCallback(
    (actions: string[]) =>
      hasRequiredPrivileges(privileges, normalizeRequired(actions), 'any'),
    [privileges],
  )

  const hasAllPrivileges = useCallback(
    (actions: string[]) =>
      hasRequiredPrivileges(privileges, normalizeRequired(actions), 'all'),
    [privileges],
  )

  const hasPrivileges = useCallback(
    (required?: string | string[], mode: 'all' | 'any' = 'all') =>
      hasRequiredPrivileges(privileges, normalizeRequired(required), mode),
    [privileges],
  )

  return useMemo(
    () => ({
      privileges,
      hasPrivilege,
      hasAnyPrivilege,
      hasAllPrivileges,
      hasPrivileges,
    }),
    [privileges, hasPrivilege, hasAnyPrivilege, hasAllPrivileges, hasPrivileges],
  )
}
