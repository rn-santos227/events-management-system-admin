export interface DrawerLink {
  label: string
  description: string
  to?: string
  status?: 'beta' | 'soon'
  disabled?: boolean
}

export interface DrawerSection {
  title: string
  links: DrawerLink[]
}
