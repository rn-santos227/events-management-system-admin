export interface RolePrivilege {
  id: number
  action: string
  description?: string | null
}

export interface RoleSummary {
  id: number
  name: string
  privileges: RolePrivilege[]
}

export interface UserProfile {
  id: number
  email: string
  firstName: string
  lastName: string
  contactNumber: string
  active: boolean
  role: RoleSummary
}
