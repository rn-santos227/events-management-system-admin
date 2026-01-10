export type ThemeOption = 'LIGHT' | 'DARK' | 'SYSTEM'
export type DensityOption = 'COMPACT' | 'STANDARD' | 'COMFORTABLE'
export type FontSizeOption = 'SMALL' | 'MEDIUM' | 'LARGE'

export interface UserSetting {
  userId: string
  theme?: ThemeOption | null
  density?: DensityOption | null
  fontSize?: FontSizeOption | null
  defaultPageSize?: number | null
  rememberState?: boolean | null
  createdAt?: string | null
  updatedAt?: string | null
}

export interface UserSettingUpdateInput {
  theme?: ThemeOption | null
  density?: DensityOption | null
  fontSize?: FontSizeOption | null
  defaultPageSize?: number | null
  rememberState?: boolean | null
}
