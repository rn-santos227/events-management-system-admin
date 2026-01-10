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


