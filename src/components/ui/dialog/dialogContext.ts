import type { ReactNode } from 'react'

type DialogBaseType = 'success' | 'question' | 'warning' | 'information' | 'error'

export type DialogType = DialogBaseType

export interface DialogOptions {
  type: DialogType
  title: string
  description?: string
  confirmText?: string
  cancelText?: string
  showCancel?: boolean
  allowOutsideDismiss?: boolean
  onConfirm?: () => void | Promise<void>
  onCancel?: () => void | Promise<void>
}

export interface DialogContextValue {
  showDialog: (options: DialogOptions) => void
  hideDialog: () => void
}

export interface DialogVariantConfig {
  accent: string
  ring: string
  confirm: string
  cancel: string
  icon: ReactNode
}
