import { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { fetchPrivileges, updatePrivilegeStatus } from '../store/privilegesSlice'
import type { Privilege } from '../types/privilege'

