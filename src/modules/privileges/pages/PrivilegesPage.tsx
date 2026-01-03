import { useCallback, useEffect } from 'react'

import {
  AlertBanner,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DataTable,
} from '@/components/ui'
import { PRIVILEGE_ACTIONS } from '@/constants/privileges'
import { useAuthorization } from '@/modules/auth/hooks/useAuthorization'
import { usePrivileges } from '../hooks/usePrivileges'
import { usePrivilegeColumns } from '../hooks/usePrivilegeColumns'
import type { Privilege } from '../types/privilege'
import { isPrivilegeActive } from '../types/privilege'


export default function PrivilegesPage() {
  const { hasPrivilege } = useAuthorization()
  const canUpdate = hasPrivilege(PRIVILEGE_ACTIONS.PRIVILEGES.UPDATE)
  const { items, status, error, updatingIds, updateError, loadPrivileges, setPrivilegeStatus } = usePrivileges()
  const isLoading = status === 'loading'
}
