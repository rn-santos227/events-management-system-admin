import { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { fetchPrivileges, updatePrivilegeStatus } from '../store/privilegesSlice'
import type { Privilege } from '../types/privilege'

export const usePrivileges = () => {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.privileges.items)
  const status = useAppSelector((state) => state.privileges.status)
  const error = useAppSelector((state) => state.privileges.error)
  const updatingIds = useAppSelector((state) => state.privileges.updatingIds)
  const updateError = useAppSelector((state) => state.privileges.updateError)

  const loadPrivileges = useCallback(
    (limit?: number) => dispatch(fetchPrivileges(limit ? { limit } : undefined)),
    [dispatch],
  )

}
