import { useCallback, useMemo } from 'react'

import { useAppSelector } from '@/app/hooks'
import type { RolePrivilege } from '@/types/user'

const normalizeRequired = (required?: string | string[]): string[] => {
  if (!required) return []
  return Array.isArray(required) ? required : [required]
}

