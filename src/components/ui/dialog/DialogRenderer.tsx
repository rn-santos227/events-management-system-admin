import { AnimatePresence, motion } from 'framer-motion'

import './index.css'
import { classNames } from '@/utils/classNames'

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
          className="dialog-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
        >
          <motion.div
            className="dialog-panel"
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
            <div className="dialog-content">
              <div
                className={classNames(
                  'dialog-icon',
                  variantConfig[dialog.type].ring,
                  variantConfig[dialog.type].accent,
                )}
              >
                {variantConfig[dialog.type].icon}
              </div>
              <div className="space-y-3">
                <h2 id={titleId} className="dialog-title">
                  {dialog.title}
                </h2>
                {dialog.description ? (
                 <p id={descriptionId} className="dialog-description">
                    {dialog.description}
                  </p>
                ) : null}
              </div>
              <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row">
                {dialog.showCancel ? (
                  <button
                    type="button"
                    className={classNames(
                     'dialog-button',
                      'dialog-button--cancel',
                      variantConfig[dialog.type].cancel
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
                    'dialog-button',
                    'dialog-button--confirm',
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
