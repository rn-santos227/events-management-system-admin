import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ReactNode } from 'react'

import { ToastContext } from './context'
import { ToastRenderer } from './ToastRenderer'
import type { ToastItem, ToastOptions } from './types'

interface ToastProviderProps {
  children: ReactNode
  defaultDuration?: number
}
const DEFAULT_DURATION = 5000


export function ToastProvider({ children, defaultDuration = DEFAULT_DURATION }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastItem[]>([])
  const timersRef = useRef<Record<number, number>>({})

  const hideToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
    const timeoutId = timersRef.current[id]
    if (timeoutId) {
      window.clearTimeout(timeoutId)
      delete timersRef.current[id]
    }
  }, [])

  const showToast = useCallback(
    ({ title, message, type = 'info', duration }: ToastOptions) => {
      const id = Date.now() + Math.floor(Math.random() * 1000)
      const toastDuration = typeof duration === 'number' ? duration : defaultDuration

      setToasts((prev) => [
        ...prev,
        {
          id,
          title,
          message,
          type,
          duration: toastDuration,
        },
      ])

      if (toastDuration > 0) {
        timersRef.current[id] = window.setTimeout(() => hideToast(id), toastDuration)
      }

      return id
    },
    [defaultDuration, hideToast],
  )

  useEffect(() => {
    const timersSnapshot = { ...timersRef.current }
    return () => {
      Object.values(timersSnapshot).forEach((timeoutId) => window.clearTimeout(timeoutId))
    }
  }, [])

  const value = useMemo(
    () => ({
      showToast,
      hideToast,
    }),
    [showToast, hideToast],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastRenderer toasts={toasts} onDismiss={hideToast} />
    </ToastContext.Provider>
  )
}
