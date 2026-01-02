export interface Privilege {
  id: string
  name: string
  action: string
  resource: string
  active?: boolean | null
  createdAt?: string | null
  updatedAt?: string | null
  deletedAt?: string | null
}

export const isPrivilegeActive = (privilege: Privilege): boolean => {
  if (typeof privilege.active === 'boolean') {
    return privilege.active
  }

  if (privilege.deletedAt) {
    return false
  }

  return true
}
