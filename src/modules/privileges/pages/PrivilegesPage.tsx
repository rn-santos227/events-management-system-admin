import { useCallback, useEffect, useMemo } from 'react'

import {
  AlertBanner,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  DataTable,
  type DataTableColumn,
} from '@/components/ui'
import { PRIVILEGE_ACTIONS } from '@/constants/privileges'
import { useAuthorization } from '@/modules/auth/hooks/useAuthorization'
import { formatDateTime } from '@/utils/time'
import { usePrivileges } from '../hooks/usePrivileges'
import type { Privilege } from '../types/privilege'
import { isPrivilegeActive } from '../types/privilege'