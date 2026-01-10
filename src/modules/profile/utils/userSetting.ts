import type {
  DensityOption,
  FontSizeOption,
  ThemeOption,
  UserSetting,
  UserSettingUpdateInput,
} from '@/@types/setting'

const USER_SETTINGS_STORAGE_KEY = 'ems_admin_user_settings'
const DEFAULT_USER_SETTINGS: UserSetting = {
  userId: 'anonymous',
  theme: 'SYSTEM',
  density: 'STANDARD',
  fontSize: 'MEDIUM',
  defaultPageSize: 25,
  rememberState: true,
}

const resolveTheme = (theme?: ThemeOption | null): 'light' | 'dark' => {
  if (theme === 'DARK') {
    return 'dark'
  }

  if (theme === 'LIGHT') {
    return 'light'
  }

  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  return 'light'
}

const resolveFontSize = (fontSize?: FontSizeOption | null): string => {
  switch (fontSize) {
    case 'SMALL':
      return '14px'
    case 'LARGE':
      return '18px'
    case 'MEDIUM':
    default:
      return '16px'
  }
}

const resolveLineHeight = (density?: DensityOption | null): string => {
  switch (density) {
    case 'COMPACT':
      return '1.2'
    case 'COMFORTABLE':
      return '1.7'
    case 'STANDARD':
    default:
      return '1.45'
  }
}

export const normalizeUserSettings = (
  settings?: UserSetting | UserSettingUpdateInput | null,
): UserSetting => {
  return {
    ...DEFAULT_USER_SETTINGS,
    ...(settings ?? {}),
  }
}

export const persistUserSettings = (settings: UserSetting): void => {
  if (typeof window === 'undefined') {
    return
  }

  try {
    window.localStorage.setItem(
      USER_SETTINGS_STORAGE_KEY,
      JSON.stringify(settings),
    )
  } catch {
    // Ignore storage errors
  }
}

export const loadUserSettings = (): UserSetting | null => {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const stored = window.localStorage.getItem(USER_SETTINGS_STORAGE_KEY)
    if (!stored) {
      return null
    }

    const parsed = JSON.parse(stored) as UserSetting
    return normalizeUserSettings(parsed)
  } catch {
    return null
  }
}

export const applyUserSettings = (settings: UserSetting): void => {
  if (typeof document === 'undefined') {
    return
  }

  const root = document.documentElement
  const theme = resolveTheme(settings.theme)
  const fontSize = resolveFontSize(settings.fontSize)
  const lineHeight = resolveLineHeight(settings.density)

  root.setAttribute('data-theme', theme)
  root.setAttribute('data-density', (settings.density ?? 'STANDARD').toLowerCase())
  root.setAttribute('data-font-size', (settings.fontSize ?? 'MEDIUM').toLowerCase())

  root.style.setProperty('--app-font-size', fontSize)
  root.style.setProperty('--app-line-height', lineHeight)
  root.style.setProperty('--app-density-scale', settings.density === 'COMPACT' ? '0.9' : '1')
}

export const subscribeToSystemTheme = (handler: () => void): (() => void) | undefined => {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return undefined
  }

}
