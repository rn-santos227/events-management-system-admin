import { gql } from '@apollo/client'

export const USER_PROFILE_FIELDS = gql`
  fragment UserProfileFields on User {
    id
    email
    firstName
    lastName
    contactNumber
    active
    role {
      id
      name
    }
    createdAt
    updatedAt
    deletedAt
  }
`

export const USER_SETTING_FIELDS = gql`
  fragment UserSettingFields on UserSetting {
    userId
    theme
    density
    fontSize
    defaultPageSize
    rememberState
    createdAt
    updatedAt
  }
`

export const UPDATE_USER_MUTATION = gql`
  mutation UpdateUser($id: ID!, $input: UserUpdateInput!) {
    updateUser(id: $id, input: $input) {
      ...UserProfileFields
    }
  }
  ${USER_PROFILE_FIELDS}
`

export const UPDATE_USER_SETTING_MUTATION = gql`
  mutation UpdateUserSetting($userId: ID!, $input: UserSettingUpdateInput!) {
    updateUserSetting(userId: $userId, input: $input) {
      ...UserSettingFields
    }
  }
  ${USER_SETTING_FIELDS}
`
