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

}
