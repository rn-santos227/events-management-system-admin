export interface RolePrivilege {
  id: string
  name?: string
  action: string
  resource?: string
  description?: string | null
}

export interface RoleSummary {
  id: string
  name: string
  privileges?: RolePrivilege[]
}

export interface UserProfile {
  id: string
  email: string
  firstName: string | null
  lastName: string | null
  contactNumber: string | null
  active: boolean
  role: RoleSummary
  createdAt?: string | null
  updatedAt?: string | null
  deletedAt?: string | null
}

export interface UserUpdateInput {
  email?: string
  password?: string
  firstName?: string | null
  lastName?: string | null
  contactNumber?: string | null
  roleId?: string | null
  active?: boolean | null
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
