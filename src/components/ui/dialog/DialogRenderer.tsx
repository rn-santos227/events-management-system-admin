import { AnimatePresence, motion } from 'framer-motion'

import { classNames } from '@/helpers/classNames'

import { variantConfig } from './DialogConfig'
import type { ActiveDialogState } from './types'

interface DialogRendererProps {
  dialog: ActiveDialogState | null
  isProcessing: boolean
  onConfirm: () => void
  onCancel: () => void
  onDismiss: () => void
}

export function DialogRenderer({
  dialog,
  isProcessing,
  onConfirm,
  onCancel,
  onDismiss,
}: DialogRendererProps) {
  const titleId = dialog ? `dialog-title-${dialog.id}` : undefined
  const descriptionId = dialog?.description ? `dialog-description-${dialog.id}` : undefined

  const handleOverlayClick = () => {
    if (dialog?.allowOutsideDismiss) {
      onDismiss()
    }
  }

  return (
    <AnimatePresence>
      {dialog ? (
        <motion.div
          key={dialog.id}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
        >
          <motion.div
            className="w-full max-w-sm overflow-hidden rounded-3xl bg-white p-8 shadow-2xl"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            initial={{ scale: 0.95, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 16 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex flex-col items-center text-center">
              <div
                className={classNames(
                  'mb-6 flex size-20 items-center justify-center rounded-full bg-slate-50 ring-8',
                  variantConfig[dialog.type].ring,
                  variantConfig[dialog.type].accent,
                )}
              >
                {variantConfig[dialog.type].icon}
              </div>
              <div className="space-y-3">
                <h2 id={titleId} className="text-2xl font-semibold text-slate-900">
                  {dialog.title}
                </h2>
                {dialog.description ? (
                  <p id={descriptionId} className="text-sm leading-relaxed text-slate-600">
                    {dialog.description}
                  </p>
                ) : null}
              </div>
              <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
                {dialog.showCancel ? (
                  <button
                    type="button"
                    className={classNames(
                      'inline-flex flex-1 items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                      variantConfig[dialog.type].cancel,
                    )}
                    onClick={onCancel}
                    disabled={isProcessing}
                  >
                    {dialog.cancelText}
                  </button>
                ) : null}
                <button
                  type="button"
                  className={classNames(
                    'inline-flex flex-1 items-center justify-center rounded-xl px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-80',
                    variantConfig[dialog.type].confirm,
                  )}
                  onClick={onConfirm}
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing…' : dialog.confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
