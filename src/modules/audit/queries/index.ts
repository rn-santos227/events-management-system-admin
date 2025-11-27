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

export const AUDIT_LOGS_QUERY = gql`
  query AuditLogs($limit: Int) {
    auditLogs(limit: $limit) {
      ...AuditLogFields
    }
  }
  ${AUDIT_LOG_FIELDS}
`
