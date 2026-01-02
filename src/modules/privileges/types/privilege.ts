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
