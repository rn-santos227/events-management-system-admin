import { useMutation } from '@apollo/client'
import { useCallback, useMemo } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { setUserProfile } from '@/modules/auth/store/userSlice'
import { persistUserProfile } from '@/modules/auth/utils/authStorage'
import type { RoleSummary, UserProfile, UserUpdateInput } from '@/types/user'
import type { UserSetting, UserSettingUpdateInput } from '@/types/userSettings'
import {
  UPDATE_USER_MUTATION,
  UPDATE_USER_SETTING_MUTATION,
} from '../queries'
import { applyUserSettings, normalizeUserSettings, persistUserSettings } from '../utils/userSettings'

interface UpdateUserResponse {
  updateUser: UserProfile
}

interface UpdateUserVariables {
  id: string
  input: UserUpdateInput
}

interface UpdateUserSettingResponse {
  updateUserSetting: UserSetting
}

interface UpdateUserSettingVariables {
  userId: string
  input: UserSettingUpdateInput
}

const mergeRole = (
  currentRole: RoleSummary | null | undefined,
  updatedRole: RoleSummary | null | undefined,
): RoleSummary | null => {
  if (!updatedRole) {
    return currentRole ?? null
  }

  const sameRole = Boolean(currentRole && updatedRole.id === currentRole.id)


}

