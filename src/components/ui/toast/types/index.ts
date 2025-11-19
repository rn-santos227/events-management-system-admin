export type ToastType = 'success' | 'info' | 'warning' | 'error'

export interface ToastOptions {
  title?: string
  message: string
  type?: ToastType
  duration?: number
}

export interface ToastItem extends Required<Pick<ToastOptions, 'message'>> {
  id: number
  title?: string
  type: ToastType
  duration: number
}

export interface ToastContextValue {
  showToast: (options: ToastOptions) => number
  hideToast: (id: number) => void
}
