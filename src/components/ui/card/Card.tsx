import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'
import { classNames } from '@/utils/classNames'

const baseCardStyles =
  'rounded-xl border border-slate-200 bg-white shadow-sm transition-colors'

export type CardProps = ComponentPropsWithoutRef<'div'>
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={classNames(baseCardStyles, className)} {...props} />
  ),
)
Card.displayName = 'Card'

export type CardHeaderProps = ComponentPropsWithoutRef<'div'>
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

export type CardTitleProps = ComponentPropsWithoutRef<'h3'>
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

export type CardDescriptionProps = ComponentPropsWithoutRef<'p'>
export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={classNames('text-sm text-slate-500', className)} {...props} />
  ),
)
CardDescription.displayName = 'CardDescription'

export type CardContentProps = ComponentPropsWithoutRef<'div'>
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={classNames('px-6 py-4', className)} {...props} />
  ),
)
CardContent.displayName = 'CardContent'

export type CardFooterProps = ComponentPropsWithoutRef<'div'>
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={classNames(
        'flex items-center gap-3 border-t border-slate-200 px-6 py-4',
        className,
      )}
      {...props}
    />
  ),
)
CardFooter.displayName = 'CardFooter'
