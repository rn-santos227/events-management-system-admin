import { useCallback, useEffect, useMemo, useState } from 'react'

import type { UserSetting, UserSettingUpdateInput } from '@/@types/setting'
import {
  applyUserSettings,
  loadUserSettings,
  normalizeUserSettings,
  persistUserSettings,
} from '../utils/userSettings'

const initSettings = (): UserSetting => {
  return normalizeUserSettings(loadUserSettings() ?? undefined)
}

export const useProfileSettings = () => {
  const [settings, setSettings] = useState<UserSetting>(initSettings)

  useEffect(() => {
    applyUserSettings(settings)
  }, [settings])

  const updateSettings = useCallback((next: UserSettingUpdateInput) => {
    setSettings((current) =>
      normalizeUserSettings({
        ...current,
        ...next,
      }),
    )
  }, [])

  const applySettings = useCallback((next?: UserSettingUpdateInput | null) => {
    const normalized = normalizeUserSettings(next ?? undefined)
    setSettings(normalized)
  }, [])

  const persistSettings = useCallback(
    (next?: UserSettingUpdateInput | null) => {
      const normalized = normalizeUserSettings(next ?? settings)
      persistUserSettings(normalized)
      applyUserSettings(normalized)
      setSettings(normalized)
    },
    [settings],
  )

  const computed = useMemo(() => settings, [settings])

  return {
    settings: computed,
    updateSettings,
    applySettings,
    persistSettings,
  }
}
