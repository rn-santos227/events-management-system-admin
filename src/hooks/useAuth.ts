import { useAppSelector } from '@/app/hooks'

export const useAuthState = () => useAppSelector((state) => state.auth)
export const useAuthStatus = () => useAppSelector((state) => state.auth.status)
export const useAuthToken = () => useAppSelector((state) => state.auth.token)
