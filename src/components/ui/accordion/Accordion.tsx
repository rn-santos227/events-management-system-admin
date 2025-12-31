import { forwardRef, useId, useLayoutEffect, useRef, useState } from 'react'
import type { ComponentPropsWithoutRef, ReactNode } from 'react'

import './index.css'
import { classNames } from '@/utils/classNames'

export interface AccordionProps
  extends Omit<
    ComponentPropsWithoutRef<'div'>,
    'title' | 'onToggle'
  > {
  title: ReactNode
  description?: ReactNode
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  contentClassName?: string
}

export const Accordion = forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      title,
      description,
      defaultOpen = false,
      open,
      onOpenChange,
      className,
      contentClassName,
      children,
      ...props
    },
    ref,
  ) => {
    const [internalOpen, setInternalOpen] = useState(defaultOpen)
    const isControlled = open !== undefined
    const isOpen = isControlled ? open : internalOpen

    const contentRef = useRef<HTMLDivElement | null>(null)
    const [contentHeight, setContentHeight] = useState(0)

    const baseId = useId()
    const contentId = `${baseId}-content`

    useLayoutEffect(() => {
      if (!contentRef.current) return

      setContentHeight(
        isOpen ? contentRef.current.scrollHeight : 0,
      )
    }, [isOpen, children])

    const toggle = () => {
      const nextOpen = !isOpen

      if (!isControlled) {
        setInternalOpen(nextOpen)
      }

      onOpenChange?.(nextOpen)
    }

    return (
      <div
        ref={ref}
        className={classNames('accordion', className)}
        {...props}
      >
        <button
          type="button"
          className="accordion__trigger"
          onClick={toggle}
          aria-expanded={isOpen}
          aria-controls={contentId}
        >
          <div className="accordion__heading">
            <span className="accordion__title">{title}</span>

            {description && (
              <span className="accordion__description">
                {description}
              </span>
            )}
          </div>

          <span
            className={classNames(
              'accordion__icon',
              isOpen && 'accordion__icon--open',
            )}
            aria-hidden="true"
          >
            <svg
              viewBox="0 0 20 20"
              focusable="false"
            >
              <path
                d="M5 7.5l5 5 5-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </button>

        <div
          id={contentId}
          className={classNames(
            'accordion__panel',
            isOpen && 'accordion__panel--open',
          )}
          style={{ maxHeight: `${contentHeight}px` }}
          role="region"
        >
          <div
            ref={contentRef}
            className={classNames(
              'accordion__content',
              contentClassName,
            )}
          >
            {children}
          </div>
        </div>
      </div>
    )
  },
)

Accordion.displayName = 'Accordion'
