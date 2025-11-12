import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'
import { classNames } from '@/helpers/classNames'

const baseCardStyles =
  'rounded-xl border border-slate-200 bg-white shadow-sm transition-colors'

export interface CardProps extends ComponentPropsWithoutRef<'div'> {}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={classNames(baseCardStyles, className)} {...props} />
  ),
)
Card.displayName = 'Card'

export interface CardHeaderProps extends ComponentPropsWithoutRef<'div'> {}

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={classNames(
        'flex flex-col gap-1 border-b border-slate-200 px-6 py-4',
        className,
      )}
      {...props}
    />
  ),
)
CardHeader.displayName = 'CardHeader'

export interface CardTitleProps extends ComponentPropsWithoutRef<'h3'> {}

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3
      ref={ref}
      className={classNames('text-lg font-semibold text-slate-900', className)}
      {...props}
    />
  ),
)
CardTitle.displayName = 'CardTitle'