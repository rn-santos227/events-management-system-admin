import type { IconType } from 'react-icons'
type IconComponent = IconType
export interface DrawerLink {
  label: string
  description: string
  to?: string
  status?: 'beta' | 'soon'
  disabled?: boolean
  icon: IconComponent
  requiredPrivileges?: string[]
  privilegeMode?: 'all' | 'any'
}

export interface DrawerSection {
  title: string
  links: DrawerLink[]
}
