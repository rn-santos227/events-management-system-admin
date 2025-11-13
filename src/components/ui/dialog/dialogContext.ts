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
