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
  useEffect(() => {
    const savedSettings = loadUserSettings()
    applyUserSettings(normalizeUserSettings(savedSettings ?? undefined))

    const unsubscribe = subscribeToSystemTheme(() => {
      const current = loadUserSettings()
      if (current?.theme === 'SYSTEM') {
        applyUserSettings(normalizeUserSettings(current))
      }
    })

    return () => {
      unsubscribe?.()
    }
  }, [])

  return children
}
