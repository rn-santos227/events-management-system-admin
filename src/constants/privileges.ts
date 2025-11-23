export const PRIVILEGE_ACTIONS = {
  AUDIT_LOGS: {
    READ: 'audit_logs:read',
    READ_OWN: 'audit_logs:read:own',
  },

  FILES: {
    READ: 'files:read',
    DOWNLOAD: 'files:download',
    UPLOAD: 'files:upload',
    DELETE: 'files:delete',
  },

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

  USERS: {
    CREATE: 'users:create',
    READ: 'users:read',
    UPDATE: 'users:update',
    DELETE: 'users:delete',
  }
} as const

export type PrivilegeAction =
  (typeof PRIVILEGE_ACTIONS)[keyof typeof PRIVILEGE_ACTIONS] extends infer G
    ? G extends Record<string, infer V>
      ? V
      : never
    : never

export const ALL_PRIVILEGE_ACTIONS = [
  ...Object.values(PRIVILEGE_ACTIONS).flatMap((group) =>
    Object.values(group),
  ),
] as const satisfies readonly PrivilegeAction[]
