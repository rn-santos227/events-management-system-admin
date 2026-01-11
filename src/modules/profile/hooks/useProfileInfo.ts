import { useMemo } from 'react'

import { useUserProfile } from '@/hooks'
import { getUserFullName } from '@/@types/user'

export const useUserProfileInfo = () => {
  const profile = useUserProfile()

  const fullName = useMemo(() => {
    if (!profile) {
      return ''
    }
    return getUserFullName(profile)
  }, [profile])

  return {
    profile,
    fullName,
  }
}
