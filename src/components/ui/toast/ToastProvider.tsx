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
}
