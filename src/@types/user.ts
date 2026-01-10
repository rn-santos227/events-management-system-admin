export interface RolePrivilege {
  id: number
  name?: string
  action: string
  resource?: string
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

export const getUserFullName = (
  user: Pick<UserProfile, 'firstName' | 'lastName'>,
): string => {
  return [user.firstName, user.lastName]
    .map((value) => value?.trim())
    .filter((value) => Boolean(value))
    .join(' ')
    .trim()
}
