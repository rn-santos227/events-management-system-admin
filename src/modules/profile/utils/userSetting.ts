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
