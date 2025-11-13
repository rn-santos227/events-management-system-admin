import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { classNames } from '@/helpers/classNames'
import { DialogContext } from './dialogContext'
import type { DialogOptions, DialogType, DialogVariantConfig } from './dialogTypes'

interface DialogProviderProps {
  children: ReactNode
}

interface InternalDialogState extends DialogOptions {
  id: number
}


