export const PRIVILEGE_ACTIONS = {

} as const

export type PrivilegeAction =
  (typeof PRIVILEGE_ACTIONS)[keyof typeof PRIVILEGE_ACTIONS][keyof (typeof PRIVILEGE_ACTIONS)[keyof typeof PRIVILEGE_ACTIONS]]

