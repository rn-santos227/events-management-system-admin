import { useMutation } from '@apollo/client'
import { useCallback, useMemo } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { setUserProfile } from '@/modules/auth/store/userSlice'
import { persistUserProfile } from '@/modules/auth/utils/authStorage'
import type { RoleSummary, UserProfile, UserUpdateInput } from '@/@types/user'
import type { UserSetting, UserSettingUpdateInput } from '@/@types/setting'
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
): RoleSummary => {
  if (!updatedRole) {
    return currentRole ?? ({} as RoleSummary)
  }

  const sameRole = Boolean(currentRole && updatedRole.id === currentRole.id)
  return {
    ...(currentRole ?? {}),
    ...updatedRole,
    privileges:
      updatedRole.privileges ??
      (sameRole ? currentRole?.privileges ?? [] : []),
  } as RoleSummary
}

const mergeUserProfile = (
  current: UserProfile | null,
  updated: UserProfile | null,
): UserProfile | null => {
  if (!updated) {
    return current
  }

  if (!current) {
    return updated
  }

  return {
    ...current,
    ...updated,
    role: mergeRole(current.role, updated.role),
  }
}

export function useUserProfileMutations() {
  const dispatch = useAppDispatch()
  const profile = useAppSelector((state) => state.user.profile)

  const [updateUserMutation, updateUserState] = useMutation<
    UpdateUserResponse,
    UpdateUserVariables
  >(UPDATE_USER_MUTATION)

  const [updateUserSettingMutation, updateUserSettingState] = useMutation<
    UpdateUserSettingResponse,
    UpdateUserSettingVariables
  >(UPDATE_USER_SETTING_MUTATION)

  const updateUser = useCallback(
    async (id: string, input: UserUpdateInput) => {
      const result = await updateUserMutation({ variables: { id, input } })
      const updated = result.data?.updateUser ?? null

      if (updated && profile?.id === updated.id) {
        const mergedProfile = mergeUserProfile(profile, updated)
        if (mergedProfile) {
          dispatch(setUserProfile(mergedProfile))
          persistUserProfile(mergedProfile)
        }
      }

      return updated
    },
    [dispatch, profile, updateUserMutation],
  )

  const updateUserSetting = useCallback(
    async (userId: string, input: UserSettingUpdateInput) => {
      const result = await updateUserSettingMutation({
        variables: { userId, input },
      })
      const updated = result.data?.updateUserSetting ?? null
      if (updated) {
        const normalized = normalizeUserSettings(updated)
        persistUserSettings(normalized)
        applyUserSettings(normalized)
      }
      return updated
    },
    [updateUserSettingMutation],
  )

  const updateUserStatus = useMemo(
    () => ({
      loading: updateUserState.loading,
      error: updateUserState.error,
    }),
    [updateUserState.error, updateUserState.loading],
  )

  const updateUserSettingStatus = useMemo(
    () => ({
      loading: updateUserSettingState.loading,
      error: updateUserSettingState.error,
    }),
    [updateUserSettingState.error, updateUserSettingState.loading],
  )

  return {
    updateUser,
    updateUserSetting,
    updateUserStatus,
    updateUserSettingStatus,
  }
}
