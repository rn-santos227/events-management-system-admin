import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

import { DialogContext } from './context'
import type { ActiveDialogState, DialogOptions } from './types'
import {
  defaultCancelText,
  defaultConfirmText,
  defaultOutsideDismissTypes,
  defaultShowCancelTypes,
} from './DialogConfig'
import { DialogRenderer } from './DialogRenderer'

interface DialogProviderProps {
  children: ReactNode
}

export function DialogProvider({ children }: DialogProviderProps) {
  const [dialog, setDialog] = useState<ActiveDialogState | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)

  const hideDialog = useCallback(() => {
    setDialog(null)
    setIsProcessing(false)
  }, [])

  const showDialog = useCallback((options: DialogOptions) => {
    setDialog({
      id: Date.now(),
      ...options,
      confirmText: options.confirmText ?? defaultConfirmText[options.type],
      cancelText: options.cancelText ?? defaultCancelText[options.type],
      showCancel: options.showCancel ?? defaultShowCancelTypes.includes(options.type),
      allowOutsideDismiss:
        options.allowOutsideDismiss ?? defaultOutsideDismissTypes.includes(options.type),
    })
    setIsProcessing(false)
  }, [])

  const handleConfirm = useCallback(async () => {
    if (!dialog) return
    if (dialog.onConfirm) {
      try {
        setIsProcessing(true)
        await dialog.onConfirm()
      } catch (error) {
        console.error(error)
      } finally {
        setIsProcessing(false)
      }
    }
    hideDialog()
  }, [dialog, hideDialog])

  const handleCancel = useCallback(async () => {
    if (!dialog) return
    if (dialog.onCancel) {
      try {
        await dialog.onCancel()
      } catch (error) {
        console.error(error)
      }
    }
    hideDialog()
  }, [dialog, hideDialog])

  const contextValue = useMemo(
    () => ({
      showDialog,
      hideDialog,
    }),
    [showDialog, hideDialog],
  )

  return (
    <DialogContext.Provider value={contextValue}>
      {children}
      <DialogRenderer
        dialog={dialog}
        isProcessing={isProcessing}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onDismiss={hideDialog}
      />
    </DialogContext.Provider>
  )
}
