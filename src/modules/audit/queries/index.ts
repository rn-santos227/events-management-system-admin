import { gql } from '@apollo/client'

export const AUDIT_LOG_FIELDS = gql`
  fragment AuditLogFields on AuditLog {
    id
    action
    method
    path
    statusCode
    ipAddress
    message
    createdAt
    user {
      id
      email
      fullName
    }
  }
`
