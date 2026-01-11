import type { ReactNode } from 'react'
import { useEffect } from 'react'

import {
  applyUserSettings,
  loadUserSettings,
  normalizeUserSettings,
  subscribeToSystemTheme,
} from '@/modules/profile/utils/userSettings'

interface UserSettingsProviderProps {
  children: ReactNode
}

export function UserSettingsProvider({ children }: UserSettingsProviderProps) {


}
