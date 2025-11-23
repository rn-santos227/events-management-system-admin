export const PRIVILEGE_ACTIONS = {
  PRIVILEGES: {
    CREATE: 'privileges:create',
    READ: 'privileges:read',
    UPDATE: 'privileges:update',
    DELETE: 'privileges:delete',
  },
  ROLES: {
    CREATE: 'roles:create',
    READ: 'roles:read',
    UPDATE: 'roles:update',
    DELETE: 'roles:delete',
  },
} as const

export type PrivilegeAction =
  (typeof PRIVILEGE_ACTIONS)[keyof typeof PRIVILEGE_ACTIONS][keyof (typeof PRIVILEGE_ACTIONS)[keyof typeof PRIVILEGE_ACTIONS]]
  