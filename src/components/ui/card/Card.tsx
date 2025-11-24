import { forwardRef } from 'react'
import type { ComponentPropsWithoutRef } from 'react'
import './index.css'
import { classNames } from '@/utils/classNames'

const baseCardStyles = 'card'

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
      className={classNames('card__header', className)}
      {...props}
    />
  ),
)
CardHeader.displayName = 'CardHeader'

export type CardTitleProps = ComponentPropsWithoutRef<'h3'>
export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={classNames('card__title', className)} {...props} />
  ),
)
CardTitle.displayName = 'CardTitle'

export type CardDescriptionProps = ComponentPropsWithoutRef<'p'>
export const CardDescription = forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={classNames('card__description', className)} {...props} />
  ),
)
CardDescription.displayName = 'CardDescription'

export type CardContentProps = ComponentPropsWithoutRef<'div'>
export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={classNames('card__content', className)} {...props} />
  ),
)
CardContent.displayName = 'CardContent'

export type CardFooterProps = ComponentPropsWithoutRef<'div'>
export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={classNames('card__footer', className)}
      {...props}
    />
  ),
)
CardFooter.displayName = 'CardFooter'
