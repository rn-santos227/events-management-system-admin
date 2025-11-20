import type { ToastItem } from './types'
import { ToastMessage } from './ToastMessage'

interface ToastRendererProps {
  toasts: ToastItem[]
  onDismiss: (id: number) => void
}

export function ToastRenderer({ toasts, onDismiss }: ToastRendererProps) {
  if (!toasts.length) {
    return null
  }
}
