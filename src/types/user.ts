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
