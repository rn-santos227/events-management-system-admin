import { useAppSelector } from '@/app/hooks'

export const useUserState = () => useAppSelector((state) => state.user)
export const useUserProfile = () => useAppSelector((state) => state.user.profile)
